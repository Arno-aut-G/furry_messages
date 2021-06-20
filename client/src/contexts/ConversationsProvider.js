import React, { useContext, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { useContacts } from '../contexts/ContactsProvider'

const ConversationsContext = React.createContext()

export const useConversations = () => {
    return useContext(ConversationsContext)
}

export function ConversationsProvider( { id, children } ) {
    const [conversations, setConversations] = useLocalStorage('conversations', [])
    const [selectedConversationIndex, setSelectedConversationIndex] = useState(0)
    const { contacts } = useContacts()


    const createConversation = (recipients) => {
        setConversations(prevConversations => {
            return [...prevConversations, { recipients, messages: [] }]
        })
    }

    //this function is called when we send messages to other people, but also from the server when we receive a message >> taking messages from sender but also taking messages from others
    //here, the main action of the app happens
    const addMessageToConversation = ({ recipients, text, sender }) => {
        setConversations(prevConversations => {
            let madeChange = false //evaluates whether a new conversations has to be created or whethe the message is to be added to an existing conversation (if false, create; if true, add)
            const newMessage = { sender, text }
            
            //see whether recipients matches conversations and update this conversation
            const newConversations = prevConversations.map(conversation => {
                if (arrayEquality(conversation.recipients, recipients))
                {
                    madeChange = true
                    return {
                        ...conversation,
                        messages: [...conversation.messages, newMessage]
                    }
                }

                return conversation
            })

            if (madeChange){
                    return newConversations
            } else {
                return [
                    ...prevConversations, 
                    { recipients, messages: [newMessage]}
                ]
            }
        })
    }

    const sendMessage = (recipients, text) => {
        addMessageToConversation({ recipients, text, sender: id})
    }

    //recipient is only an id. we also want to get the name of the recipient
    const formattedConversations = conversations.map((conversation, index) => {
        const recipients = conversation.recipients.map(recipient => {
            const contact = contacts.find(contact => {
                return contact.id === recipient
            })
            const name = (contact && contact.name) || recipient
            return { id: recipient, name} //i would have chosen 'name: name' here
        })
        const selected = index === selectedConversationIndex
        return { ...conversation, recipients, selected }
    })

    const value = {
        conversations: formattedConversations,
        selectedConversation: formattedConversations[selectedConversationIndex],
        sendMessage,
        selectConversationIndex: setSelectedConversationIndex,
        createConversation
    }

    return (
        <ConversationsContext.Provider value={value}>
            {children}
        </ConversationsContext.Provider>
    )
}

const arrayEquality = (a, b) => {
    if (a.length !== b.length) { return false}

    a.sort()
    b.sort()

    return a.every((e, i) => e === b[i])
}
