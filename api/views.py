from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404, redirect
from .models import Post, Like
from .serializers import RegisterSerializer, UserSerializer, PostSerializer

class ApiIndexView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        return Response({
            'message': 'Social Feed Platform API',
            'frontend_url': 'http://127.0.0.1:5500/login.html',
            'endpoints': {
                'register': '/api/register/',
                'login': '/api/login/',
                'posts': '/api/posts/',
                'user_posts': '/api/posts/user/<username>/',
                'like_post': '/api/posts/<post_id>/like/'
            }
        })

class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, _ = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
                'user': UserSerializer(user).data
            }, status=status.HTTP_201_CREATED)
        
        errors = serializer.errors
        first_err = None
        for k, v in errors.items():
            if isinstance(v, list) and len(v) > 0:
                first_err = f"{k.capitalize()}: {v[0]}"
                break
        return Response({'detail': first_err or 'Registration failed.'}, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response({'detail': 'Username and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(username=username, password=password)
        if not user:
            return Response({'detail': 'Invalid username or password.'}, status=status.HTTP_400_BAD_REQUEST)

        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user': UserSerializer(user).data
        }, status=status.HTTP_200_OK)


class PostListCreateView(APIView):
    def get_permissions(self):
        if self.request.method == 'POST':
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    def get(self, request):
        posts = Post.objects.all().select_related('author').prefetch_related('likes')
        serializer = PostSerializer(posts, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        content = request.data.get('content', '').strip()
        if not content:
            return Response({'detail': 'Post content cannot be empty.'}, status=status.HTTP_400_BAD_REQUEST)
        if len(content) > 280:
            return Response({'detail': 'Post content exceeds 280 characters.'}, status=status.HTTP_400_BAD_REQUEST)

        post = Post.objects.create(author=request.user, content=content)
        serializer = PostSerializer(post, context={'request': request})
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class UserPostsView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, username):
        target_user = get_object_or_404(User, username__iexact=username)
        posts = Post.objects.filter(author=target_user).select_related('author').prefetch_related('likes')
        serializer = PostSerializer(posts, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class ToggleLikeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, post_id):
        post = get_object_or_404(Post, id=post_id)
        like, created = Like.objects.get_or_create(user=request.user, post=post)
        
        if not created:
            like.delete()
            return Response({'liked': False, 'likes_count': post.likes_count}, status=status.HTTP_200_OK)
        
        return Response({'liked': True, 'likes_count': post.likes_count}, status=status.HTTP_200_OK)
