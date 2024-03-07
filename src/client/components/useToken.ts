import { useEffect, useState } from 'react';

export default function useToken() {

    const getToken = () => {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString!);
        return userToken?.token
    };

    const [userToken, setToken] = useState<string>(
        typeof localStorage !== 'undefined' ? getToken() : ''
    );

    const setUserToken: any = (userToken: { token: string; }) => {
        localStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken.token);
    };

    return [
        userToken,
        setUserToken
    ]
}