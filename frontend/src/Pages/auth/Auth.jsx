import AuthNavbar from "./NavBar"
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Auth from "./auth.api";
import { Outlet, useNavigate, Link } from "react-router-dom";
export const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate()
    const handleLoggout = () => {
        Auth.logout();
        navigate('/auth');
    }
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        return <Navigate to='/login' />
    } return (<><Navbar><Container> <Button onClick={handleLoggout}>logout</Button><Button> Add books</Button></Container></Navbar><Outlet /></ >)

}
export default ProtectedRoute; 