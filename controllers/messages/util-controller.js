var crypto = require('crypto');

exports.getNewId = function(ms){
  return crypto.createHash('md5').update(ms).digest("hex");
}

exports.setTimer = function(callback, time, args){
  setTimeout(callback, time, args);
}
