import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const authApi = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const loginRequest = async (credentials: { email: string; password: string }) => {
    console.log(credentials);
    try {
        const response = await authApi.post('auth/login', credentials);
        return response.data;
    } catch (error) {
        throw new Error('Échec de la connexion');
    }
};

export const logoutRequest = async () => {
    try {
        const response = await authApi.post('/logout');
        return response.data;
    } catch (error) {
        throw new Error('Échec de la déconnexion');
    }
};

export const registerRequest = async (userData: { username: string; password: string; email: string }) => {
    try {
        const response = await authApi.post('/register', userData);
        return response.data;
    } catch (error) {
        throw new Error('Échec de l\'inscription');
    }
};
