import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element: Component, ...rest }) => {
    const auth = useSelector((state) => state.auth);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (auth && auth.token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
            navigate('/login');
        }
    }, [auth, navigate]);

    return isAuthenticated ? <Component {...rest} /> : null;
};

export default ProtectedRoute;
