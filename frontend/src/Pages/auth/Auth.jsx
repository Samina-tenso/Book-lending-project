import AuthNavbar from "./NavBar"
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Auth from "./auth.api";
import { Outlet, useNavigate, Link, useParams } from "react-router-dom";
export const ProtectedRoute = ({ children }) => {
    const { username } = useParams()
    console.log(username)
    const navigate = useNavigate()
    const handleLoggout = () => {
        Auth.logout();
        navigate('/auth/signin');
    }
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        navigate('/auth/signin')
        return
    } return (<><Navbar><Container>
        <Button onClick={handleLoggout}>logout</Button>
        <Link to={`${username}/books`}>Add books</Link>
        <Link to={`${username}`}>My shelf</Link>
        <Link to={`${username}/books-available`}>Books to lend</Link>
    </Container></Navbar><Outlet /></ >)

}
export default ProtectedRoute; 