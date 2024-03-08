import useToken from '@/client/components/useToken';

const Dashboard = () => {
    const [token, _, removeToken] = useToken();

    if (token) {
        return <>
        <h1>Dashboard</h1>
        <button onClick={removeToken}>Logout</button>
        </>;
    } else {
        window.location.replace('/');
    }


};

export default Dashboard;