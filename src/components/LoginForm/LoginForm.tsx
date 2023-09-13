import { useForm } from 'react-hook-form';
import {
    TextField,
    Button,
    Dialog,
    DialogContent,
    DialogActions,
} from '@mui/material';

import authStore from '../../stores/AuthStore';
import { useNavigate } from 'react-router-dom';
import { IAuthData } from '../../interfaces/IAuthData';
import { loginFormData } from './loginFormData';

const LoginForm = () => {
    const { register, handleSubmit } = useForm<IAuthData>({
        defaultValues: {
            login: '',
            password: '',
        }
    });

    const navigate = useNavigate();

    const onSumbitLoginHandler = async (data: IAuthData) => {
        try {
            if (!data) {
                return;
            }

            await authStore.login(data);
            console.log('Logged in successfully');
            navigate('/tasks');
        } catch (error) {
            console.error('Error while logging in');
        }
    };

    return (
        <Dialog open={true}>
            <DialogContent>
                {
                    loginFormData.map(element => (
                        <TextField
                            key={element.id}
                            label={element.label}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            {...register(element.name as keyof IAuthData)}
                        />
                    ))
                }

                <DialogActions>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit(onSumbitLoginHandler)}
                    >
                        Войти
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
};

export default LoginForm;
