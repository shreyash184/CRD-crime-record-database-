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
function mysqlQuery(query,  path , res) {
    con.query(query, (err, queryOutput) => {
        if (err) {
            console.log(err);
            return;
        }
        else {
            console.log("query successfully executed");
            res.render(path, { queryOutput: queryOutput });
        }
    });
}

//Function for the normal query
function queries(query, res){
    con.query(query, (err) => {
        if(err){
            console.log(err);
        } else{
            console.log("query successfully executed");
        }
    })
}

//Route
app.get("/", (req, res) => {
    res.send("Welcome all of you");
});

app.get("/query", (req, res) => {
    res.render("home.ejs");
});

app.get("/criminal-records", (req, res) => {
    res.render("./enterdata/criminal.ejs");
});

app.get("/crime-records", (req, res) => {
    res.render("./enterdata/crime.ejs")
});

app.post("/crime-records", (req, res) =>{
    var pinCode = req.body.pin ;
    var taluka = req.body.taluka ;
    var district = req.body.district ;
    var category = req.body.Catagory ;
    var timeOfCrime = req.body.Time ;
    var timeOfReg = req.body.RTime ;
    var day = req.body.Date ;
    var month = req.body.month ;
    var year = req.body.year ;
    var age = req.body.age ;
    var query = "INSERT INTO crime_record (case_no, criminal_id, pin_code, village, taluka, district, local_address, time_of_crime, crime_date, registration_time, crime_type) VALUES (24,25,"+pinCode+","+'"wardha"'+","+'"'+taluka+'"'+","+'"'+district+'"'+',"shreyash"'+","+'"'+timeOfCrime+'"'+","+day+","+'"'+timeOfReg+'"'+","+'"'+category+'"'+");";
    queries(query, res);
    if(category === "Theft"){
        res.render("./enterdata/theft.ejs");
    } else if(category === "Murder"){
        res.render("./enterdata/murder.ejs");
    } else if(category === "Railway crime"){
        res.render("./enterdata/railwayCrime.ejs");
    } else if(category === "Lost person"){
        res.render("./enterdata/lostPerson.ejs");
    } else if(category === "Accident"){
        res.render("./enterdata/accident.ejs");
    } else if(category === "Smuggling"){
        res.render("./enterdata/smuggling.ejs");
    }
});
//Show routes
app.get("/crime", (req, res) => {
    mysqlQuery("select * from crime_record", "./showdata/crimeRecords.ejs", res);
});

app.get("/criminal", (req, res) => {
    mysqlQuery("select * from criminal", "./showdata/criminalRecords.ejs", res);
});

app.get("/theft", (req, res) => {
    mysqlQuery("select * from theft", "./showdata/theft.ejs", res);
});

app.get("/murder", (req, res) => {
    mysqlQuery("select * from murder", "./showdata/murder.ejs", res);
});

app.get("/accident", (req, res) => {
    mysqlQuery("select * from accident", "./showdata/accident.ej", res);
});

app.get("/smuggling", (req, res) => {
    mysqlQuery("select * from smuggling", "./showdata/smuggling.ejs", res);
});

app.get("/lost", (req, res) => {
    mysqlQuery("select * from lost_person", "./showdata/lost_person.ejs", res);
});

app.get("/railway", (req, res) => {
    mysqlQuery("select * from railway_crime", "./showdata/railway_crimes.ejs", res);
});

app.post("/query", (req, res) => {
    mysqlQuery(req.body.name, res);
});

//Server Port Connection
app.listen(3000, () => {
    console.log("The Server is started");
});