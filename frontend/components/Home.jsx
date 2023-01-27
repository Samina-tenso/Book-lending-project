import { Stack, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <Container>
            <h1> Welcome to Book lending </h1>
            <Stack direction="horizontal" gap={3}>
                <Link to={'signin'}>Login</Link>
                <Link to={'signup'}>Register</Link>
            </Stack>
        </Container>
    )
}
export default Home