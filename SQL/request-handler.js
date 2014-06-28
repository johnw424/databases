var http = require("http");
var db = require("./db.js");

module.exports.handler = function (request, response) {
  var headers = defaultCorsHeaders;
  headers["Content-Type"] = "text/plain";

  // Set router
  var router = {
    "/classes/room1": Room
  };

  var Room = function() {
    if (request.method === "GET") {
      db.getMessages(function(json) {
        response.writeHead(200, headers);
        response.end(json);
      });
    } else if (request.method === "POST") {
      var data = "";
      request.on("data", function(chunk) {
        data += chunk;
      });
      request.on("end", function(){
        db.postMessage(data, function() {
          response.writeHead(200, headers);
          response.end(); // maybe send back added message
        });
      });
    }
  };

  // run router
  router[request.url]();

  // default headers
  var defaultCorsHeaders = {
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
    "access-control-allow-headers": "content-type, accept",
    "access-control-max-age": 10 // Seconds.
  };
};

