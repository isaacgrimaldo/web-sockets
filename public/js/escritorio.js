
/* Refecias la HTML */
const nameEscritorio  = document.querySelector('h1');
const btn             = document.querySelector('button');
const  ticketAttening = document.querySelector('small');
const alerta          = document.querySelector('.alert');
const lblPendientes   =  document.querySelector('#lblPendientes');

const  socket = io();

const  searchParams = new URLSearchParams( window.location.search);

if(!searchParams.has('escritorio')){
    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio');
}

const escritorio = searchParams.get('escritorio');
nameEscritorio.innerHTML = `Escritorio ${escritorio}`;
alerta.style.display = 'none';


socket.on('connect',() => {
      btn.disabled = false;
});

socket.on('discconect',() => {
    btn.disabled = true;
});

socket.on('ticket-pendientes', payload => {

    if(payload == 0){
        return lblPendientes.innerHTML = 'Sin tickets que antender'; 
    }
    
    lblPendientes.innerHTML = payload;
});


btn.addEventListener('click',() =>{
    socket.emit('Atender-Tickect', {escritorio} , (payload) =>{
          
          if(!payload.ok){  
             
             alerta.style.display = 'block';
             alerta.innerHTML = payload.msg;
             ticketAttening.innerText = 'Nadie';
             disabledButton(btn); 

             return;
          }
                  
          ticketAttening.innerHTML = 'Tickect ' + payload.numero
    } )
})




function disabledButton (btn) {
     btn.disabled =  true;
}