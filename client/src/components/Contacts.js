import React, {useState} from 'react'
import { ListGroup } from 'react-bootstrap'
import { Modal, Form, Button } from 'react-bootstrap'
import { useContacts } from '../contexts/ContactsProvider'
import { useConversations } from '../contexts/ConversationsProvider' // not sure whether i need this

export default function Contacts() {
    

    const [selectedContactIds, setSelectedContactIds] = useState([])
    const { contacts } = useContacts()
    const { createConversation } = useConversations()

    const handleSubmit = (e) => {
        e.preventDefault()

        createConversation(selectedContactIds)
        //closeModal()
    }

    // if a contact is clicked, it is either removed from the list of selected contacts (the if statement)(i.e. it was selected before) or it is added (i.e. it was not selected before)
    const handleCheckboxChange = (contactId) => {
        setSelectedContactIds(prevSelectedContactIds => {
            if (prevSelectedContactIds.includes(contactId)) {
                return prevSelectedContactIds.filter(prevId => {
                    return contactId !== prevId
                })
            } else {
                return [...prevSelectedContactIds, contactId]
            }
        })
    }

    return (
        <Form onSubmit={handleSubmit}>
                    {contacts.map(contact => (
                        <Form.Group controllId={contacts._id} key={contact._id}>
                            <Form.Check
                                type='checkbox'
                                value={selectedContactIds.includes(contact._id)}
                                label={contact.username}
                                onChange={() => handleCheckboxChange(contact._id)}
                            />
                        </Form.Group>
                    ))}
                    <Button type='submit'>Komunikate</Button>
                </Form>
    )
}
