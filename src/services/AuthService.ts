import axios from 'axios';

import { IUser } from "../interfaces/IUser";
import { BASE_URL } from "../settings/settings";
import { IAuthData } from '../interfaces/IAuthData';

class AuthService {
    signup = async (userData: IUser) => {
        const response = await axios.post(`${BASE_URL}/signup`, userData);
        const { user } = response.data;
        return user;
    }

    login = async ({ login, password }: IAuthData) => {
        const response = await axios.post(`${BASE_URL}/login`, { login, password });
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        return user;
    }
}

export default new AuthService();