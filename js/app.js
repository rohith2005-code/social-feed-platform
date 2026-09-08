import { checkAuth, getCurrentUser, logout } from './utils/helpers.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Initialization
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        if(themeToggle) themeToggle.innerHTML = '<i class="ph ph-sun"></i>';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme === 'light') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'dark');
                themeToggle.innerHTML = '<i class="ph ph-moon"></i>';
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                themeToggle.innerHTML = '<i class="ph ph-sun"></i>';
            }
        });
    }

    // 2. Auth Guard & User Setup for protected pages
    const isAuthPage = window.location.pathname.includes('login.html') || window.location.pathname.includes('register.html');
    
    if (!isAuthPage) {
        if (!checkAuth()) {
            window.location.href = 'login.html';
            return;
        }

        const user = getCurrentUser();
        if (user) {
            // Update sidebar user info
            const usernameElements = document.querySelectorAll('#current-username');
            usernameElements.forEach(el => el.textContent = `@${user.username}`);
            
            const avatarElements = document.querySelectorAll('#current-user-avatar');
            avatarElements.forEach(el => {
                el.textContent = user.username.substring(0, 2).toUpperCase();
            });
        }

        // 3. Logout handler
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                logout();
            });
        }
        
        // 4. Mobile sidebar toggle
        const sidebar = document.getElementById('main-sidebar');
        const openBtn = document.getElementById('open-sidebar');
        const closeBtn = document.getElementById('close-sidebar');
        
        if (sidebar && openBtn) {
            openBtn.addEventListener('click', () => {
                sidebar.classList.add('open');
            });
            
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    sidebar.classList.remove('open');
                });
            }
        }
    }
    
    // Toggle password visibility (auth pages)
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('ph-eye');
                icon.classList.add('ph-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('ph-eye-slash');
                icon.classList.add('ph-eye');
            }
        });
    });
});
