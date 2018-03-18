var express = require('express');
var api = express();
var messages = require('./controllers/messages/message-controller.js');
var crud = require('./controllers/messages/database-controller.js');
var util = require('./controllers/messages/util-controller.js');
var events = require('events');
var eventEmitter = new events.EventEmitter();

api.use(express.urlencoded({extended:true}));

eventEmitter.on('checkout', checkoutEventHandler);
eventEmitter.on('createMessage', createMessageEventHandler);
eventEmitter.on('checkin', checkinEventHandler);

//Ideal API architecture using middleware
//api.get('/messages', messages.getMessages);
api.get('/messages', messages.getMessages);
api.get('/available-messages', messages.getAvailableMessages);
//ideally would like to chain with next()
api.post('/checkout', function(req, res){
  var checkoutTime = Date.now();
  var id = req.body.id;
  crud.checkoutMessage(id, checkoutTime);
  messages.setMessageExpiration(id);
  eventEmitter.emit('checkout');
  res.redirect("/consumer");
});

api.post('/checkin', function(req, res){
  var id = req.body.id;
  console.log("deleting message with id:"+id);
  crud.deleteMessage(id);
  eventEmitter.emit('checkin');
  res.redirect("/consumer");
});

api.post('/messages', function(req, res){
  var creationTime = Date.now();
  var id = util.getNewId(creationTime.toString());
  var message = req.body.message;
  crud.createMessage(id, message, creationTime);
  eventEmitter.emit('createMessage');
  res.redirect('/producer');
});

api.post('/delete', function(req, res){
  var id = req.body.id;
  crud.deleteMessage(id);
  res.redirect("/consumer");
});

function checkoutEventHandler(){
  console.log("item was checked out");
}

function createMessageEventHandler(){
  console.log("message was created");
}

function checkinEventHandler(){
  console.log("message was checked in by user");
}
module.exports = api;
