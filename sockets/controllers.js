const {Ticket} =  require('../models/Ticket');

const ticket = new Ticket( );



const cliente  =  (clientes) => {

            clientes.on('last-ticket',( payload, callback) =>{
                 ticket.init();
                 const  data = ticket.lastTicket;
                  callback(data);
            });

           clientes.emit('ticket-pendientes', ticket.ticketsHoy.length);  
           clientes.emit('ultimo-tickets', ticket.ultimosTickets);



            clientes.on('next-ticket',( payload , callback)  => { // el callback del on es la respuesta que resive el emit
                  
                 const  nextTicket = ticket.next();
                 clientes.broadcast.emit('ticket-pendientes', ticket.ticketsHoy.length);  
                 callback(nextTicket);
               
            })

            clientes.on('Atender-Tickect',({escritorio}, callback) => {
                    
                 if(!escritorio){
                    return callback({
                           ok:false,
                           msg:'Es necesario el escritorio'
                      })
                 }

                 
                 const ticketAttend = ticket.ticketAttend(escritorio)

                 if(ticketAttend === null){
                   clientes.broadcast.emit('ticket-pendientes', ticket.ticketsHoy.length);  
                    return callback({
                           ok:false,
                           msg:'Ya no hay mas tickets'
                           
                      })
                 }
                 
                 clientes.emit('ticket-pendientes', ticket.ticketsHoy.length);  
                 clientes.broadcast.emit('ticket-pendientes', ticket.ticketsHoy.length);
                 clientes.broadcast.emit('ultimo-tickets', ticket.ultimosTickets);

                   return callback({
                        ok:true,
                        ...ticketAttend
                   });

            })

}








/*
const cliente  =  (clientes) => {
    
     console.log('Cliente conectado', clientes.id); //id del cliente (cada vez que se vuelve a conectar cambia este id)

              // cuando el cliente se desconecta
              clientes.on('disconnect',() => {
                  console.log('Cliente desconectado', clientes.id )
             })

             //capturamos el evento personalizado 
            clientes.on('send-messeger',(payload, callback)  => {
                  
                 //el callback  es la funcion que se llama si todo salio correctamente
                 const id = 444;
                 callback(id); 
                  
                 // envia la infromacion a todo menos al clinte que la mando al servidor
                 clientes.broadcast.emit('send-messeger', payload); //aqui es el servidor es el que esta emitiendo el evento y este puede ser escuchado por todos lo clientes

            })

}
*/
module.exports = {
    cliente
}