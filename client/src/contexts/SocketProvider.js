import { useContext, useEffect, useState, createContext } from 'react'
import io from 'socket.io-client'

const SocketContext = createContext()

export function useSocket() {
  return useContext(SocketContext)
}

export function SocketProvider({ idUser, children }) {
  const [socket, setSocket] = useState()
  const id = idUser._id
  console.log(id)
  console.log(socket)

  useEffect(() => {
    const newSocket = io(
      'http://localhost:5000/',
      { query: { id } }
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