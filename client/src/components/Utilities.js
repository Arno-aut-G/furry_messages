import axios from 'axios'
import useLocalStorage from '../hooks/useLocalStorage'

const PORT = process.env.PORT || 'http://localhost:3002' //the server for the backend has to run on this port

export const register = newUser => {
    return axios
        .post(`${PORT}/users/register`, newUser)
        .then(response => {
            console.log('New user registered')
        })
}
