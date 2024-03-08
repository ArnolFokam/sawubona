import { Navigate, Route, Routes } from 'react-router-dom';

import Login from '@/client/components/Login';
import Register from '@/client/components/Register';
import useToken from '@/client/components/useToken';

const Welcome = () => {
    const [token, setToken, _] = useToken();
    if (!token) {
        return <Routes>
            <Route path="/" element={<Login setToken={setToken} />} />
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route path="/register" element={<Register />} />
            <Route
                path="*"
                element={
                    <div>
                        <h1>404</h1>
                        <button onClick={() => window.location.replace('/')}>Go Home</button>
                    </div>
                }
            />
        </Routes>;
    } else {
        console.log("redirect", token);
        window.location.replace('/dashboard');
    }
};

export default Welcome;