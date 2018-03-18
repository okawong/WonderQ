var express = require('express');
var routes = require('./routes');
var producerRoutes = require('./controllers/producer/index');
var consumerRoutes = require('./controllers/consumer/index');
var api = require('./api');
var events = require('events');
var path = require('path');
var app = express();
var crypto = require('crypto');
var hbs = require('express-handlebars');
var eventEmitter = new events.EventEmitter();
var db = require('./db');
// app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/api', api);
app.use('/producer', producerRoutes);
app.use('/consumer', consumerRoutes)
app.use(express.urlencoded());
app.engine('hbs', hbs({extname: 'hbs'}));
app.set('view engine', 'hbs');
const PORT = 8000;

app.listen(PORT, () => {
  console.log("Server is running on port:"+PORT);
});

// app.get('/messages', function(req, res){
//   var results = mockData;
//   if(req.query.state != null)
//     results = getfilteredMessages(req.query.state);
//   res.json(results);
// });

// app.get('/available-messages', function(req, res){
//   res.json(getfilteredMessages(AVAILABLE_STATE));
// });
//
// app.post('/checkout', function(req, res){
//   var checkoutTime = Date.now();
//   //resolution for invalid id
//   var id = req.body.id;
//   checkoutMessage(id, checkoutTime);
//   eventEmitter.emit('checkout');
//   res.redirect("/consumer");
// });
// app.post('/messages', function(req, res){
//    var creationTime = Date.now();
//    var id = getNewId(creationTime.toString());
//    var message = req.body.message;
//    createMessage(id, message, creationTime);
//    eventEmitter.emit('createMessage');
//    //alert("Message was generated with id:"+id);
//    res.redirect('/producer');
// });
//
// function createMessage(id, message, creationTime){
//   db.messages[id] = {
//     'id':id,
//     'message':message,
//     'state':1,
//     'checkout_time':null,
//     'creation_date':creationTime
//   };
// }
//
// function checkoutMessage(id, checkoutTime){
//   db.messages[id].state = 2;
//   db.messages[id].checkout_time = checkoutTime;
//   eventEmitter.emit('checkout');
// }




//events



// function getNewId(ms){
//   return crypto.createHash('md5').update(ms).digest("hex");
// }

// function getfilteredMessages(state){
//   //done this way to pass by value, not reference
//   var filteredMessages = Object.assign({}, db.messages);
//   for(var id in filteredMessages){
//     if(filteredMessages[id].state != state){
//       delete filteredMessages[id];
//     }
//   }
//   return filteredMessages;
// }
