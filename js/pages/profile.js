import { getUserPosts, toggleLikePost } from '../services/api.js';
import { formatRelativeTime, getCurrentUser } from '../utils/helpers.js';
import { showToast } from '../components/toast.js';

document.addEventListener('DOMContentLoaded', () => {
    // Only execute profile logic on the profile page
    const userPostsContainer = document.getElementById('user-posts-container');
    if (!userPostsContainer) return;

    const emptyState = document.getElementById('empty-user-posts');
    const loader = document.getElementById('profile-loader');
    
    // Set Profile Info
    const user = getCurrentUser();
    if (user) {
        document.getElementById('profile-header-name').textContent = user.username;
        document.getElementById('profile-name').textContent = user.username;
        document.getElementById('profile-handle').textContent = `@${user.username}`;
        
        const avatarStr = user.username.substring(0, 2).toUpperCase();
        document.getElementById('profile-avatar').textContent = avatarStr;
    }

    // Load User Posts
    const loadUserPosts = async () => {
        try {
            if (!user) return;
            const posts = await getUserPosts(user.username);
            loader.classList.add('hidden');
            
            // Update post count
            document.getElementById('profile-post-count').textContent = `${posts.length} posts`;
            
            if (posts.length === 0) {
                emptyState.classList.remove('hidden');
            } else {
                emptyState.classList.add('hidden');
                renderPosts(posts, userPostsContainer);
            }
        } catch (error) {
            loader.classList.add('hidden');
            showToast('Failed to load profile posts.', 'error');
        }
    };

    // Render Posts (similar to feed.js, but customized for profile view if needed)
    const renderPosts = (posts, container) => {
        const existingPosts = container.querySelectorAll('.post-card');
        existingPosts.forEach(post => post.remove());
        
        posts.forEach(post => {
            const postElement = createPostElement(post);
            container.insertBefore(postElement, loader);
        });
    };

    const createPostElement = (post) => {
        const div = document.createElement('div');
        div.className = 'post-card glass-panel';
        div.dataset.id = post.id;
        
        const isLikedClass = post.user_has_liked ? 'liked' : '';
        const likeIconClass = post.user_has_liked ? 'ph-fill' : 'ph';
        
        div.innerHTML = `
            <div class="avatar">${post.author.avatar || post.author.username.substring(0,2).toUpperCase()}</div>
            <div class="post-content-area">
                <div class="post-header">
                    <span class="post-author">${post.author.username}</span>
                    <span class="post-handle">@${post.author.username}</span>
                    <span class="post-time">· ${formatRelativeTime(post.created_at)}</span>
                </div>
                <div class="post-text">${escapeHTML(post.content)}</div>
                <div class="post-actions">
                    <button class="action-btn comment-btn">
                        <i class="ph ph-chat-circle"></i>
                        <span>0</span>
                    </button>
                    <button class="action-btn like-btn ${isLikedClass}" data-id="${post.id}">
                        <i class="${likeIconClass} ph-heart"></i>
                        <span class="like-count">${post.likes_count}</span>
                    </button>
                    <button class="action-btn share-btn">
                        <i class="ph ph-share-network"></i>
                    </button>
                </div>
            </div>
        `;
        
        const likeBtn = div.querySelector('.like-btn');
        likeBtn.addEventListener('click', async (e) => {
            e.stopPropagation();
            try {
                const isCurrentlyLiked = likeBtn.classList.contains('liked');
                const countSpan = likeBtn.querySelector('.like-count');
                const icon = likeBtn.querySelector('i');
                let currentCount = parseInt(countSpan.textContent);
                
                if (isCurrentlyLiked) {
                    likeBtn.classList.remove('liked');
                    icon.classList.remove('ph-fill');
                    icon.classList.add('ph');
                    countSpan.textContent = Math.max(0, currentCount - 1);
                } else {
                    likeBtn.classList.add('liked');
                    icon.classList.remove('ph');
                    icon.classList.add('ph-fill');
                    countSpan.textContent = currentCount + 1;
                }
                
                await toggleLikePost(post.id);
            } catch (err) {
                showToast('Action failed', 'error');
            }
        });

        return div;
    };

    const escapeHTML = (str) => {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag])
        );
    };

    // Initial load
    loadUserPosts();
});
