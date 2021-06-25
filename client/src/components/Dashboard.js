import Sidebar from "./Sidebar"
import OpenConversations from "./OpenConversations"
import { useConversations } from '../contexts/ConversationsProvider'


export default function Dashboard({ idUser }) {
    const { selectedConversation } = useConversations()
    console.log(idUser)
    
    return (
        <div className='d-flex' style={{ height: '100vh' }}>
            <Sidebar idUser={idUser}/>
            {selectedConversation && <OpenConversations/>}
        </div>        
    )
}
