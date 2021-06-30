import Contacts from "../components/Contacts"

from Sidebar.js

<div style={{ width: '500px'}} className='d-flex flex-column'>
<div style={{ width: '250px'}} className='d-flex flex-column border border-right overflow-auto flex-grow-1'>
    <Conversations />
<div className='p-2 border border-top border-right small'>
        Username: <span className='text-muted'>{id.username}</span>
</div>
</div>
<div style={{ width: '250px'}} className='d-flex flex-column'>
    <Contacts />
</div>          
</div>



from Contacts
const { contacts } = useContacts()
    console.log(contacts)

<ListGroup variant='flush'>
            {contacts.map(contact => (
                <ListGroup.Item key={contact._id}>
                    {contact.username}
                </ListGroup.Item>
            ))}
        </ListGroup>