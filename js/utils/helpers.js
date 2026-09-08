/**
 * Authentication and Local Storage Helpers
 */

export const setToken = (token) => {
    localStorage.setItem('auth_token', token);
};

export const getToken = () => {
    return localStorage.getItem('auth_token');
};

export const setCurrentUser = (user) => {
    localStorage.setItem('current_user', JSON.stringify(user));
};

export const getCurrentUser = () => {
    const user = localStorage.getItem('current_user');
    return user ? JSON.parse(user) : null;
};

export const checkAuth = () => {
    return !!getToken() && !!getCurrentUser();
};

export const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('current_user');
    window.location.href = 'login.html';
};

/**
 * Format date string to relative time (e.g., "2 hours ago")
 */
export const formatRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};
