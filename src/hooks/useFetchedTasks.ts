import { useEffect, useState } from 'react';
import TaskStore from '../stores/TaskStore';
import { TaskGrouping } from '../types/TaskGrouping';
import { ITask } from '../interfaces/ITask';

const useFetchedTasks = (sortingOption: TaskGrouping): ITask[] => {
    const [tasks, setTasks] = useState<ITask[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            let fetchedTasks: ITask[] = [];

            switch (sortingOption) {
                case 'all':
                    await TaskStore.fetchAllTasks();
                    fetchedTasks = TaskStore.tasks;
                    break;
                case 'completed':
                    await TaskStore.fetchCompletedTasks();
                    fetchedTasks = TaskStore.completedTasks;
                    break;

                case 'byResponsible':
                    await TaskStore.fetchResponsibleTasks();
                    fetchedTasks = TaskStore.responsibeTasks;
                    break;
                default:
                    break;
            }

            setTasks(fetchedTasks || []);
        };

        fetchData();
    }, [sortingOption]);

    return tasks;
};

export default useFetchedTasks;
