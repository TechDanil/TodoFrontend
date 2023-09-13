import { useState } from 'react';
import {
    Button,
    Typography,
    Dialog,
    DialogContent,
    DialogActions,
    DialogTitle,
} from '@mui/material';
import { ITaskFormData } from '../../interfaces/ITaskFormData';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import TaskFormBody from '../TaskFormBody/TaskFormBody';
import TaskStore from '../../stores/TaskStore';
import Modal from '../Modal/Modal';

const TaskForm = () => {
    const { register, handleSubmit, reset, setValue, getValues } = useForm<ITaskFormData>({
        defaultValues: {
            title: '',
            description: '',
            end_date: null,
            priority: "",
            responsible_id: null,
            status: "",
        }
    });

    const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
    const [isModalActive, setIsModalActive] = useState(false);

    const handleOpenModal = () => {
        setIsModalActive(true);
    };

    const handleModalClose = () => {
        setIsModalActive(false);
    };

    const handleSubmitButton = async (data: ITaskFormData) => {
        try {
            const { priority, status } = getValues();

            const formattedPriority = priority.charAt(0).toUpperCase() + priority.slice(1);

            const responseData = {
                ...data,
                priority: formattedPriority,
                end_date: selectedEndDate,
            };

            await TaskStore.createNewTask(responseData);
            console.log(responseData);

            reset({
                title: '',
                description: '',
                end_date: null,
                priority: "",
                responsible_id: null,
                status: "",
            });

            console.log(priority);
            console.log(status);
            handleModalClose();
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    return (
        <Dialog
            open={true}
            maxWidth="md"
            BackdropProps={{
                style: {
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                },
            }}
        >
            <DialogContent>
                <Typography variant="h4" align="center">
                    Task Form
                </Typography>
                <TaskFormBody register={register} setValue={setValue}  selectedEndDate={selectedEndDate} setSelectedEndDate={setSelectedEndDate} />
            </DialogContent>
            <DialogActions style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <Link to="/tasks">
                    <Button variant="contained" color="primary" style={{ marginBottom: '30px' }}>
                        Перейти к задачам
                    </Button>
                </Link>

                <button onClick={handleOpenModal}>новая задача</button>

                {isModalActive && (
                    <Modal handleModalClose={handleModalClose}>
                        <Dialog open={true} onClose={handleModalClose}>
                            <DialogContent>
                                <DialogTitle>Добавить задачу?</DialogTitle>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleModalClose} color="primary">
                                    Нет
                                </Button>
                                <button onClick={handleSubmit(handleSubmitButton)}>да</button>
                            </DialogActions>
                        </Dialog>
                    </Modal>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default TaskForm;
