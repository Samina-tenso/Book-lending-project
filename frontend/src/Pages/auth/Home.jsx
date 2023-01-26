import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <Container>
            <h1> Welcome to Book lending </h1>
            <Link to={'signin'}>Login</Link>
            <Link to={'signup'}>Register</Link>
        </Container>

    )
}
export default Home