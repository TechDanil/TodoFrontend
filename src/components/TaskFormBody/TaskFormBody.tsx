import { Grid } from "@mui/material";
import { UseFormSetValue, UseFormRegister } from 'react-hook-form';
import { ITaskFormData } from "../../interfaces/ITaskFormData";

import DateField from "../DateField/DateField";

import TaskFormDataPrioritySelect from "../TaskFormDataPrioritySelect/TaskFormDataPrioritySelect";
import TaskFormOptionsSelect from "../TaskFormOptionsSelect/TaskFormOptionsSelect";
import TaskFormResponsibleSelect from "../TaskFormResponsibleSelect/TaskFormResponsibleSelect";

interface ITaskFormBody {
    register: UseFormRegister<ITaskFormData>;
    setValue: UseFormSetValue<ITaskFormData>;
    selectedEndDate: Date | null;
    setSelectedEndDate: (date: Date | null) => void;
}

const TaskFormBody = ({ setValue, register, selectedEndDate, setSelectedEndDate }: ITaskFormBody) => {

    const handleSelectChange = (fieldName: keyof ITaskFormData, value: string) => {
        setValue(fieldName, value);
    }

    return (
        <>
            <Grid container spacing={2}>
                <TaskFormOptionsSelect
                    handleSelectChange={(fieldName, value) => handleSelectChange(fieldName, value)}
                    register={register}
                />

                <Grid item xs={12} key="end_date">
                    <DateField selectedEndDate={selectedEndDate} setSelectedEndDate={setSelectedEndDate} />
                </Grid>

                
                <TaskFormDataPrioritySelect
                    handleSelectChange={(fieldName, value) => handleSelectChange(fieldName, value)}
                    register={register}
                />
                
            </Grid>

            <TaskFormResponsibleSelect setValue={setValue} />
        </>
    );
}

export default TaskFormBody;
