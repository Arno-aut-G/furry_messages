import React, { useState, useRef, useCallback } from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'
import { useConversations } from '../contexts/ConversationsProvider'

export default function OpenConversations() {
    const textRef = useRef()
    const [text, setText] = useState('')
    const setRef = useCallback(node => {
        if (node){
        node.scrollIntoView({ smooth: true})
    }
    }, [])
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
                <div className='d-flex flex-column align-items-start justify-content-end px-3'> 
                {/* without h-100, new messages appear on top, but with it, the messages are not scrollable */}
                    {selectedConversation.messages.map((message, index) => {
                        const lastMessage = selectedConversation.messages.length - 1 === index
                        return (
                            <div
                                ref={lastMessage ? setRef : null}
                                key='index'
                                className={`my-1 d-flex flex-column ${message.fromMe ? 'align-self-end align-items-end' : 'align-items-start'}`}
                            >
                                <div className={`rounded px-2 py-1 ${message.fromMe ? 'bg-primary text-white' : 'border'}`}>
                                    {message.text}
                                </div>
                                <div className={`text-muted small ${message.fromMe ? 'text-right' : ''}`}>
                                    {message.fromMe ? 'You' : message.sender.name}
                                </div>
                            </div>
                        )
                    })}
                </div>
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
