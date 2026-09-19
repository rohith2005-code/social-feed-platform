from django.urls import path
from .views import ApiIndexView, RegisterView, LoginView, PostListCreateView, UserPostsView, ToggleLikeView

urlpatterns = [
    path('', ApiIndexView.as_view(), name='api-index'),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('posts/', PostListCreateView.as_view(), name='post-list-create'),
    path('posts/user/<str:username>/', UserPostsView.as_view(), name='user-posts'),
    path('posts/<int:post_id>/like/', ToggleLikeView.as_view(), name='toggle-like'),
]
