import React from 'react';
import { Paper, Typography, List, Button } from '@mui/material';
import TaskItem from '../TaskItem/TaskItem';
import { ITask } from '../../interfaces/ITask';
import { Link } from 'react-router-dom';

interface ITaskListProps {
    tasks: ITask[];
    title: string;
    sortingOption: string;
}

const TaskList: React.FC<ITaskListProps> = ({ tasks, title, sortingOption }) => {
    const filteredTasks =
        sortingOption === 'completed'
            ? tasks.filter((task) => task.status === 'completed')
            : tasks;

    return (
        <>
            <Button color="primary">
                <Link to="/taskForm">Перейти к форме задач</Link>
            </Button>
            <Paper elevation={3} style={{ padding: '16px' }}>
                <Typography variant="h6" gutterBottom>
                    {title}
                </Typography>
                <List>
                    {filteredTasks.map((task) => (
                        <TaskItem key={task.id} task={task} />
                    ))}
                </List>
            </Paper>
        </>
    );
};

export default TaskList;
