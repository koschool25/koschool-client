import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

const apiClient_chat = axios.create({
    baseURL: import.meta.env.VITE_API_CHAT_POINT,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default apiClient;