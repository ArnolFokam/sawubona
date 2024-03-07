import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';


import Login from '@/client/components/Login';
import Register from '@/client/components/Register';
import useToken from '@/client/components/useToken';

const Welcome = () => {
    const [userToken, setUserToken] = useToken();

    if (!userToken) {
        return (
            <Routes>
                <Route path="/" element={<Login setToken={setUserToken} />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        );
    } else {
        console.log('userToken', userToken);
        window.location.replace('/dashboard');
    }
};

export default Welcome;