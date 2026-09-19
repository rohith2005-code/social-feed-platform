from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework import status
from .models import Post, Like

class SocialApiTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', email='test@example.com', password='password123')

    def test_register(self):
        response = self.client.post('/api/register/', {
            'username': 'newuser',
            'email': 'new@example.com',
            'password': 'password123'
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('token', response.data)
        self.assertEqual(response.data['user']['username'], 'newuser')

    def test_login(self):
        response = self.client.post('/api/login/', {
            'username': 'testuser',
            'password': 'password123'
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('token', response.data)

    def test_create_and_get_post(self):
        # Obtain token
        login_res = self.client.post('/api/login/', {'username': 'testuser', 'password': 'password123'}, format='json')
        token = login_res.data['token']
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token)

        # Create post
        create_res = self.client.post('/api/posts/', {'content': 'Test post content'}, format='json')
        self.assertEqual(create_res.status_code, status.HTTP_201_CREATED)
        post_id = create_res.data['id']

        # Get feed
        feed_res = self.client.get('/api/posts/')
        self.assertEqual(feed_res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(feed_res.data), 1)

        # Get user posts
        user_posts_res = self.client.get('/api/posts/user/testuser/')
        self.assertEqual(user_posts_res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(user_posts_res.data), 1)

        # Toggle like
        like_res = self.client.post(f'/api/posts/{post_id}/like/')
        self.assertEqual(like_res.status_code, status.HTTP_200_OK)
        self.assertTrue(like_res.data['liked'])

        # Toggle unlike
        unlike_res = self.client.post(f'/api/posts/{post_id}/like/')
        self.assertEqual(unlike_res.status_code, status.HTTP_200_OK)
        self.assertFalse(unlike_res.data['liked'])
