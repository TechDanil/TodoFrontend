import { Grid, TextField } from '@mui/material';
import { ITaskFormData } from '../../interfaces/ITaskFormData';
import { UseFormRegister } from 'react-hook-form';
import { taskFormOptionsSelectData } from './taskFormOptionsSelectData';

interface ITaskFormOptionsSelect {
    handleSelectChange: (fieldName: keyof ITaskFormData, value: string) => void;
    register?: UseFormRegister<ITaskFormData>;
}

const TaskFormOptionsSelect = ({ handleSelectChange, register }: ITaskFormOptionsSelect) => {
    return (
        <>
            {
                taskFormOptionsSelectData.map(element => (
                    <Grid item xs={12} key={element.id}>
                        <TextField
                            key={element.id}
                            label={element.label}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name={element.name}
                            onChange={(e) => handleSelectChange(element.name as keyof ITaskFormData, e.target.value)}
                            inputProps={{
                                ...register?.(element.name as keyof ITaskFormData),
                            }}
                        />
                    </Grid>
                ))
            }
        </>

    );
};

export default TaskFormOptionsSelect;
