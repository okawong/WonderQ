var express = require('express');
var router = express.Router();
var db = require('../../db');
var messages = require('../messages/message-controller.js');
exports.engine = 'hbs';
const AVAILABLE_STATE = 1;
const CHECKED_OUT_STATE = 2;

router.get('/', function(req, res, next){
  // res.render('consumer-index', {messages:db.messages});
  var availableData = getfilteredMessages(AVAILABLE_STATE);
  var checkedoutData = getfilteredMessages(CHECKED_OUT_STATE);

  res.render(__dirname+'\\views\\view', {messages:availableData, checkedoutMessages:checkedoutData});

});

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
module.exports = router;
