import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/esm/Form'
import FormGroup from 'react-bootstrap/FormGroup'
import FormLabel from 'react-bootstrap/FormLabel';
import { useState } from 'react';
import Auth from './auth.api'
import { useNavigate, useParams } from 'react-router-dom';
const Login = () => {

    const navigate = useNavigate()
    const { username } = useParams()

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''

    })
    const submitLoginForm = async (e) => {
        console.log(formData)
        e.preventDefault();
        try {
            let { username } = await Auth.login(formData)
            console.log(username)
            navigate(`/my-shelf/${username}`);
            //  window.location.reload();

        } catch (error) {
            console.log(error)
        }



        //login data    
    }

    const handleChange = (e) => {
        let value = e.target.value
        setFormData({ ...formData, [e.target.name]: value })
    }
    return (
        <>
            <Container>
                <h2>Login to your bookshelf</h2>
                <Form onSubmit={submitLoginForm}>
                    <FormGroup >
                        <FormLabel htmlFor={'login-username'} >Username</FormLabel>
                        <input type="text" id={'login-username'} placeholder="username" name='username' value={formData.username} onChange={handleChange} />
                        <FormLabel htmlFor={'login-email'} name='email'>Email</FormLabel>
                        <input type="email" id={'login-email'} placeholder="email" value={formData.email} onChange={handleChange} name='email' />
                        <FormLabel htmlFor={'login-password'} type='password' name='password'>Password</FormLabel>
                        <input type="password" id={'login-password'} placeholder="password" value={formData.password} onChange={handleChange} name='password' />
                        <button type='submit'> Login</button>
                    </FormGroup>
                </Form>
            </Container>
        </>
    )
};

export default Login; 