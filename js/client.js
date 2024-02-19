const socket = io(`http://localhost:8000`);

const form = document.getElementById('send-container');
const messageInput  = document.getElementById('messsageInp');
const messageContainer = document.querySelector('.container')


const append = (message , position ) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message ;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}

form.addEventListener('submit' , (e) => {
    e.preventDefault
    const message = messageInput.value
    append(`you : ${message}` , 'right')
    socket.emit('send' , message)
    messageInput.value = ''
})

const  name = prompt("enter your name for joining");

    console.log("1" , name);
    socket.emit('new' , name);


    socket.on('user-joined' , data => {
        append(`${name} joined the chat` , 'right')
        
    })
    
    socket.on('receive' , data => {
        append(`${data.name} : ${data.message} ` , 'left')
        
    })
    


socket.on('left' , name  => {
    append(`${name} leave the chat` , 'left')
    
})


// const socket = io();

// // Handle form submission
// function sendMessage() {
//   const messageInput = document.getElementById('message');
//   const message = messageInput.value;

//   // Send the message to the server
//   socket.emit('chat message', message);

//   // Clear the input field
//   messageInput.value = '';

//   return false;
// }

// // Handle received messages
// socket.on('chat message', (msg) => {
//   const messagesList = document.getElementById('messages');
//   const li = document.createElement('li');
//   li.textContent = msg;
//   messagesList.appendChild(li);
// });