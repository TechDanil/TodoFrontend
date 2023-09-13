import { Grid, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { UseFormRegister } from "react-hook-form";
import { ITaskFormData } from "../../interfaces/ITaskFormData";
import { taskFormBodyDataSelect } from './taskFormPrioritySelectData';

interface ITaskFormDataPrioritySelect {
    register?: UseFormRegister<ITaskFormData>
    handleSelectChange: (fieldName: keyof ITaskFormData, value: string) => void;
}

const TaskFormDataPrioritySelect = ({ register, handleSelectChange }: ITaskFormDataPrioritySelect) => {

    const selectPriority = (event: SelectChangeEvent<string>) => {
        const { value } = event.target;
        handleSelectChange('priority', value);
    }

    const selectStatus = (event: SelectChangeEvent<string>) => {
        const { value } = event.target;
        handleSelectChange('status', value);
    }

    return (
        <>
            {taskFormBodyDataSelect.map(item => (
                <Grid item xs={12} key={item.id}>
                    <FormControl fullWidth variant="outlined" margin="normal">
                        <InputLabel>{item.labelName}</InputLabel>
                        <Select
                            key={item.id}
                            name={item.name}
                            onChange={item.name === 'priority' ? selectPriority : selectStatus}
                            label={item.label}
                            inputProps={{
                                ...register?.(item.name as keyof ITaskFormData),
                            }}
                        >
                            {item.menuItems.map(menuItem => (
                                <MenuItem key={menuItem.id} value={menuItem.value}>
                                    {menuItem.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            ))}
        </>
    );
}

export default TaskFormDataPrioritySelect;