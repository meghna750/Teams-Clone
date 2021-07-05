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
const cors = require('cors');


app.set('view engine', 'ejs')
app.use(express.static('public/'))
app.use(cors());
// app.use('peerjs',peerServer);


console.log("YEAHO");
app.get('/thankssss',(req,res)=>{
  // roomId='';
  res.render('thanks');
})
app.get('/home',(req,res)=>{
  // roomId='';
  res.render('home');
})
app.get('/window.history.go(-1)',(req,res)=>{
  res.render('window.history.go(-1)');
})
// app.get('/', (req, res) => {
//   res.redirect(`/${uuidV4()}`)
// })
app.get('/', (req, res) => {
  // res.redirect(`/${uuidV4()}`)
  res.render('home');
  // res.send("welcm");
})
app.get('/room', (req, res) => {
  res.redirect(`/${uuidV4()}`)
  // res.render('home');
  // res.send("welcm");
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
