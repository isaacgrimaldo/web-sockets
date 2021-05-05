const paht = require('path')

require('dotenv').config();
const cors =  require('cors');
const express = require('express');

const { clientes, cliente } = require('../sockets/controllers');

class Server { 
     
    constructor(){
         this.app =  express();
         this.PORT = process.env.PORT;
         this.server =require('http').createServer(this.app); //server para escuchar lo sockets
         this.io =require('socket.io')(this.server); // es la conexion de los sokets en el servidor
         this.path = {

         } 

         this.Middlewares();

         this.sockets();
    } 
 


    Middlewares(){
        
        this.app.use(cors()); 

        this.app.use(express.static('public'));
    } 


    sockets(){
        //conexion de nuevo cliente
         this.io.on('connection', cliente );
    }

    lisend(){
         this.server.listen(this.PORT, () => {
             console.log('Applicacion corriendo en el puerto: ', this.PORT);
         })
    }
     
}


module.exports =  { 
     Server
}