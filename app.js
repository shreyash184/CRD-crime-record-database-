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

con.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Database Created");
    }
});

//Functions
function mysqlQuery(query, res) {
    con.query(query, (err, queryOutput) => {
        if (err) {
            console.log(err);
            return;
        }
        else {
            console.log("query successfully executed");
            res.render("./showdata/criminalRecords.ejs", { queryOutput: queryOutput });
        }
    });
}

//Route
app.get("/", (req, res) => {
    res.send("Welcome all of you");
});

app.get("/query", (req, res) => {
    res.render("home.ejs");
});

app.post("/query", (req, res) => {
    mysqlQuery(req.body.name, res);
});

//Server Port Connection
app.listen(3000, () => {
    console.log("The Server is started");
});