
const express = require("express");
const mysql = require('mysql');


const connection = mysql.createConnection({
  host: 'localhost',
  port:'8889',
  user: 'root',
  password: 'root',
  Socket:'/Applications/MAMP/tmp/mysql/mysql.sock',
  database:"userDB"

});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

const app = express();
app.get("/createdb",(req,res)=> {
    let sql = "CREATE DATABASE userDB"
    connection.query(sql, (err)=> {
        if(err){
            throw err; 
        }
        res.send("Database Created");
    });
});

app.get("/createuser",(req,res)=>{
    let sql = ' CREATE TABLE userTable(email VARCHAR(500), username VARCHAR(500),password VARCHAR(500),PRIMARY KEY(email))'
    connection.query(sql,err=>{
        if(err){
            throw err;
        }
        res.send("User Table Created");


    });
});

app.get("/createuserinstance",(req,res)=>{
    
    let post = {email: 'Mogsw2678@gmail.com', username:'momoneymoproblems', password:'srycantsay' }
    let sql = 'INSERT INTO userTable SET ?'
    let query =  connection.query(sql, post, err =>{
        if(err){
            throw err;
        }
        res.send("User Added");

    });


});
app.get("/getuserinstance",(req,res)=>{
    
    let sql = 'SELECT * FROM userTable'
    let query = connection.query(sql,(err, results)=>{
        if(err){
            throw err;
        } 
        console.log(results);
        res.send("Employeee details fetched");
    })
    

});

app.get("/updateuserinstance/:email", (req,res)=>{
    let username = 'Updated username'
    let sql = "UPDATE userTable SET username - '${username}' WHERE email - ${req.params.email}"
    let query = connections.query(sql, err =>{
        if(err){
            throw err;
        }
        res.send("Employee Updated")

    })

});
app.get("/deleteuserinstance/:email", (req,res)=>{
    let sql = "DELETE FROM userTable WHERE email - ${req.params.email}"
    let query = connections.query(sql, err =>{
        if(err){
            throw err;
        }

        res.send("Employee Deleted")

    })

});

app.listen('1010', ()=>{
    console.log("Server Started on 1010");
})
