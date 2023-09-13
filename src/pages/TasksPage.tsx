import { useState } from 'react';
import { Container, Grid } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { TaskGrouping } from '../types/TaskGrouping';
import { getTitle } from '../utils/getTitle/getTitle';
import useFetchedTasks from '../hooks/useFetchedTasks';
import SortCategories from '../components/SortCategories/SortCategories';
import TaskList from '../components/TaskList/TaskList';

const TasksPage = observer(() => {
    const [sortingOption, setSortingOption] = useState<TaskGrouping>('all');
    const tasks = useFetchedTasks(sortingOption);

    const handleSortingChange = (option: TaskGrouping) => {
        setSortingOption(option);
    }

    return (
        <Container>
            <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
                <Grid item>
                    <SortCategories sortingOption={sortingOption} onSortingChange={handleSortingChange} />
                    <TaskList
                        tasks={tasks}
                        title={getTitle(sortingOption)}
                        sortingOption={sortingOption}
                    />
                </Grid>
            </Grid>
        </Container>
    );
})

export default TasksPage;
