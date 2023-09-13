import { makeAutoObservable } from 'mobx';
import UserService from '../services/UserService';
import { IUser } from '../interfaces/IUser';

class UserStore {
    supervisors: IUser[] = [];

    constructor() {
        makeAutoObservable(this);
        this.fetchSupervisors();
    }

    async fetchSupervisors() {
        try {
            this.supervisors = await UserService.getSupervisors();
        } catch (error) {
            console.error('Error fetching supervisors:', error);
        }
    }
}

export default new UserStore();
