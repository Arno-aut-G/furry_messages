import { useContext, useEffect, useState, createContext } from 'react'
import io from 'socket.io-client'

const SocketContext = createContext()

export function useSocket() {
  return useContext(SocketContext)
}

export function SocketProvider({ idUser, children }) {
  const [socket, setSocket] = useState()
  const id = idUser._id
  //console.log(id)
  //console.log(socket)

  useEffect(() => {
    /*const newSocket = io(
      'http://localhost:3002/',
      { query: { id } }
    )*/



    const newSocket = io(
      process.env.REACT_APP_WSSERVER,
      { query: { id } }
    )

    newSocket.on('connect', () => {
      console.info('connected');
    });

    setSocket(newSocket);

    return () => newSocket.close()
  }, [id])

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}