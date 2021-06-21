import React, { useContext, useState, useEffect } from 'react'
import io from 'socket.io-client'
//const PORT = process.env.PORT || 5000

const SocketContext = React.createContext()


export function useSocket() {
    return useContext(SocketContext)
  }

// export const useSocket = () => {
//     return useContext(SocketContext)
// }


export default function SocketProvider({ id, children }) {
    const [socket, setSocket] = useState()

    console.log(id) //yes
    console.log(socket) //no

    useEffect(() => {
        const newSocket = io(
            'http://localhost:5000', //or port
            {query: { id }}
            )
            setSocket(newSocket)

            return () => newSocket.close()
    }, [id])
    

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}
