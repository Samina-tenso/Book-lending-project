import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Auth from "../api/auth.api";
import { Outlet, useNavigate, Link, useParams } from "react-router-dom";
export const ProtectedRoute = () => {
    const { username } = useParams()
    const navigate = useNavigate()
    const handleLoggout = () => {
        Auth.logout();
        navigate('/');
    }
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        navigate('/')
        return
    } return (<><Navbar  ><Container fluid >
        <Button onClick={handleLoggout}>Logout</Button>
        <Link to={`${username}/books`}>Add books</Link>
        <Link to={`${username}`}>My shelf</Link>
        <Link to={`${username}/books-available`}>Books to lend</Link>
    </Container></Navbar><Outlet /></>)

}
export default ProtectedRoute; 