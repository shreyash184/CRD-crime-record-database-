const express = require("express");
const bodyParser = require('body-parser')
var mysql = require("mysql");

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
//Database Connections
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "@cj695123",
    database: "records",
});

//Functions
function mysqlQuery(query){
    // con.connect( (err) => {
    //     if(err){
    //         console.error('Error:- ' + err.stack);
    //         return;
    //     } else{
            con.query( query, (err, queryOutput) => {
                if(err) {
                    console.log(err);
                    return;
                }
                else{
                    console.log("query successfully executed");
                    console.log(queryOutput);
                }
            });
        // }
    // });
}

//Route
app.get("/", (req, res) => {
    res.send("Welcome all of you");
});

app.get("/crime-records", (req, res) => {
    res.render("CrimeRecords.ejs");
});

app.get("/query", (req, res) => {
    res.render("home.ejs");
});

app.post("/query", (req, res) => {
    mysqlQuery(req.body.name);
    
});

//Server Port Connection
app.listen(3000, () => {
    console.log("The Server is started");
});