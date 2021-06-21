const server = require("http").createServer();

const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000", //this is the port of the react frontend
    }});

const PORT = 5000;
//what is missing here is passing information about who connects and disconnects!

io.on('connection', socket => {
    const id = socket.handshake.query.id
    socket.join(id)

    socket.on('send-message', ({ recipients, text }) => {
        recipients.forEach(recipient => {
            //removing the recipient from the list, so that the recipient on her side has the proper list of all the other recipients
            //adding the sender to the list of recipients
            const newRecipients = recipients.filter(recipient => recipient !== recipient)
            //adding the sender to the list of recipients, so she's gonna e.g. receive replies to this message
            newRecipients.push(id)
            socket.broadcast.to(recipient).emit('receive-message', { recipients: newRecipients, sender: id, text})
        })
    })
})

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });