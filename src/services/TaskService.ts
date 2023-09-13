import axios from "axios";
import { ITask } from "../interfaces/ITask";
import { BASE_URL } from "../settings/settings";

class TaskService {
    getAllTasks = async (): Promise<ITask[]> => {
        const response = await axios.get<{ tasks: ITask[] }>(`${BASE_URL}/tasks`);
        console.log(response.data.tasks);
        return response.data.tasks;
    }

    createTask = async (taskData: ITask): Promise<ITask> => {
        const response = await axios.post<ITask>(`${BASE_URL}/createTasks`, taskData);
        return response.data;
    }

    editTask = async (taskId: number, taskData: ITask): Promise<ITask> => {
        const response = await axios.put<ITask>(
            `${BASE_URL}/task/${taskId}`,
            taskData
        );
        return response.data;
    }

    getTasksGroupedByResponsible = async (): Promise<ITask[]> => {
        try {
            const response = await axios.get<{ tasks: ITask[] }>(`${BASE_URL}/tasks/grouped-by-responsible`);
            console.log(response.data.tasks)
            return response.data.tasks;
        } catch (error) {
            console.error('Error fetching tasks grouped by responsible:', error);
            throw error;
        }
    }

    getCompletedTasks = async (): Promise<ITask[]> => {
        const response = await axios.get<{ tasks: ITask[] }>(`${BASE_URL}/tasks/completed`);
        console.log(response.data.tasks)
        return response.data.tasks;
    }
}

export default new TaskService();