import { useState } from 'react'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import useLocalStorage from './hooks/useLocalStorage';
import { ContactsProvider} from './contexts/ContactsProvider'
import { ConversationsProvider } from './contexts/ConversationsProvider'
import { SocketProvider } from './contexts/SocketProvider';

function App() {
  const [id, setId] = useLocalStorage('idusername', null)
  const [token, setToken] = useLocalStorage('token', null)
  //reminder: id = {_id, username}
  console.log(id)


  const dashboard = (
      <SocketProvider id={id}>
       <ContactsProvider >
          <ConversationsProvider id={id}>
            <Dashboard id={id}/>
          </ConversationsProvider>
        </ContactsProvider>
      </SocketProvider>
  )

  return (
   
      !id ? <Login onIdSubmit={setId} setToken={setToken} /> : dashboard

  );
}

export default App;
