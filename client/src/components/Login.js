import {useRef} from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { v4 as uuidV4 } from 'uuid'

export default function Login({ onIdSubmit }) {
    const idRef = useRef()

    const handleSubmit = (e) => {
        e.preventDefault()

        onIdSubmit(idRef.current.value)
    }

    const createNewId = () => {
        onIdSubmit(uuidV4())
    }

    return (
        <Container className='align-items-center d-flex' style={{ height:'100vh' }}>
            <Form onSubmit={handleSubmit} className='w-100'>
                <Form.Group>
                    <Form.Label>Enter your ID</Form.Label>
                    <Form.Control type='text' ref={idRef} required/>
                </Form.Group>
                <Button type='submit' className='mr-2'>Login</Button>
                <Button onClick={createNewId} variant='secondary'>Create a new ID</Button>
            </Form>
        </Container>
    )
}

// const handleSubmit = (e) => {
//     e.preventDefault()
// send the data to the database, verify it, receive a token, store it in the ls, and store the id there
//     onIdSubmit(idRef.current.value)
// }


// return (
//     <Container className='align-items-center d-flex' style={{ height:'100vh' }}>
//         <Form onSubmit={handleSubmit} className='w-100'>
//             <Form.Group>
//                 <Form.Label>Username</Form.Label>
//                 <Form.Control type='text' ref={idRef} required/>
//                 <Form.Label>Password</Form.Label>
//                 <Form.Control type='text' ref={idRef} required/>
//             </Form.Group>
//             <Button type='submit' className='mr-2'>Login</Button>
//             <Button onClick={createNewId} variant='secondary'>Create a new ID</Button>
//         </Form>
//     </Container>
// )
