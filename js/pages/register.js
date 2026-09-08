import { registerAPI } from '../services/api.js';
import { showToast } from '../components/toast.js';
import { showLoader, hideLoader } from '../components/loader.js';
import { clearErrors, showError, validateEmail, validatePassword, checkPasswordStrength } from '../utils/validation.js';

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const passwordInput = document.getElementById('password');
    const strengthBar = document.getElementById('strength-bar');
    
    // Password strength meter
    if (passwordInput && strengthBar) {
        passwordInput.addEventListener('input', (e) => {
            const password = e.target.value;
            if (!password) {
                strengthBar.style.width = '0';
                return;
            }
            
            const strength = checkPasswordStrength(password);
            strengthBar.style.width = `${Math.min(strength, 100)}%`;
            
            if (strength <= 20) {
                strengthBar.style.backgroundColor = 'var(--error)';
            } else if (strength <= 60) {
                strengthBar.style.backgroundColor = 'var(--warning)';
            } else {
                strengthBar.style.backgroundColor = 'var(--success)';
            }
        });
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            clearErrors();
            
            const username = document.getElementById('username').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            
            let isValid = true;
            
            if (!username) {
                showError('username', 'Username is required');
                isValid = false;
            } else if (username.length < 3) {
                showError('username', 'Username must be at least 3 characters');
                isValid = false;
            }
            
            if (!email) {
                showError('email', 'Email is required');
                isValid = false;
            } else if (!validateEmail(email)) {
                showError('email', 'Please enter a valid email address');
                isValid = false;
            }
            
            if (!password) {
                showError('password', 'Password is required');
                isValid = false;
            } else if (!validatePassword(password)) {
                showError('password', 'Password must be at least 8 characters');
                isValid = false;
            }
            
            if (!isValid) return;
            
            try {
                showLoader();
                await registerAPI({ username, email, password });
                
                showToast('Registration successful! Please sign in.');
                
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 1500);
                
            } catch (error) {
                showToast(error.message || 'Registration failed. Try a different username or email.', 'error');
            } finally {
                hideLoader();
            }
        });
    }
});
