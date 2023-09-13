import { useState } from "react";
import { Grid, FormControl, Select, MenuItem, InputLabel, SelectChangeEvent } from "@mui/material";
import { useFetchedSupervisors } from "../../hooks/useFetchedSupervisors ";
import { UseFormSetValue } from "react-hook-form";
import { ITaskFormData } from "../../interfaces/ITaskFormData";

interface ITaskFormResponsibleSelect {
    setValue: UseFormSetValue<ITaskFormData>;
}

const TaskFormResponsibleSelect = ({ setValue }: ITaskFormResponsibleSelect) => {
    const supervisors = useFetchedSupervisors();

    const [selectedResponsibleUser, setSelectedResponsibleUser] = useState('');
    
    const handleResponsibleUserChange = (event: SelectChangeEvent<string>) => {
        const selectedUserId = parseInt(event.target.value, 10);
        setSelectedResponsibleUser(event.target.value);
        setValue('responsible_id', selectedUserId);
    }


    return (
        <Grid item xs={12}>
            <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel>Ответственный</InputLabel>
                <Select
                    name="responsibleUser"
                    value={selectedResponsibleUser}
                    onChange={handleResponsibleUserChange}
                    label="Ответственный"
                >
                    {supervisors.map((user) => (
                        <MenuItem key={user.id} value={user.id}>
                            {user.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Grid>
    ); 
}

export default TaskFormResponsibleSelect