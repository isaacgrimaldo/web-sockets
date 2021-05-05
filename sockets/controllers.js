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

module.exports = {
    cliente
}