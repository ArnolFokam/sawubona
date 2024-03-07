import React, { useState } from 'react';

import Login from '@/client/components/Login';
import useToken from '@/client/components/useToken';

const Dashboard = () => {
    const [userToken, setUserToken] = useToken();
    
    if(!userToken) {
        return <Login setToken={setUserToken} />
    }

    return <>Dashboard</>;
};

export default Dashboard;