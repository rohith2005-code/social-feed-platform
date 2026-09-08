import { getFeedPosts, createPost, toggleLikePost } from '../services/api.js';
import { formatRelativeTime } from '../utils/helpers.js';
import { showToast } from '../components/toast.js';

document.addEventListener('DOMContentLoaded', () => {
    // We only execute feed logic if we are on the feed page
    const feedContainer = document.getElementById('posts-container');
    if (!feedContainer) return;

    const emptyState = document.getElementById('empty-feed');
    const loader = document.getElementById('feed-loader');
    
    // Create Post Elements
    const postContent = document.getElementById('post-content');
    const charCount = document.getElementById('char-count');
    const publishBtn = document.getElementById('publish-post-btn');
    
    const MAX_CHARS = 280;

    // Load Posts
    const loadPosts = async () => {
        try {
            const posts = await getFeedPosts();
            loader.classList.add('hidden');
            
            if (posts.length === 0) {
                emptyState.classList.remove('hidden');
            } else {
                emptyState.classList.add('hidden');
                renderPosts(posts, feedContainer);
            }
        } catch (error) {
            loader.classList.add('hidden');
            showToast('Failed to load feed.', 'error');
        }
    };

    // Render Posts
    const renderPosts = (posts, container) => {
        // Clear existing posts except loader/empty state
        const existingPosts = container.querySelectorAll('.post-card');
        existingPosts.forEach(post => post.remove());
        
        posts.forEach(post => {
            const postElement = createPostElement(post);
            container.insertBefore(postElement, loader); // Insert before loader
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
        
        // Attach Like Event
        const likeBtn = div.querySelector('.like-btn');
        likeBtn.addEventListener('click', async (e) => {
            e.stopPropagation();
            try {
                // Optimistic UI update
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
                
                // Actual API call
                await toggleLikePost(post.id);
            } catch (err) {
                showToast('Action failed', 'error');
                // Revert should happen here in a real app
            }
        });

        return div;
    };

    // Textarea auto-resize and validation
    if (postContent) {
        postContent.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
            
            const currentLength = this.value.length;
            charCount.textContent = `${currentLength} / ${MAX_CHARS}`;
            
            if (currentLength > 0 && currentLength <= MAX_CHARS) {
                publishBtn.disabled = false;
                charCount.style.color = 'var(--text-tertiary)';
            } else {
                publishBtn.disabled = true;
                if (currentLength > MAX_CHARS) {
                    charCount.style.color = 'var(--error)';
                } else {
                    charCount.style.color = 'var(--text-tertiary)';
                }
            }
        });
    }

    // Publish Post
    if (publishBtn) {
        publishBtn.addEventListener('click', async () => {
            const content = postContent.value.trim();
            if (!content) return;
            
            publishBtn.disabled = true;
            publishBtn.innerHTML = '<i class="ph ph-spinner ph-spin"></i>';
            
            try {
                const newPost = await createPost(content);
                
                // Add to top of feed
                const postElement = createPostElement(newPost);
                feedContainer.insertBefore(postElement, feedContainer.firstChild.nextSibling); // Insert after the first post element or at top
                
                // Reset form
                postContent.value = '';
                postContent.style.height = 'auto';
                charCount.textContent = `0 / ${MAX_CHARS}`;
                emptyState.classList.add('hidden');
                showToast('Post published!');
            } catch (err) {
                showToast('Failed to publish post', 'error');
            } finally {
                publishBtn.innerHTML = 'Post';
                publishBtn.disabled = true; // Still disabled because textarea is empty
            }
        });
    }

    // Simple HTML escape to prevent XSS
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
    loadPosts();
});
