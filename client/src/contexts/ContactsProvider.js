import { useContext, useState, useEffect, createContext } from 'react'
import axios from 'axios'
const PORT = process.env.PORT || 'http://localhost:3002'

const ContactsContext = createContext()

export const useContacts = () => {
    return useContext(ContactsContext)
}

export function ContactsProvider( { token, children} ) {
    const [contacts, setContacts] = useState([]) //let this be the state storing all contacts
    const [mapContacts, setMapContacts] = useState([])
    console.log(mapContacts)

    // const [contacts, setContacts] = useLocalStorage('contacts', [])

    // const createContact = (id, name) => { //was passed as a prop
    //     setContacts(prevContacts => {
    //         return [...prevContacts, {id, name}]
    //     })
    // }
    

    const searchedUsersGet = (queryString) => { 
        axios
                    .get(`${PORT}/users`, 
                        {
                            headers: {
                                'auth-token': token, //useLocalStorage, the legit npm version
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                            params: queryString
                        }
                    )
                    .then(res => {
                        console.log(res)
                        let contacts = res.data.users.map(({_id, username}) => ({_id, username}))
                        setContacts(contacts)
                    })
                    .catch(err => {
                        console.log(err)
                    })                    
        }
    
    const usersGet = () => { 
            axios
                .get(`${PORT}/users`,
                    {
                        headers: {
                            'auth-token': token, 
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }
                )
                .then(res => {
                    console.log(res)
                    let allContacts = res.data.users.map(({_id, username}) => ({_id, username})) //TODO i will need more information about the contacts here (same above)
                    console.log(allContacts)
                    setMapContacts(allContacts)
                })
                .catch(err => {
                    console.log(err)
                })
                
    }
        
        

    useEffect(() => {
        if (token) {usersGet()
                    searchedUsersGet('')}
    }, [token])


    

    return (
        <ContactsContext.Provider value={{ contacts, mapContacts, searchedUsersGet }}>
            {children}
        </ContactsContext.Provider>
    )
}
