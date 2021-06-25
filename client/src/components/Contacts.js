import React, { useState, useRef } from 'react'

import { Form, Button } from 'react-bootstrap'
import { useContacts } from '../contexts/ContactsProvider'
import { useConversations } from '../contexts/ConversationsProvider' // not sure whether i need this

export default function Contacts() {
    const languagesRef = useRef()
    const citiesRef = useRef()

    const [selectedContactIds, setSelectedContactIds] = useState([])
    const { contacts, setQueryString } = useContacts()
    const { createConversation } = useConversations()

    const handleSubmit = (e) => {
        e.preventDefault()

        createConversation(selectedContactIds)
        //closeModal()
    }

    const querySubmit = (e) => {
        e.preventDefault()

        const newQueryString = { params: {languages: languagesRef, city_in_germany: citiesRef}}
        setQueryString(newQueryString)
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
        <>
        <Form onSubmit={querySubmit}>
            <Form.Group>
                <Form.Label>By Language</Form.Label>
                <Form.Control as="select">
                    <option>English</option>
                    <option>German</option>
                    <option>Spanish</option>
                    <option>Arabic</option>
                    <option>Turkish</option>
                </Form.Control>
                <Form.Label>By City</Form.Label>
                <Form.Control as="select">
                    <option>Berlin</option>
                    <option>Frankfurt am Main</option>
                    <option>Hamburg</option>
                    <option>Stuttgart</option>
                    <option>Munich</option>
                </Form.Control>
                </Form.Group>
                <Button type="submit">
                    Submit
                </Button> 
        </ Form>
        <Form onSubmit={handleSubmit}>
                    {contacts.map(contact => (
                        <Form.Group key={contact._id}>
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
        </>
    )
}
