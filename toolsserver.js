var express = require("express"),
    app = express(),
    port = parseInt(process.env.PORT,10) || 8000;



var objectToSend = undefined

app.get('/', function(req, res){
   res.redirect('/index.html');
});


app.get('/data.json',function(req,res){

  objectToSend = updateObject(objectToSend);

  res.setHeader("Content-Type","application/json");
  res.write(JSON.stringify(objectToSend));
  res.end()
})

app.use('/', express.static(__dirname  ));
app.listen(port);

var generateThaList = function(){
  var list = [];
  var l = Math.floor(Math.random() * 10);

  for()

  return list
}

var generateListElement = function(){

}

var updateObject = function(o){
  if(o === undefined){
    o = {}
    o.data = generateThaList()
  }

  o.metadata = {servertime:Date.now()}
  return o;
}

console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");
