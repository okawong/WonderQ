var express = require('express');
var db = require('../../db');
var crypto = require('crypto');
var events = require('events');
var util = require('./util-controller.js');
var crud = require('./database-controller.js');

var eventEmitter = new events.EventEmitter();
var app = express();
app.use(express.urlencoded({extended:true}));

const AVAILABLE_STATE = 1;
const CHECKED_OUT_STATE = 2;
const CHECKOUT_EXPIRATION = 15000; //15 seconds for testing purposes

exports.setMessageExpiration = function(id){
   util.setTimer(crud.resetMessageState, CHECKOUT_EXPIRATION, id);
}
exports.getMessages = function(req, res){
  var results = db;
  if(req.query.state != null)
    results = getfilteredMessages(req.query.state);
  res.json(results);
}
exports.getAvailableMessages = function(req, res){
  res.json(getfilteredMessages(AVAILABLE_STATE));
}

exports.createMessage = function(req, res){
  var creationTime = Date.now();
  var id = getNewId(creationTime.toString());
  var message = req.body.message;
  createMessage(id, message, creationTime);
  eventEmitter.emit('createMessage');
  res.redirect('/producer');
}

exports.deleteMessage = function(req, res){
  var id = req.body.id;
  delete db.id;
  res.redirect("/consumer");
}

exports.checkoutMessage = function(req, res){
  console.log(req.body);
  var checkoutTime = Date.now();
  //resolution for invalid id
  var id = req.body.id;
  checkoutMessage(id, checkoutTime);
  eventEmitter.emit('checkout');
  res.redirect("/consumer");
}

exports.checkinMessage = function(req, res){
  /*var checkoutTime = Date.now();
  //resolution for invalid id
  var id = req.body.id;
  checkoutMessage(id, checkoutTime);*/
  eventEmitter.emit('checkin');
  res.redirect("/consumer");
}

function getfilteredMessages(state){
  //done this way to pass by value, not reference
  var filteredMessages = Object.assign({}, db.messages);
  for(var id in filteredMessages){
    if(filteredMessages[id].state != state){
      delete filteredMessages[id];
    }
  }
  return filteredMessages;
}

function createMessage(id, message, creationTime){
  db.messages[id] = {
    'id':id,
    'message':message,
    'state':1,
    'checkout_time':null,
    'creation_date':creationTime
  };
}

function checkoutMessage(id, checkoutTime){
  db.messages[id].state = 2;
  db.messages[id].checkout_time = checkoutTime;
  eventEmitter.emit('checkout');
}

function checkoutEventHandler(){
  console.log("item was checked out via api!");
}

function createMessageEventHandler(){
  console.log("message was created");
}
//events
eventEmitter.on('checkout', checkoutEventHandler);

eventEmitter.on('createMessage', createMessageEventHandler);

function getNewId(ms){
  return crypto.createHash('md5').update(ms).digest("hex");
}
