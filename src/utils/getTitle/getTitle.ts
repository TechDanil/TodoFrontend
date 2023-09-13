const getTitle = (sortingOption: string): string => {
    switch (sortingOption) {
        case 'completed':
            return 'Завершенные задачи';
        case 'byResponsible':
            return 'Задачи по ответственным';
        default:
            return 'Все задачи';
    }
}

export { getTitle };
