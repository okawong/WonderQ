var db = require('../../db');
var events = require('events');
var eventEmitter = new events.EventEmitter();
eventEmitter.on('messageExpiration', messageExpirationHandler);
const AVAILABLE_STATE = 1;
const CHECKED_OUT_STATE = 2;

exports.createMessage = function(id, message, creationTime){
  db.messages[id] = {
    'id':id,
    'message':message,
    'state':AVAILABLE_STATE,
    'checkout_time':null,
    'creation_date':creationTime
  };
}

exports.resetMessageState = function(id){
  db.messages[id].state = AVAILABLE_STATE;
  db.messages[id].checkout_time = null;
  eventEmitter.emit('messageExpiration');
}

exports.checkoutMessage = function(id, checkoutTime){
  //add validation for state of message
  db.messages[id].state = CHECKED_OUT_STATE;
  db.messages[id].checkout_time = checkoutTime;
}

exports.deleteMessage = function(id){
  delete db.messages[id];
}

exports.getfilteredMessage = function(state){
  //done this way to pass by value, not reference
  var filteredMessages = Object.assign({}, db.messages);
  for(var id in filteredMessages){
    if(filteredMessages[id].state != state){
      delete filteredMessages[id];
    }
  }
  return filteredMessages;
}

function messageExpirationHandler(){
  console.log("message has been reverted to stage 1 by system");
}
