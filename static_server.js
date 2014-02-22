var http = require("http"),
    url = require("url"),
    fs = require("fs"),
    path = require("path"),
    port = process.argv[2] || 8000;

var greenCounterVal = 15,
    orangeCounterVal = 2,
    redCounterVal = 0;

http.createServer(function(request, response) {

  var uri = url.parse(request.url).pathname
    , filename = path.join(process.cwd(), uri);
  
  fs.exists(filename, function(exists) {
    if(!exists) {
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("404 Not Found\n");
      response.end();
      return;
    }

    if (fs.statSync(filename).isDirectory()) filename += '/index.html';

    fs.readFile(filename, "binary", function(err, file) {
      if(err) {        
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(err + "\n");
        response.end();
        return;
      }

        var data = {};
        if (filename.indexOf('/index.html') != -1) {
            data.greenCounterVal = greenCounterVal = getRandomNumber(greenCounterVal, 50);
            data.orangeCounterVal = orangeCounterVal = getRandomNumber(orangeCounterVal, 30);
            data.redCounterVal = redCounterVal = getRandomNumber(redCounterVal, 15);

            data.greenListElements = getListElements(greenCounterVal);
            data.orangeListElements = getListElements(orangeCounterVal);
            data.redListElements = getListElements(redCounterVal);

            data.displayNotification = shouldDisplayNotification(data.greenListElements, data.orangeListElements, data.redListElements);

            console.log(data);
        }

      response.writeHead(200);
      response.write(file, "binary");
      response.write("<div id='server-values' data-values='" + JSON.stringify(data) + "'></div>");
      response.end();
    });
  });
}).listen(parseInt(port, 10));

function getRandomNumber(previousNumber, max){
    var nextNumber = 0;
    while (true) {
        nextNumber = Math.floor(Math.random() * parseInt(max, 10));
        if (Math.abs(nextNumber - previousNumber) < 3) {
            return nextNumber;
        }
    }
}

function getListElements(elementsSize){
    var elementsArray = [];
    for (var i = 0; i < elementsSize; i++) {
        elementsArray.push({
            'orderNum': 'J422####',
            'isTroponin': [true,false][Math.round(Math.random())]
        });
    }
    return elementsArray;
}

function shouldDisplayNotification(greenArray, orangeArray, redArray) {
    var i = 0;

    for (i = 0; i < greenArray.length; i++) {
        if (greenArray[i].isTroponin) {
            return true;
        }
    }

    for (i = 0; i < orangeArray.length; i++) {
        if (orangeArray[i].isTroponin) {
            return true;
        }
    }

    for (i = 0; i < redArray.length; i++) {
        if (redArray[i].isTroponin) {
            return true;
        }
    }

    return false;
}

console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");
