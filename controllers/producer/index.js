var express = require('express');
var router = express.Router();
var db = require('../../db');
exports.engine = 'hbs';
router.get('/', function(req, res, next){
  res.render(__dirname+'\\views\\view', {messages:db.messages});
});
module.exports = router;
