const  socket =  io();

const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
const btn  = document.querySelector('button');

socket.on('connect',() => {
      btn.disabled = false;
});

socket.on('discconect',() => {
    btn.disabled = true;
});

 btn.addEventListener('click',() =>{
 
    socket.emit('next-ticket', {y:1} , (id) =>{
        lblNuevoTicket.innerText = id; 
    });
 })

 
 window.addEventListener('load', () => {
      socket.emit('last-ticket', {} , (last) =>{
          lblNuevoTicket.innerText = `Ticket ${last}`;
      })
})