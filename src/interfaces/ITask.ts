import { PriorityTypes } from "../enums/PriorityTypes";
import { StatusType } from "../enums/StatusTypes";

interface ITask {
    id?: number;
    title: string;
    description: string;
    end_date:  Date | null;
    created_at: Date;
    updated_at: Date;
    priority: string | PriorityTypes;
    responsible_id: number | null
    status: string | StatusType;
}
  
export { ITask };
  