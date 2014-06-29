var fs = require("fs");
var http = require("http");
var db = require("./db.js");
var url = require("url");

/* You should implement your request handler function in this file.
 * And hey! This is already getting passed to http.createServer()
 * in basic-server.js. But it won't work as is.
 * You'll have to figure out a way to export this function from
 * this file and include it in basic-server.js so that it actually works.
 * *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html. */

module.exports.handler = function (request, response) {

  /* the 'request' argument comes from nodes http module. It includes info about the
  request - such as what URL the browser is requesting. */

  /* Documentation for both request and response can be found at
   * http://nodemanual.org/0.8.14/nodejs_ref_guide/http.html */

  console.log("Serving request type " + request.method + " for url " + request.url);
  var statusCode = 200;

  /* Without this line, this server wouldn't work. See the note
   * below about CORS. */
  var headers = defaultCorsHeaders;

  headers["Content-Type"] = "text/plain";

  /* .writeHead() tells our server what HTTP status code to send back */
  //response.writeHead(statusCode, headers);

  /* Make sure to always call response.end() - Node will not send
   * anything back to the client until you do. The string you pass to
   * response.end() will be the body of the response - i.e. what shows
   * up in the browser.*/

  if(request.url === "/favicon.ico") {
    response.end("no ico");
  }

  if(request.method === "OPTIONS") {
    response.writeHead(200, headers);
    response.end();
  } else {
    ///// Respond to API Requests for Messages
    if(request.url === "/classes/messages") {
      if (request.method === "GET") {
        response.writeHead(200, headers);
        response.end(JSON.stringify(responseObject));

      // POST A MESSAGE
      } else if (request.method === "POST") {
        var data = "";
        request.on("data", function(chunk) {
          // data is json with username & message
          data += chunk;
        });
        request.on("end", function(){
          console.log("Url parses data");
          console.log(data);
          db.postMessage(data, function() {
            response.writeHead(200, headers);
            response.end(); // maybe send back added message
          });
        });
      }
    // Respond to API Requests for Rooms
    } else if (request.url.indexOf("/classes/") > -1) {
      var roomname = request.url.split("/")[2];
      if (request.method === "GET") {
        response.writeHead(200, headers);
        response.end(JSON.stringify(responseObject));
      } else if (request.method === "POST") {
        request.addListener("data", function(chunk) {
          addMessage(JSON.parse(chunk), roomname);
        });
        response.writeHead(201, headers);
        response.end(JSON.stringify(responseObject));
      }
    ///// Serve Static Files Manually
    } else if (request.url === "/scripts/app.js") {
      fs.readFile('client/client/scripts/app.js', 'utf8', function (err,data) {
        if (err) { console.log(err); }
        response.writeHead(200, {'Content-Type': 'application/javascript','Content-Length':data.length});
        response.end(data);
      });
    } else if (request.url === "/styles/styles.css") {
      fs.readFile('client/client/styles/styles.css', 'utf8', function (err,data) {
        if (err) { console.log(err); }
        response.writeHead(200, {'Content-Type': 'text/css','Content-Length':data.length});
        response.end(data);
      });
    } else { // request url is empty
      fs.readFile('client/client/index.html', 'utf8', function (err,data) {
        if (err) { console.log(err); }
        response.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
        response.end(data);
      });
    }
  }

};

/* These headers will allow Cross-Origin Resource Sharing (CORS).
 * This CRUCIAL code allows this server to talk to websites that
 * are on different domains. (Your chat client is running from a url
 * like file://your/chat/client/index.html, which is considered a
 * different domain.) */
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};
