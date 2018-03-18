var express = require('express');
var router = express.Router();
router.get('/home', function(request, response){
  response.sendFile(__dirname+'/pages/home.html');
});

router.get('/', function(request, response){
  response.sendFile(__dirname+'/pages/index.html');
});

// router.get('/consumer', function(request, response){
//   response.sendFile(__dirname+'/pages/consumer-view.html');
// });
//
// router.get('/producer', function(request, response){
//   response.sendFile(__dirname+'/pages/producer-view.html');
// });
module.exports = router;
