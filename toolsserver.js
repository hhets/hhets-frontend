var express = require("express"),
    app = express(),
    port = parseInt(process.env.PORT,10) || 8000;

var objectToSend = undefined;
var testIndex = 1;

app.get('/', function(req, res){
   res.redirect('/index.html');
});

app.get('/data.json',function(req,res){
  res.setHeader("Content-Type","application/json");
  res.write(JSON.stringify(objectToSend || intitializeObject()));
  res.end()
})

app.use('/', express.static(__dirname));
app.use(function(req, res, next){
  res.setHeader("Access-Control-Allow-Origin","*");
  next();
});
app.listen(port);

var generateThaList = function(currentTime){
  var list = [];
  var l = Math.floor(Math.random() * 10);

  for(var i = 0; i < l; i++) {
    list.push({
      'id': 'J422' + getPaddedNumber(testIndex),
      'enteredTime': 1239081237908 + currentTime + Math.floor(Math.random() * 1000 * 60 * 15),
      'type': [true,false][Math.round(Math.random())] ? 'troponin' : undefined
    });
    testIndex++;
  }

  return list
}

var intitializeObject = function(){
  var currentTime = Date.now();
  o = {}
  o.metadata = {servertime:currentTime}
  o.data = generateThaList(currentTime);
  return o;
}

function getPaddedNumber(num) {
  num = num + '';
  return new Array(4 - num.length + 1).join(0) + num;
}

setInterval(function(){
  if (objectToSend) {
    testIndex++;
    objectToSend.data.splice(0,1);
    objectToSend.data.push({
      'id': 'J422' + getPaddedNumber(testIndex),
      'enteredTime': 1239081237908 + Date.now() + Math.floor(Math.random() * 1000 * 60 * 15),
      'type': [true,false][Math.round(Math.random())] ? 'troponin' : null
    });
  }
}, 5000);

console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");
