
const express = require("express");
const mysql = require('mysql');
var path = require('path');
var bodyParser = require('body-parser');

function getParameterByName(name, url) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

const connection = mysql.createConnection({
  host: 'localhost',
  port:'8889',
  user: 'root',
  password: 'root',
  Socket:'/Applications/MAMP/tmp/mysql/mysql.sock',
  database:"finalDB"

});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

const app = express();
app.get(/createdb/,(req,res)=> {
    let sql = "CREATE DATABASE finalDB"
    connection.query(sql, (err)=> {
        if(err){
            throw err; 
        }
        res.send("Database Created");
    });
});

app.get(/createuser/,(req,res)=>{
    let sql = ' CREATE TABLE users(email VARCHAR(500), favorites VARCHAR(500),password VARCHAR(500),PRIMARY KEY(email))'
    connection.query(sql,err=>{
        if(err){
            throw err;
        }
        res.send("User Table Created");


    });
});

app.get(/createinstance/,(req,res)=>{

    let post = {email: getParameterByName("email", req.url), favorites: getParameterByName("favorites", req.url), password:getParameterByName("password", req.url)}
    let sql = 'INSERT INTO users SET ?'
    let query =  connection.query(sql, post, err =>{
        if(err){
            res.send(post)
        }
        console.log("useradded")

    });


});
app.get(/getuserinstance/,(req,res)=>{
    let sql = 'SELECT * FROM users WHERE email = "'+getParameterByName("email", req.url)+'" and password = "'+getParameterByName("password", req.url)+'"';

    let query = connection.query(sql,(err, results)=>{
        if(err){
            throw err;
        } 
        res.send(results);
        return results
    })
    

});

app.get(/updateuserinstance/, (req,res)=>{
    let username = 'imHERE'
    let sql = 'UPDATE userTable SET favorites = "'+getParameterByName("favorites", req.url)+'" WHERE email = "'+getParameterByName("email", req.url)+'"'
    let query = connection.query(sql, err =>{
        if(err){
            throw err;
        }
        res.send("Employee Updated")

    })

});
app.get(/deleteuserinstance/, (req,res)=>{
    let sql = 'DELETE FROM userTable WHERE email = "'+getParameterByName("email", req.url)+'"'
    let query = connection.query(sql, err =>{
        if(err){
            throw err;
        }
        res.send("Employee Deleted")

    })

});

app.listen('3000', ()=>{
    console.log("Server Started on 3000");
})

app.use(express.static('public'));
 
//make way for some custom css, js and images
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/images', express.static(__dirname + '/public/images'));

 


app.get('/',function(req,res) {
    res.sendFile(__dirname+'/index.html');
  });
app.get('/index.html',function(req,res) {
    res.sendFile(__dirname+'/index.html');
});
app.get('/favorites.html',function(req,res) {
    res.sendFile(__dirname+'/favorites.html');
  });
app.get('/games.html',function(req,res) {
    res.sendFile(__dirname+'/games.html');
});
app.get('/merchandise.html',function(req,res) {
    res.sendFile(__dirname+'/merchandise.html');
  });
app.get('/newsmedia.html',function(req,res) {
    res.sendFile(__dirname+'/newsmedia.html');
});
app.get('/playerdb.html',function(req,res) {
    res.sendFile(__dirname+'/playerdb.html');
  });

