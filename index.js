var http = require('http');
var url = require('url');
var firebase = require('firebase-admin');
var serviceAccount = require('./WonderQ-6c87b21fe5d8.json');
var express = require('express');
var routes = require('./scripts/routes');
var app = express();

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL:"https://wonderq-b00ec.firebaseio.com"
});
app.listen(8888);


//get all messages in server
app.get('/api/messages', function(request, response){
  //get firebase data as json, return to client
  var data;
  var messageRef = firebase.database().ref('/Message');
  messageRef.once('value').then(function(snapshot){
    data = snapshot.val();
  })
  response.json(data);
})

//http.createServer(onRequest).listen(8888);
//console.log('Server has started');

function onRequest(request, response){
  var pathName = url.parse(request.url).pathname
  //console.log(pathName);
  showPage(response, pathName);
}

function showPage(response, pathName){
  response.writeHead(200);
  response.write('Hello World');
  writeToDatabase();
  checkoutMessage(2);
  //getData();
  response.end();
}

function writeToDatabase(){
  var id = Date.now();
  var messageData = {
    ID: id,
    CREATION_TIME: id,
    MESSAGE:"k",
    STATE:1
  };

  var newPostKey = firebase.database().ref().child('Message').push().key;
  console.log("message was generated with key:"+newPostKey);
  var updates = {};
  updates['/Message/'+newPostKey] = messageData;
  return firebase.database().ref().update(updates);
}

function getData(){
  //var data = firebase.database().ref('Message');
  var data;
  var messageRef = firebase.database().ref('/Message');
  messageRef.once('value').then(function(snapshot){
    data = snapshot.val();
  })
  console.log(data);
  return data;
}

var stateRef = firebase.database().ref('Message/3/STATE');
stateRef.on('value', function(snapshot){
  console.log("id has been changed to:"+snapshot.val());
});

function checkoutMessage(messageId){
  var updates = {};
  updates['/Message/'+messageId+'/STATE'] = 56;
  firebase.database().ref().update(updates);
}

var contentMap = {
  '/':'<h1>Welcome to the site</h1>',
  '/contact' : '<h1>Contact Page</h1>'
}
