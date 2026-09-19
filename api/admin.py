from django.contrib import admin
from .models import Post, Like

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ['id', 'author', 'content_snippet', 'created_at', 'likes_count']
    list_filter = ['created_at', 'author']
    search_fields = ['content', 'author__username']

    def content_snippet(self, obj):
        return obj.content[:50]

@admin.register(Like)
class LikeAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'post', 'created_at']
    list_filter = ['created_at']
    search_fields = ['user__username', 'post__content']
