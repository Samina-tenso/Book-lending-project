import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/esm/Form'
import FormGroup from 'react-bootstrap/FormGroup'
import FormLabel from 'react-bootstrap/FormLabel';
import { useState } from 'react';
import Auth from './auth.api'
import { useNavigate, useParams } from 'react-router-dom';
const Registration = () => {

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''

    })
    const submitRegForm = async (e) => {
        e.preventDefault();
        try {
            let { username } = await Auth.signup(formData)
            console.log(username)
            navigate(`/my-shelf/${username}`);
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleChange = (e) => {
        let value = e.target.value
        setFormData({ ...formData, [e.target.name]: value })
    }
    return (
        <>
            <Container>
                <h2>Register as new user</h2>
                <Form onSubmit={submitRegForm}>
                    <FormGroup >
                        <FormLabel htmlFor={'register-username'} >Username</FormLabel>
                        <input type="text" id={'register-username'} placeholder="username" name='username' value={formData.username} onChange={handleChange} />
                        <FormLabel htmlFor={'register-email'} name='email'>Email</FormLabel>
                        <input type="email" id={'register-email'} placeholder="email" value={formData.email} onChange={handleChange} name='email' />
                        <FormLabel htmlFor={'register-password'} type='password' name='password'>Password</FormLabel>
                        <input type="password" id={'register-password'} placeholder="password" value={formData.password} onChange={handleChange} name='password' />
                        <button type='submit'> Register</button>
                    </FormGroup>
                </Form>
            </Container>
        </>
    )
};

export default Registration; 