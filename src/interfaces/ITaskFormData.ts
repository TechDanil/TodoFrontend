import { PriorityTypes } from "../enums/PriorityTypes";
import { StatusType } from "../enums/StatusTypes";

interface ITaskFormData {
    title: string;
    description: string;
    end_date: Date | null;
    priority: string | PriorityTypes;
    responsible_id: number | null;
    status: string | StatusType;
}

export { ITaskFormData }