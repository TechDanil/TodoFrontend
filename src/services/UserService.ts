import axios from 'axios';
import { IUser } from "../interfaces/IUser";
import { BASE_URL } from '../settings/settings';

class UserService {
    getSupervisors = async (): Promise<IUser[]> => {
        try {
            const response = await axios.get<{ supervisors: IUser[] }>(`${BASE_URL}/supervisors`);
            const supervisors = response.data.supervisors.map(supervisor => ({
                ...supervisor,
                supervisor_id: supervisor.supervisor_id || 0, 
            }));

            console.log(supervisors)

            return supervisors;
        } catch (error) {
            console.error('Error fetching supervisors:', error);
            throw error;
        }
    }
}


export default new UserService();