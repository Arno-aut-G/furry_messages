import { useContext, useState, useEffect, createContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import axios from 'axios'
const PORT = process.env.PORT || 'http://localhost:3002'

const ContactsContext = createContext()

export const useContacts = () => {
    return useContext(ContactsContext)
}

export function ContactsProvider( {children} ) {
    const [contacts, setContacts] = useState([])
    const [queryString, setQueryString] = useState('')

    // const [contacts, setContacts] = useLocalStorage('contacts', [])

    // const createContact = (id, name) => { //was passed as a prop
    //     setContacts(prevContacts => {
    //         return [...prevContacts, {id, name}]
    //     })
    // }

    console.log(localStorage.komunikate_messenger_token)
    

    const usersGet = (queryString) => { 
        axios
                    .get(`${PORT}/users`,
                        {
                            headers: {
                                'auth-token': JSON.parse(localStorage.komunikate_messenger_token), //useLocalStorage, the legit npm version
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }, queryString
                    )
                    .then(res => {
                        console.log(res)
                        let contacts = res.data.users.map(({_id, username}) => ({_id, username}))
                        console.log(contacts)
                        setContacts(contacts)
                    })
                    .catch(err => {
                        console.log(err)
                    })
        }
        
        

    useEffect(() => {
        usersGet(queryString)
    }, [])

    

    return (
        <ContactsContext.Provider value={{ contacts }}>
            {children}
        </ContactsContext.Provider>
    )
}
