const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { v4: uuidV4 } = require('uuid')

// const {ExpressPeerServer} =require('peer');
// const peerServer=ExpressPeerServer(server,{
//   debug:true
// });
// ajlaama


app.set('view engine', 'ejs')
app.use(express.static('public'))

// app.use('peerjs',peerServer);


console.log("YEAHO");

app.get('/', (req, res) => {
  res.redirect(`/${uuidV4()}`)
})

app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room })
})

// io.on('connection', socket => {
//   socket.on('join-room', (roomId, userId) => {
//     socket.join(roomId);
// socket.broadcast.to(roomId).emit('user-connected', userId) 


// })
// })

io.on('connection', socket => {
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId)
    socket.broadcast.to(roomId).emit('user-connected', userId);
    // messages
    socket.on('message', (message) => {
      //send message to the same room
      io.to(roomId).emit('createMessage', message)
  }); 

    socket.on('disconnect', () => {
      socket.broadcast.to(roomId).emit('user-disconnected', userId)
    })
  })
})




const port=process.env.PORT||8000
server.listen(`${port}`);
