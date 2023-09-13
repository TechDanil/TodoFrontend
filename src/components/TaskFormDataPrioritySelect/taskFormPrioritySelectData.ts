
import { TaskPrioritySelectOptions } from "../../types/TaskPrioritySelectOptions";

const taskFormBodyDataSelect: TaskPrioritySelectOptions[] = [
    {
        id: 1,
        labelName: "Приоритет",
        name: "priority",
        label: 'приоритет',

        menuItems: [
            {
                id: 1,
                value: 'low',
                label: 'Low',
            },

            {
                id: 2,
                value: 'medium',
                label: 'Medium',
            },

            {
                id: 3,
                value: 'high',
                label: 'High',
            },
        ],
    },


    {
        id: 2,
        labelName: "Статус",
        name: "status",
        label: 'Status',

        menuItems: [
            {
                id: 1,
                value: 'to be executed',
                label: 'к выполению',
            },

            {
                id: 2,
                value: 'in progress',
                label: 'в прогрессе',
            },

            {
                id: 3,
                value: 'completed',
                label: 'выполнено',
            },

            {
                id: 4,
                value: 'canceled',
                label: 'оменено',
            },
        ]
    }
]

export { taskFormBodyDataSelect };