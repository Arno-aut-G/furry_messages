import React, { useState, useRef } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useContacts } from '../contexts/ContactsProvider'
import { useConversations } from '../contexts/ConversationsProvider' // not sure whether i need this here
import SearchModal from './SearchModal'

export default function Contacts({ setActiveKey, conversationsKey }) {
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedContactIds, setSelectedContactIds] = useState([])
    const { contacts } = useContacts()
    const { conversations, createConversation, selectConversationIndex } = useConversations()

    const handleSubmit = (e) => {
        e.preventDefault()

        createConversation(selectedContactIds)
        selectConversationIndex(conversations.length)
        setActiveKey(conversationsKey)
    }

    const closeModal = () => {
        setModalOpen(false)
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
        <div className='d-flex flex-column flex-grow-1'>
            <div className='flex-grow-1 overflow-auto'>
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
                            <div style={{position: 'sticky', top: 0, zIndex: 10,
    backgroundColor: 'white'}} className='p-2 border border-top border-right small'>
                <Button type='submit' size="lg" block>Komunikate</Button>
                <br/>
                <Button onClick={() => setModalOpen(true)} block>Search Komunikators</Button>
        </div>
                    </Form>
            </div>
        </div>

            

            <Modal show={modalOpen} onHide={closeModal}>
                <SearchModal closeModal={closeModal} />               
            </Modal>

        </>
    )
}



