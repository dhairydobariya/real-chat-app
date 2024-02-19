const io = require('socket.io')(8000, {
    cors: {
      origin: "*",
    }
  });
  
  const users = {};
  
  io.on('connection', socket => {
  
    // socket.on('new', name => {
   
    //   console.log("2", name);

    //   users[socket.id] = name;
    //   console.log("user name" , name, socket.id , users);
    //   socket.broadcast.emit('user-joined', name);
    // });

    socket.on('new', name => {
      console.log("2", name);
  
      if (name) {
          users[socket.id] = name;
          console.log("user name", name, socket.id, users);
          socket.broadcast.emit('user-joined', name);
      }
  });
  
  socket.on('user-joined', data => {
    append(`${data.name} joined the chat`, 'right');
});

    socket.on('send', message => {
      socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
    });

    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
      });
  });
  

// const express = require('express');
// const app = express();
// const http = require('http').createServer(app);
// const io = require('socket.io')(http);

// // Serve static files from the public directory
// app.use(express.static('public'));

// // Handle socket connections
// io.on('connection', (socket) => {
//   console.log('A user connected');

//   // Handle chat message event
//   socket.on('chat message', (msg) => {
//     console.log('Message: ' + msg);

//     // Broadcast the message to all connected clients
//     io.emit('chat message', msg);
//   });

//   // Handle disconnect event
//   socket.on('disconnect', () => {
//     console.log('A user disconnected');
//   });
// });

// // Start the server
// http.listen(3000, () => {
//   console.log('Server started on http://localhost:3000');
// });
  