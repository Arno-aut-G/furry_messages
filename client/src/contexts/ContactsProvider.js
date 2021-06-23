import React, { useContext, useState, useEffect } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import axios from 'axios'
const PORT = process.env.PORT || 'http://localhost:3002'

const ContactsContext = React.createContext()

export const useContacts = () => {
    return useContext(ContactsContext)
}

export function ContactsProvider( {children} ) {
    const [contacts, setContacts] = useState([])

    // const [contacts, setContacts] = useLocalStorage('contacts', [])

    // const createContact = (id, name) => { //was passed as a prop
    //     setContacts(prevContacts => {
    //         return [...prevContacts, {id, name}]
    //     })
    // }

    console.log(localStorage.komunikate_messenger_token)

    const usersGet = () => {
        axios
                    .get(`${PORT}/users`,
                        {
                            headers: {
                                'auth-token': localStorage.komunikate_messenger_token
                            }
                        }
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
        usersGet()
    }, [])

    

    // export const categoryCreate = async (categoryToCreate) => {
    //     try {
    //       const response = await axios.post(
    //         `${apiUrl}categories/add_category`,
    //         categoryToCreate,
    //         {
    //           headers: {
    //             "auth-token": localStorage.usertoken,
    //           },
    //         }
    //       );
    //       return response.data;
    //     } catch (error) {
    //       console.error(error.response.data);
    //       alert(error.response.data);
    //     }
    //   };

    // axios
    //         .get(`${PORT}/users`)
    //         .then(res => {
    //             let contacts = res.data.users.map(({_id, username}) => ({_id, username}))
    //             console.log(contacts)
    //             setContacts(contacts)
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })

    return (
        <ContactsContext.Provider value={{ contacts }}>
            {children}
        </ContactsContext.Provider>
    )
}
