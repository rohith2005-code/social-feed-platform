import { loginAPI } from '../services/api.js';
import { setToken, setCurrentUser } from '../utils/helpers.js';
import { showToast } from '../components/toast.js';
import { showLoader, hideLoader } from '../components/loader.js';
import { clearErrors, showError } from '../utils/validation.js';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            clearErrors();
            
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value;
            
            let isValid = true;
            
            if (!username) {
                showError('username', 'Username is required');
                isValid = false;
            }
            
            if (!password) {
                showError('password', 'Password is required');
                isValid = false;
            }
            
            if (!isValid) return;
            
            try {
                showLoader();
                const response = await loginAPI(username, password);
                
                // Store auth data
                setToken(response.token);
                setCurrentUser(response.user);
                
                showToast('Login successful! Redirecting...');
                
                // Redirect to feed
                setTimeout(() => {
                    window.location.href = 'feed.html';
                }, 1000);
                
            } catch (error) {
                showToast(error.message || 'Login failed. Please check your credentials.', 'error');
            } finally {
                hideLoader();
            }
        });
    }
});
