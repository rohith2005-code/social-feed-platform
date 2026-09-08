/**
 * API Service
 * 
 * CANDIDATE INSTRUCTIONS:
 * This file currently contains mock implementations that store data in LocalStorage.
 * Your task is to replace these mock functions with actual API calls to your backend
 * using the fetch() API.
 * 
 * Ensure you handle:
 * - Authentication headers (e.g., Bearer tokens or Session cookies)
 * - Error handling (e.g., 400 Bad Request, 401 Unauthorized)
 * - Loading states (handled by the UI components)
 */

import { getToken, getCurrentUser } from '../utils/helpers.js';

const API_BASE_URL = 'http://127.0.0.1:8000/api'; // Adjust to your backend URL

// Helper to get auth headers
const getHeaders = (requireAuth = true) => {
    const headers = {
        'Content-Type': 'application/json',
    };
    if (requireAuth) {
        const token = getToken();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`; // Adjust based on your auth scheme
        }
    }
    return headers;
};

// --- Authentication ---

export const loginAPI = async (username, password) => {
    // MOCK IMPLEMENTATION
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Mock validation
            if (username === 'admin' && password === 'admin123') {
                resolve({
                    token: 'mock-jwt-token-12345',
                    user: { id: 1, username: 'admin', email: 'admin@example.com' }
                });
            } else {
                reject(new Error('Invalid username or password'));
            }
        }, 800);
    });

    /* ACTUAL IMPLEMENTATION EXAMPLE:
    const response = await fetch(`${API_BASE_URL}/login/`, {
        method: 'POST',
        headers: getHeaders(false),
        body: JSON.stringify({ username, password })
    });
    
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Login failed');
    }
    return await response.json();
    */
};

export const registerAPI = async (userData) => {
    // MOCK IMPLEMENTATION
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                user: { id: 2, username: userData.username, email: userData.email }
            });
        }, 1000);
    });
};


// --- Posts ---

export const getFeedPosts = async () => {
    // MOCK IMPLEMENTATION
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    id: 1,
                    author: { username: 'admin', avatar: 'AD' },
                    content: 'Just deployed the new SocialConnect platform! Super excited to see what everyone thinks. 🚀 #launch',
                    created_at: new Date().toISOString(),
                    likes_count: 42,
                    user_has_liked: false
                },
                {
                    id: 2,
                    author: { username: 'janedoe', avatar: 'JD' },
                    content: 'Learning Django REST Framework today. It makes building APIs so much easier! Any tips for a beginner?',
                    created_at: new Date(Date.now() - 3600000).toISOString(),
                    likes_count: 15,
                    user_has_liked: true
                }
            ]);
        }, 500);
    });
};

export const getUserPosts = async (username) => {
    // MOCK IMPLEMENTATION
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    id: 1,
                    author: { username: username, avatar: username.substring(0,2).toUpperCase() },
                    content: 'My very first post on this platform!',
                    created_at: new Date().toISOString(),
                    likes_count: 5,
                    user_has_liked: false
                }
            ]);
        }, 500);
    });
};

export const createPost = async (content) => {
    // MOCK IMPLEMENTATION
    return new Promise((resolve) => {
        setTimeout(() => {
            const user = getCurrentUser();
            resolve({
                id: Math.floor(Math.random() * 1000),
                author: { username: user.username, avatar: user.username.substring(0,2).toUpperCase() },
                content: content,
                created_at: new Date().toISOString(),
                likes_count: 0,
                user_has_liked: false
            });
        }, 600);
    });
};

export const toggleLikePost = async (postId) => {
    // MOCK IMPLEMENTATION
    return new Promise((resolve) => {
        setTimeout(() => {
            // Randomly return liked or unliked state for mock
            resolve({ liked: Math.random() > 0.5 });
        }, 300);
    });
};
