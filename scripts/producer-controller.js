console.log("producer controller loaded");
jQuery.get('http://localhost:8000/messages', function(data){
  console.log(data);
});
