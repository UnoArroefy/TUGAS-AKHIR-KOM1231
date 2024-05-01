import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "./AuthProvider";

export default function ProtectedRoute({ children }) {
    const [user, setUser] = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user.accessToken && !window.localStorage.getItem("accessToken")) {
            navigate('/login', { replace: true });
        }

        if (!user.accessToken && window.localStorage.getItem("accessToken")) {
            setUser({ accessToken: window.localStorage.getItem("accessToken") });
        }
    }, [navigate, user]);
    
    return children;
}