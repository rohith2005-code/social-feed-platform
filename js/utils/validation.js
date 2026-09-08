/**
 * Form Validation Utilities
 */

export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

export const validatePassword = (password) => {
    // Minimum eight characters, at least one letter and one number
    return password.length >= 8;
};

export const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length > 5) strength += 20;
    if (password.length > 7) strength += 20;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[0-9]/.test(password)) strength += 20;
    if (/[^A-Za-z0-9]/.test(password)) strength += 20;
    return strength;
};

export const showError = (inputId, message) => {
    const errorElement = document.getElementById(`${inputId}-error`);
    if (errorElement) {
        errorElement.textContent = message;
    }
    const inputElement = document.getElementById(inputId);
    if (inputElement) {
        inputElement.style.borderColor = 'var(--error)';
    }
};

export const clearErrors = () => {
    const errorElements = document.querySelectorAll('.error-text');
    errorElements.forEach(el => el.textContent = '');
    
    const inputElements = document.querySelectorAll('.auth-form input');
    inputElements.forEach(el => {
        el.style.borderColor = 'transparent';
    });
};
