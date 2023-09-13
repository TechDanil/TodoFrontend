import { makeAutoObservable } from 'mobx';
import { IUser } from '../interfaces/IUser';
import { IAuthData } from '../interfaces/IAuthData';

import AuthService from '../services/AuthService';

class AuthStore {
    user: IUser | null = null;

    get isAuthenticated() {
        return !!this.user;
    }

    constructor() {
        makeAutoObservable(this);
    }

    signup = async (userData: IUser) => {
        try {
            const user = await AuthService.signup(userData);
            this.user = user;
        } catch (error) {
            console.error('Signup error:', error);
            throw error;
        }
    }

    login = async ({ login, password }: IAuthData) => {
        try {
            const user = await AuthService.login({ login, password });
            this.user = user;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }
}

export default new AuthStore();