import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectAuth } from '../store/auth.slice';
import { api } from '../services/api';

const useAuth = () => {
    const dispatch = useDispatch();
    const auth = useSelector(selectAuth);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await api.getUser();
                dispatch(login(user));
            } catch (error) {
                console.error('Failed to fetch user:', error);
                dispatch(logout());
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [dispatch]);

    const isAuthenticated = () => {
        return !!auth.user;
    };

    return { isAuthenticated, loading };
};

export default useAuth;