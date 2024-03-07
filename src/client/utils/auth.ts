export function setToken(userToken: string) {
    sessionStorage.setItem('auth-token', JSON.stringify(userToken));
}

export function getToken() {
    const tokenString = sessionStorage.getItem('auth-token');
    const userToken = JSON.parse(tokenString || '{}');
    return userToken?.token;
}