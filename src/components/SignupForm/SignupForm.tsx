import {
    Button,
    Dialog,
    TextField,
    Typography,
    FormControl,
    DialogActions,
    DialogContent,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
} from '@mui/material';

import { Link, useNavigate } from 'react-router-dom';

import { useFetchedSupervisors } from '../../hooks/useFetchedSupervisors ';
import { ISignupData } from '../../interfaces/ISignupData';
import { useForm } from 'react-hook-form';

import { signupFormData } from './signupFormData';

import AuthStore from '../../stores/AuthStore';



const SignupForm = () => {
    const  { register, handleSubmit, setValue, setError, formState: { error } } = useForm<ISignupData>({
        defaultValues: {
            name: '',
            last_name: '',
            patronymic: null,
            login: '',
            password: '',
            supervisor_id: null,
        }
    });

    const navigate = useNavigate();

    const supervisors = useFetchedSupervisors();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.name as keyof ISignupData, e.target.value);
    }

    const handleSupervisorChange = (event: SelectChangeEvent<number>) => {
        const selectedSupervisorId = event.target.value as number;

        if (supervisors.some(supervisor => supervisor.id === selectedSupervisorId && supervisor.supervisor_id === null)) {
            setValue('supervisor_id', selectedSupervisorId);
        } else {
            setValue('supervisor_id', selectedSupervisorId);
        }
    }

    const handleSignup = async (formData: ISignupData) => {
        try {
            await AuthStore.signup(formData);
            navigate('/taskForm');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.message) {
                setError('error' as keyof ISignupData, error.response.data.message);
            } else {
                setValue('error' as keyof ISignupData, 'Error during registration. Please try again.');
            }
            
        }
    };

    return (
        <Dialog maxWidth="xs" open={true}>
            <DialogContent>
                <Typography variant="h4" align="center">
                    Авторизация
                </Typography>
                {
                    signupFormData.map(el => (
                        <TextField
                            label={el.label}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name={el.name}
                            inputProps={{
                                ...register(el.name as keyof ISignupData)
                            }}
                            onChange={handleChange}
                        />
                    ))
                }
                <FormControl fullWidth variant="outlined" margin="normal">
                    <InputLabel>Руководители</InputLabel>
                    <Select
                        {...register('supervisor_id')}
                        onChange={handleSupervisorChange}
                        label="Supervisor"
                    >
                        {supervisors &&
                            supervisors.map(supervisor => (
                                <MenuItem key={supervisor.id} value={supervisor.id}>
                                    {supervisor.name}
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>
                <Typography variant="body2" color="error">
                    {error}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleSubmit(handleSignup)}
                >
                    Зарегистрироваться
                </Button>

                <Link to="/login">
                  Уже есть аккаунт?              
                </Link>
            </DialogActions>
        </Dialog>
    );
};

export default SignupForm;
