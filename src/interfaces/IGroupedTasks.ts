import { ITask } from "./ITask";

interface IGroupedTasks {
    today: ITask[];
    nextWeek: ITask[];
    future: ITask[];
}

export { IGroupedTasks };