import { useState, useEffect } from 'react';

import {
    ListItem,
    IconButton,
    TextField,
    Card,
    CardContent,
} from '@mui/material';

import { taskItemData } from './taskItemData';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { ITask } from '../../interfaces/ITask';
import { StatusType } from '../../enums/StatusTypes';

import EditTaskModal from '../EditTaskModal/EditTaskModal';

interface ITaskItem {
    task: ITask;
}

const TaskItem = ({ task }: ITaskItem) => {
    const [taskHeaderColor, setTaskHeaderColor] = useState('#808080');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const handleOpenEditModal = () => {
        setIsEditModalOpen(true);
    }

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
    }

    useEffect(() => {
        let color = '#808080';

        if (task.status === StatusType.COMPLETED) {
            color = '#008000';
        } else {
            const endDate = task.end_date ? new Date(task.end_date) : null;
            const currentDate = new Date();

            if (endDate && endDate < currentDate) {
                color = '#FF0000';
            }
        }

        setTaskHeaderColor(color);
    }, [task]);

    const taskHeaderStyle = {
        backgroundColor: taskHeaderColor,
    };

    return (
        <ListItem>
            <Card variant="outlined">
                <CardContent>
                    <TextField
                        label="Title"
                        value={task.title}
                        InputProps={{
                            readOnly: true,
                        }}
                        style={taskHeaderStyle}
                    />
                    {taskItemData.map(item => (
                        <TextField
                            key={item.id}
                            label={item.label}
                            InputProps={{
                                readOnly: true,
                            }}
                            value={task[item.dataKey as keyof ITask] as string}
                            style={{ paddingBottom: '20px', paddingRight: '30px' }}
                        />
                    ))}

                    <IconButton
                        edge="end"
                        aria-label="отредактировать"
                        onClick={handleOpenEditModal}
                    >
                        <EditIcon />
                    </IconButton>

                    <IconButton
                        edge="end"
                        aria-label="удалить"
                    >
                        <DeleteIcon />
                    </IconButton>
                </CardContent>
            </Card>

            {isEditModalOpen && (
                <EditTaskModal 
                    task={task}
                    onClose={handleCloseEditModal}
                />
            )}
        </ListItem>
    );
};

export default TaskItem;
