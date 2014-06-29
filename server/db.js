var mysql = require('mysql');
var mysql = require('mysql');
/* If the node mysql module is not found on your system, you may
 * need to do an "sudo npm install -g mysql". */

/* You'll need to fill the following out with your mysql username and password.
 * database: "chat" specifies that we're using the database called
 * "chat", which we created by running schema.sql.*/
var dbConnection = mysql.createConnection({
  user: "root",
  password: "",
  database: "chat"
});

dbConnection.connect();
/* Now you can make queries to the Mysql database using the
 * dbConnection.query() method.
 * See https://github.com/felixge/node-mysql for more details about
 * using this module.*/


exports.getMessages = function(callback) {
  // Get Room ID
  // Search & return all messages with Room ID
  var queryString = "";
  dbConnection.query(queryString, queryArgs, function(err, results, fields) {
    // maybe JSONify data
    callback(results);
  });
};

exports.getUserID = getUserID = function(username, callback){
  if(dbConnection.query("SELECT id FROM Users WHERE username = " + username)) {

  };
  // !Check if username in Users table
    // Create user entry
  // return userID
};

exports.getRoomID = getRoomID = function(roomname, callback){
  // !Check if roomname in Rooms table
    // Add room entry
  // return roomID
};

exports.postMessage = function(data, callback){
  var queryString = "INSERT INTO Messages (Messages.message, Messages.id_user) VALUES (" + data.message + ", SELECT id FROM Users WHERE Users.username = " + data.username + ";);";

};
