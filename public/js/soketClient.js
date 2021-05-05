const socket = io(); // se ingesa al servidor del backend;

// refencias al html
const txtOffline = document.querySelector('#txtOffline');
const txtOnline  = document.querySelector('#txtOnline');
const message    = document.querySelector('#message');
const bntSend    = document.querySelector('#bntSend');
const chat       = document.querySelector('#chat');


socket.on('connect', () =>{ //cliente conectado
    //console.log('conectado');
     
    txtOffline.style.display = 'none';
    txtOnline.style.display = '';

})

socket.on('disconnect', () =>{ // cuando se desconecta el cliente 

    //console.log('desconectado');
     
    txtOnline.style.display = 'none';
    txtOffline.style.display = '';

})

socket.on('send-messeger', payload =>{
    
    //console.log('mensaje nuevo');
    const {id ,  mensaje} = payload;

    const chatMessage = `
      <div class="text-white bg-success">
            <p>Usuario ${id}</p> 
            <p>mensaje: <br>${mensaje}</p>
      </div> 
    `
    
    chat.innerHTML += chatMessage;
})




bntSend.addEventListener('click',()=>{
     const mensaje  =  message.value;
     const payload = { // los datos enviados es mejor mandarlo en forma de un objeto
          mensaje,
          id: new Date().getTime(),
     }
      
     const chatMessage = `
     <div class="text-white bg-success">
           <p>Usuario ${payload.id}</p> 
           <p>mensaje: <br>${payload.mensaje}</p>
     </div> 
   ` 
   chat.innerHTML += chatMessage;


     socket.emit('send-messeger',  payload , (id) => {
         console.log('desde el servidor' , id)
     }); // evento personalizado
     
      // cuando se emite un eveto sus parametro son ('evento', informacion ,callback(si todo ocurrio correctamnete))

})



