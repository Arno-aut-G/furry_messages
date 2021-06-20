import React, { useState, useRef } from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'
import { useConversations } from '../contexts/ConversationsProvider'

export default function OpenConversations() {
    const textRef = useRef()
    const [text, setText] = useState('')
    const { sendMessage, selectedConversation } = useConversations()

    const handleSubmit = (e) => {
        e.preventDefault()

        //passing the id of the recipient and the text to the sendMessage function
        sendMessage(selectedConversation.recipients.map(recipient => recipient.id),
        text
        )
        setText('')
    }

    return (
        <div className='d-flex flex-column flex-grow-1'>
            <div className='flex-grow-1 overflow-auto'>
                
            </div>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className='m-2 '>
                        <InputGroup>
                            <Form.Control
                                as='textarea'
                                required
                                value={text}
                                ref={textRef}
                                onChange={() => setText(textRef.current.value)}
                                style={{ height: '75px', resize: 'none'}}
                            />
                            <InputGroup.Append>
                                <Button type="submit">Send</Button>
                                {/* button should take height of textarea, but it doesn't */}
                            </InputGroup.Append>
                        </InputGroup>
                    </Form.Group>
                </Form>
            </div>
    )
}
