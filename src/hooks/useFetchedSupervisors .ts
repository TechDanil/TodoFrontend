import { useEffect } from 'react';
import UserStore from '../stores/UserStore';
import { useObserver } from 'mobx-react-lite';

const useFetchedSupervisors = () => {
    useEffect(() => {
        UserStore.fetchSupervisors();
    }, []);

    return useObserver(() => UserStore.supervisors);
};

export { useFetchedSupervisors };
