import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectAuth } from '../store/auth.slice';
import { getCurrentUser } from '../services/api';

const useAuth = () => {
    const dispatch = useDispatch();
    const auth = useSelector(selectAuth);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                dispatch(logout());
                setLoading(false);
                return;
            }
            try {
                const user: any = await getCurrentUser();
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