import { useRef } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useContacts } from '../contexts/ContactsProvider'

export default function NewContactModal({ closeModal }) {
    const { createContact } = useContacts()
    const idRef = useRef()
    const nameRef = useRef()

    const handleSubmit = (e) => {
        e.preventDefault()
        createContact(idRef.current.value, nameRef.current.value)
        closeModal()
    }

    return (
        <>
            <Modal.Header closeButton>Create Contact</Modal.Header> 
            {/* the result is very ugly; the issue seems to be from the interaction of bootstrap and react-bootstrap:
            https://stackoverflow.com/questions/65472384/react-bootstrap-only-close-button-styling-not-working
            */}
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>ID</Form.Label>
                        <Form.Control type="text" ref={idRef} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" ref={nameRef} required />
                    </Form.Group>
                    <Button type='submit'>Create</Button>
                </Form>
            </Modal.Body>
        </>
    )
}
