import Login from './components/Login'
import Dashboard from './components/Dashboard'
import useLocalStorage from './hooks/useLocalStorage';
import { ContactsProvider } from './contexts/ContactsProvider'
import { ConversationsProvider } from './contexts/ConversationsProvider'
import { SocketProvider } from './contexts/SocketProvider';

function App() {
  const [idUser, setIdUser] = useLocalStorage('idusername', null)
  const [token, setToken] = useLocalStorage('token', null)
  //reminder: idUser = {_id, username}
  console.log(idUser)


  const dashboard = (
      <SocketProvider idUser={idUser}>
       <ContactsProvider token={token}>
          <ConversationsProvider idUser={idUser} token={token}>
            <Dashboard idUser={idUser}/>
          </ConversationsProvider>
        </ContactsProvider>
      </SocketProvider>
  )

  return (
   
      !idUser && !token ? <Login onIdSubmit={setIdUser} setToken={setToken} /> : dashboard

  );
}

export default App;
