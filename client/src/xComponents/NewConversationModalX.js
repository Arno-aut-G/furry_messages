import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useContacts } from '../contexts/ContactsProvider'
import { useConversations } from '../contexts/ConversationsProvider'

export default function NewConversationModal({ closeModal }) {
    const [selectedContactIds, setSelectedContactIds] = useState([])
    const { contacts } = useContacts()
    const { createConversation } = useConversations()

    const handleSubmit = (e) => {
        e.preventDefault()

        createConversation(selectedContactIds)
        closeModal()
    }

    //if a contact is clicked, it is either removed from the list of selected contacts (the if statement)(i.e. it was selected before) or it is added (i.e. it was not selected before)
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
        <>
            <Modal.Header closeButton>Create Conversation</Modal.Header> 
            {/* the result is very ugly; the issue seems to be from the interaction of bootstrap and react-bootstrap:
            https://stackoverflow.com/questions/65472384/react-bootstrap-only-close-button-styling-not-working
            */}
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {contacts.map(contact => (
                        <Form.Group key={contact.id}>
                            <Form.Check
                                type='checkbox'
                                value={selectedContactIds.includes(contact.id)}
                                label={contact.name}
                                onChange={() => handleCheckboxChange(contact.id)}
                            />
                        </Form.Group>
                    ))}
                    <Button type='submit'>Create</Button>
                </Form>
            </Modal.Body>
        </>
    )
}
