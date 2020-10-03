var express = require("express");
var mysql = require("mysql");
var app= express();
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'test',
  database: 'playerDB'

});
connection.connect(function(error){
  if(!!error){
    console.log(error);
  }
  else{
    console.log("Connected");
  }
});
app.get('/',function(req,resp){


});
app.listen(1137);
