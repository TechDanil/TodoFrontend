import { useState, ChangeEvent, useEffect } from "react";
import { ITask } from "../../interfaces/ITask";
import {
    Button,
    DialogActions,
    DialogContent,
    TextField,
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    SelectChangeEvent,
} from "@mui/material";
import Modal from "../Modal/Modal";
import DateField from "../DateField/DateField";
import TaskStore from "../../stores/TaskStore";


interface IEditTaskModal {
    onClose: () => void;
    task: ITask;
}

const EditTaskModal = ({ task, onClose }: IEditTaskModal) => {
    const [editedTask, setEditedTask] = useState<ITask>({ ...task });
    const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);

    useEffect(() => {
        setEditedTask({ ...task });
    }, [task]);


    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedTask((prevTask) => ({
            ...prevTask,
            [name]: value,
        }));
    };

    const handleSelectChange = (e: SelectChangeEvent<string>) => {
        const { name, value } = e.target;
        setEditedTask((prevTask) => ({
            ...prevTask,
            [name as string]: value,
        }));
    };

    const handleSaveChanges = async () => {
        console.log(editedTask);
        try {
            await TaskStore.editTask(task.id as number, editedTask);
            await TaskStore.fetchAllTasks();
            await TaskStore.fetchCompletedTasks();
            onClose();
        } catch (error) {
            console.log('error saving changes')
        }
    };

    return (
        <Modal handleModalClose={onClose}>
            <DialogContent>
                <Typography variant="h5" align="center">
                    Редактирование задачи
                </Typography>
                <TextField
                    label="Title"
                    name="title"
                    value={editedTask.title}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Description"
                    name="description"
                    value={editedTask.description}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />

                <DateField selectedEndDate={selectedEndDate} setSelectedEndDate={setSelectedEndDate} />

                <FormControl fullWidth margin="normal">
                    <InputLabel>Priority</InputLabel>
                    <Select
                        name="priority"
                        value={editedTask.priority}
                        onChange={handleSelectChange}
                    >
                        <MenuItem value="High">High</MenuItem>
                        <MenuItem value="Medium">Medium</MenuItem>
                        <MenuItem value="Low">Low</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Status</InputLabel>
                    <Select
                        name="status"
                        value={editedTask.status}
                        onChange={handleSelectChange}
                    >
                        <MenuItem value="to be executed">to be executed</MenuItem>
                        <MenuItem value="in progress">in progress</MenuItem>
                        <MenuItem value="completed">completed</MenuItem>
                        <MenuItem value="canceled">canceled</MenuItem>
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Отмена
                </Button>
                <Button onClick={handleSaveChanges} color="primary">
                    Сохранить изменения
                </Button>
            </DialogActions>
        </Modal>
    );
};

export default EditTaskModal;
