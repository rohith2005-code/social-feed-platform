/**
 * API Service - Live Django REST Framework Backend Integration
 */

import { getToken } from '../utils/helpers.js';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

// Helper to get auth headers
const getHeaders = (requireAuth = false) => {
    const headers = {
        'Content-Type': 'application/json',
    };
    const token = getToken();
    if (token) {
        headers['Authorization'] = `Token ${token}`;
    }
    return headers;
};

// --- Authentication ---

export const loginAPI = async (username, password) => {
    const response = await fetch(`${API_BASE_URL}/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Login failed');
    }
    return await response.json();
};

export const registerAPI = async (userData) => {
    const response = await fetch(`${API_BASE_URL}/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Registration failed');
    }
    return await response.json();
};


// --- Posts ---

export const getFeedPosts = async () => {
    const response = await fetch(`${API_BASE_URL}/posts/`, {
        method: 'GET',
        headers: getHeaders(false)
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Failed to fetch feed posts');
    }
    return await response.json();
};

export const getUserPosts = async (username) => {
    const response = await fetch(`${API_BASE_URL}/posts/user/${encodeURIComponent(username)}/`, {
        method: 'GET',
        headers: getHeaders(false)
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Failed to fetch user posts');
    }
    return await response.json();
};

export const createPost = async (content) => {
    const response = await fetch(`${API_BASE_URL}/posts/`, {
        method: 'POST',
        headers: getHeaders(true),
        body: JSON.stringify({ content })
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Failed to create post');
    }
    return await response.json();
};

export const toggleLikePost = async (postId) => {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}/like/`, {
        method: 'POST',
        headers: getHeaders(true)
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Failed to toggle like');
    }
    return await response.json();
};
