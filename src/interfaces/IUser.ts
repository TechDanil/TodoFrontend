interface IUser {
    id?: number;
    name: string;
    last_name: string;
    patronymic: string | null;
    login: string;
    password: string;
    supervisor_id: number | null;
}

export { IUser };