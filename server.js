var express = require('express');
var routes = require('./routes');
var producerRoutes = require('./controllers/producer/index');
var consumerRoutes = require('./controllers/consumer/index');
var devRoutes = require('./controllers/dev/index');

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
app.use('/consumer', consumerRoutes);
app.use('/dev', devRoutes);
app.engine('hbs', hbs({extname: 'hbs'}));
app.set('view engine', 'hbs');
const PORT = 8000;

app.listen(PORT, () => {
  console.log("Server is running on port:"+PORT);
});
