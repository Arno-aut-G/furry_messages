import { useRef } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
//import { useHistory } from 'react-router-com'
import queryString from 'querystring'
import jwt_decode from 'jwt-decode'
import useLocalStorage from '../hooks/useLocalStorage'
import axios from 'axios'
const PORT = process.env.PORT || 'http://localhost:3002'


const Login = ({ onIdSubmit, setToken }) => {

        const eMailRef = useRef()
        const passWordRef = useRef()
    
        const handleSubmit = (e) => {
            e.preventDefault()

            let user = {
                email: eMailRef.current.value,
                password: passWordRef.current.value
            }

            console.log(user)

            axios
                .post(`${PORT}/login`, queryString.stringify(user))    
                .then(res => {             
                    const auth_token = res.data
                    console.log(auth_token)
                    const decoded = jwt_decode(auth_token)
                    console.log(decoded)
                    const idUsername = (({_id, username}) => ({_id, username}))(decoded.user)
                    console.log(idUsername)
                    onIdSubmit(idUsername)
                    setToken(auth_token)
            }).catch(err => {
                console.log(err)
            })
        }

    return (
    <Container className='align-items-center d-flex' style={{ height:'100vh' }}>
        <Form onSubmit={handleSubmit} className='w-100'>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" ref={eMailRef} required/>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" ref={passWordRef} required/>
            </Form.Group>
            <Button type='submit' className='mr-2'>Login</Button>
        </Form>
    </Container>
    )


}

export default Login




