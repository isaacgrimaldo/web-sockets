const path = require('path');
const fs  = require('fs');

class tck {
      constructor(numero , escritorio){
           this.numero = numero;
           this.escritorio = escritorio; 
      }
}


class Ticket {
     
  constructor(){
      this.ultimo = 0; 
      this.hoy = new Date().getDate();
      this.ticketsHoy = [];
      this.ultimosTickets = [];
      
      this.init()
  }
   
 get lastTicket() { 
       const {ultimo}  = require('../DB/Data.json');
       return ultimo;
 }

  init(){
     const {hoy, ultimo , ticketsHoy , ultimosTickets} =  require('../DB/Data.json');
  
     if(hoy === this.hoy){
        this.ultimo = ultimo ; 
        this.ticketsHoy = ticketsHoy ;
        this.ultimosTickets= ultimosTickets;
     }else{
          this.saveData();
     } 
 }  
 
  get toJson(){ //los gets no se le hace unas instacia solo se coloca su nombre this.toJson
       return {
          ultimo: this.ultimo,
          hoy: this.hoy,
          ticketsHoy: this.ticketsHoy,
          ultimosTickets: this.ultimosTickets,
       }
  }
  
  saveData(){
       const pathToSave = path.join(__dirname,'../DB/Data.json');
       fs.writeFileSync(pathToSave, JSON.stringify(this.toJson ));
  }
   
  next(){
       this.ultimo += 1 ;
       const ticket =  new tck(this.ultimo, null);
       this.ticketsHoy.push(ticket);

       this.saveData();
       return 'Ticket '+ ticket.numero; 
  }
    
  ticketAttend(escritorio){
     
     if(this.ticketsHoy.length === 0){
        return null
     }
     
     const ticket = this.ticketsHoy.shift(); // remueve el primer elemento del array
     ticket.escritorio = escritorio;

     this.ultimosTickets.unshift(ticket);

     if(this.ultimosTickets.length > 4){
          this.ultimosTickets.splice(-1,1);
     }
      
     this.saveData();
     return ticket;
  }
 
}

module.exports = {Ticket};