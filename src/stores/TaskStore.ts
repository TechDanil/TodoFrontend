import { ITask } from "../interfaces/ITask";
import { makeAutoObservable } from 'mobx';

import TaskService from "../services/TaskService";

class TaskStore {
    tasks: ITask[] = [];
    completedTasks: ITask[] = [];
    responsibeTasks: ITask[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    fetchAllTasks = async () => {
        try {
            this.tasks = await TaskService.getAllTasks();
            this.completedTasks = await TaskService.getAllTasks();
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    createNewTask = async (taskData: ITask) => {
        try {
            const newTask = await TaskService.createTask(taskData);
            this.tasks.push(newTask);
        } catch (error) {
            console.error("Error creating task:", error);
        }
    };

    editTask = async (taskId: number, taskData: ITask) => {
        try {
            const updatedTask = await TaskService.editTask(taskId, taskData);
            const taskIndex = this.tasks.findIndex((task) => task.id === taskId);
            if (taskIndex !== -1) {
                this.tasks[taskIndex] = updatedTask;
            }
        } catch (error) {
            console.error("Error editing task:", error);
        }
    };

    fetchCompletedTasks = async () => {
        try {
            this.completedTasks = await TaskService.getCompletedTasks();
            console.log(this.completedTasks);
        } catch (error) {
            console.error("Error fetching completed tasks:", error);
        }
    }

    fetchResponsibleTasks = async () => {
        try {
            this.responsibeTasks = await TaskService.getTasksGroupedByResponsible();
            console.log(this.responsibeTasks);
        } catch (error) {
            console.error("Error fetching responsible tasks:", error);
        }
    }
}

export default new TaskStore();