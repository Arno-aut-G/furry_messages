import { useContext, useState, useEffect, useCallback, createContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { useContacts } from './ContactsProvider'
import { useSocket } from './SocketProvider'

const PORT = process.env.PORT || 'http://localhost:3002'

const ConversationsContext = createContext()

export const useConversations = () => {
    return useContext(ConversationsContext)
}

export function ConversationsProvider( { idUser, children } ) {
    const [conversations, setConversations] = useLocalStorage('conversations', [])
    const [selectedConversationIndex, setSelectedConversationIndex] = useState(0)
    const { contacts } = useContacts()
    const socket = useSocket()
    console.log(socket)
    console.log(conversations)
    const id = idUser._id

    //TODO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // const getConversations = () => { //I will need the conversations that are attached to the specific user, i.e. where the use either is the sender or one of the recipients, i.e. all the messages that pertain to the room-id of the user
    //         axios
    //                     .get(`${PORT}/`,
    //                         {
    //                             headers: {
    //                                 'auth-token': JSON.parse(localStorage.komunikate_messenger_token), //useLocalStorage, the legit npm version
    //                                 'Content-Type': 'application/x-www-form-urlencoded'
    //                             }
    //                         }
    //                     )
    //                     .then(res => {
    //                         console.log(res)
    //                         setConversations(conversations)
    //                     })
    //                     .catch(err => {
    //                         console.log(err)
    //                     })
    // }
    



    const createConversation = (recipients) => {
        setConversations(prevConversations => {
            return [...prevConversations, { recipients, messages: [] }]
        })
    }

    //this function is called when we send messages to other people, but also from the server when we receive a message >> taking messages from sender but also taking messages from others
    //here, the main action of the app happens
    //THIS GONNA BE USECALLBACK, because we don't want this function to be rebuild on every rerender
    const addMessageToConversation = useCallback(({ recipients, text, sender }) => {
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
    }, [setConversations])

    useEffect(() => {
        if (!socket) return

        socket.on('receive-message', addMessageToConversation)

        return () => socket.off('receive-message')
    }, [socket, addMessageToConversation])

    const sendMessage = (recipients, text) => {
        socket.emit('send-message', { recipients, text })

        addMessageToConversation({ recipients, text, sender: id})
    }

    useEffect(() => {
        //getting conversations from database!!
    })

    //recipient is only an id. we also want to get the name of the recipient
    const formattedConversations = conversations.map((conversation, index) => {
        const recipients = conversation.recipients.map(recipient => {
            const contact = contacts.find(contact => {
                return contact.id === recipient
            })
            const name = (contact && contact.name) || recipient
            return { id: recipient, name} //i would have chosen 'name: name' here
        })

        const messages = conversation.messages.map(message => {
            const contact = contacts.find(contact => {
                return contact.id === message.sender
            })
            const name =  (contact && contact.name) || message.sender
            const fromMe = id === message.sender
            return { ...message, senderName: name, fromMe }
        })

        const selected = index === selectedConversationIndex
        return { ...conversation, messages, recipients, selected }
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

    return a.every((element, index) => {
        return element === b[index]
      })
}
