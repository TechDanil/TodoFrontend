import { ButtonGroup, Button } from '@mui/material';
import { TaskGrouping } from '../../types/TaskGrouping';

interface ISortCategories {
    sortingOption: TaskGrouping
    onSortingChange: (option: TaskGrouping) => void;
}

const SortCategories = ({ sortingOption, onSortingChange }: ISortCategories) => {
    return (
        <ButtonGroup variant="contained" aria-label="sorting-options">
            <Button
                onClick={() => onSortingChange('all')}
                color={sortingOption === 'all' ? 'primary' : 'secondary'}
            >
                Все
            </Button>
            <Button
                onClick={() => onSortingChange('byResponsible')}
                color={sortingOption === 'byResponsible' ? 'primary' : 'secondary'}
            >
               По Отвественным
            </Button>
            <Button
                onClick={() => onSortingChange('completed')}
                color={sortingOption === 'completed' ? 'primary' : 'secondary'}
            >
                По дате завершения
            </Button>
        </ButtonGroup>
    );
}

export default SortCategories;