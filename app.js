const express = require("express");
var mysql = require("mysql");

var app = express();

//Database Connections
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "@cj695123",
    database: "records",
});

con.connect( (err) => {
    if(err){
        console.log(err);
    } else{
        console.log("Database Created");
    }
});

//Route
app.get("/", (req, res) => {
    res.send("Hello Peeps");
});

//Server Port Connection
app.listen(3000, () => {
    console.log("The Server is started");
});