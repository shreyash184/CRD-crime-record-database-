const express = require("express");
const bodyParser = require('body-parser')
var mysql = require("mysql");
const methodOverride = require('method-override');

var app = express();

app.use(methodOverride('_method'));

app.use(bodyParser.urlencoded({ extended: false }));
//Database Connections
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"root",
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
    res.render("landing.ejs");
});

app.get("/query", (req, res) => {
    res.render("home.ejs");
});

//criminal records
app.get("/criminal-records", (req, res) => {
    res.render("./enterdata/criminal.ejs");
});

app.get("/criminal", (req, res) => {
    mysqlQuery("select * from criminal", "./showdata/criminalRecords.ejs", res);
});

app.post("/criminal-records", (req, res) => {
    var criminalID = req.body.criminalID ;
    var caseNo = req.body.case_no ;
    var prisonStatus = req.body.prison_status ;
    var gender = req.body.gender ;
    var name = req.body.name ;
    var age = req.body.age ;
    var photo = req.body.photo ;
    query = "INSERT INTO criminal (criminal_id, case_no, prison_status, gender, name, age, photo) VALUES ("+criminalID+","+caseNo+","+'"'+prisonStatus+'"'+","+'"'+gender+'"'+","+'"'+name+'"'+","+'"'+age+'"'+","+'"'+photo+'"'+");";
    queries(query, res);
    res.redirect("/criminal");
});

app.delete("/criminal-records", (req, res) => {
    var caseNo = req.body.case_no;
    query = "DELETE FROM criminal WHERE case_no = "+caseNo+";";
    queries(query, res);
    console.log("Data of case no "+caseNo+" deleted");
    res.redirect("/criminal");
});

//crime records
app.get("/crime-records", (req, res) => {
    res.render("./enterdata/crime.ejs")
});

app.get("/crimeRecords", (req, res) => {
    mysqlQuery("select * from crime_record", "./showdata/crimeRecords.ejs", res);
});

app.post("/crime-records", (req, res) =>{
    var caseNo = req.body.case_no;
    var criminal_id = req.body.criminal_id;
    var pinCode = req.body.pin ;
    var taluka = req.body.taluka ;
    var village = req.body.village;
    var district = req.body.district ;
    var address = req.body.address;
    var category = req.body.Catagory ;
    var timeOfCrime = req.body.Time ;
    var timeOfReg = req.body.RTime ;
    var day = req.body.Date ;
    var month = req.body.month ;
    var year = req.body.year ;
    var age = req.body.age ;
    var query = "INSERT INTO crime_record (case_no, criminal_id, pin_code, village, taluka, district, local_address, time_of_crime, crime_date, registration_time, crime_type) VALUES ("+caseNo+","+criminal_id+","+pinCode+","+'"'+village+'"'+","+'"'+taluka+'"'+","+'"'+district+'"'+","+'"'+address+'"'+","+'"'+timeOfCrime+'"'+","+day+","+'"'+timeOfReg+'"'+","+'"'+category+'"'+");";
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

app.delete("/crime-records", (req, res) => {
    var caseNo = req.body.case_no;
    query = "DELETE FROM crime_record WHERE case_no = "+caseNo+";";
    queries(query, res);
    console.log("Data of case no "+caseNo+" deleted");
    res.redirect("/crimeRecords");
});

//Show routes
//crime routes
app.get("/crime", (req, res) => {
    mysqlQuery("select * from crime_record", "./showdata/crimeRecords.ejs", res);
});

//criminal routes
app.get("/criminal", (req, res) => {
    mysqlQuery("select * from criminal", "./showdata/criminalRecords.ejs", res);
});

//Theft routes
app.get("/theft", (req, res) => {
    mysqlQuery("select * from theft", "./showdata/theft.ejs", res);
});

app.post("/theft", (req, res) => {
    var caseNo = req.body.case_no;
    var stolen = req.body.stolen;
    var appearance = req.body.appearence;
    console.log(stolen + appearance );
    query = "INSERT INTO theft (case_no, stolen_things, criminals_appearance) VALUES ("+caseNo+","+'"'+stolen+'"'+","+'"'+appearance+'"'+");";
    queries(query, res);
    res.redirect("/theft");
});

app.delete("/theft", (req, res) => {
    var caseNo = req.body.case_no;
    query = "DELETE FROM theft WHERE case_no = "+caseNo+";";
    queries(query, res);
    console.log("Data of case no "+caseNo+" deleted");
    res.redirect("/theft");
});

//murder routes
app.get("/murder", (req, res) => {
    mysqlQuery("select * from murder", "./showdata/murder.ejs", res);
});

app.post("/murder", (req, res) => {
    var caseNo = req.body.case_no ;
    var weapon = req.body.weapon ;
    var photo = req.body.photo ;
    var bodycon = req.body.cond ;
    var age = req.body.age ;
    var suspects = req.body.suspects ;
    var victim = req.body.victim ;
    query = "INSERT INTO murder (case_no, murder_weapon, scene_photo, condition_of_body, age, suspects, victtim_details) VALUES ("+caseNo+","+'"'+weapon+'"'+","+'"'+photo+'"'+","+'"'+bodycon+'"'+","+age+","+'"'+suspects+'"'+","+'"'+victim+'"'+");";
    queries(query, res);
    res.redirect("/murder");
});

app.delete("/murder", (req, res) => {
    var caseNo = req.body.case_no;
    query = "DELETE FROM murder WHERE case_no = "+caseNo+";";
    queries(query, res);
    console.log("Data of case no "+caseNo+" deleted");
    res.redirect("/murder");
});
//accident routes
app.get("/accident", (req, res) => {
    mysqlQuery("select * from accident", "./showdata/accident.ejs", res);
});

app.post("/accident", (req, res) => {
    var caseNo = req.body.case_no ;
    var vehicleNo = req.body.vehicleNo ;
    var noOfVehicle = req.body.no ;
    var victim = req.body.victim ;
    var vDesc = req.body.desc ;
    console.log(noOfVehicle);
    query = "INSERT INTO accident (case_no, vehicle_no, no_of_vehicles, victtim_details, vehicle_description) VALUES ("+caseNo+","+'"'+vehicleNo+'"'+","+noOfVehicle+","+'"'+victim+'"'+","+'"'+vDesc+'"'+");";
    queries(query, res);
    res.redirect("/accident");
});

app.delete("/accident", (req, res) => {
    var caseNo = req.body.case_no;
    query = "DELETE FROM accident WHERE case_no = "+caseNo+";";
    queries(query, res);
    console.log("Data of case no "+caseNo+" deleted");
    res.redirect("/accident");
});
//smuggling routes
app.get("/smuggling", (req, res) => {
    mysqlQuery("select * from smuggling", "./showdata/smuggling.ejs", res);
});

app.post("/smuggling", (req, res) => {
    var caseNo = req.body.case_no ;
    var hotspots = req.body.hotspots ;
    var suspects = req.body.suspects ;
    var stolen = req.body.stolen ;
    query = "INSERT INTO smuggling (case_no, hotspots, suspects, stolen_things) VALUES ("+caseNo+","+'"'+hotspots+'"'+","+'"'+suspects+'"'+","+'"'+stolen+'"'+");";
    queries(query, res);
    res.redirect("/smuggling");
});

app.delete("/smuggling", (req, res) => {
    var caseNo = req.body.case_no;
    query = "DELETE FROM smuggling WHERE case_no = "+caseNo+";";
    queries(query, res);
    console.log("Data of case no "+caseNo+" deleted");
    res.redirect("/smuggling");
});
//lost person routes
app.get("/lost", (req, res) => {
    mysqlQuery("select * from lost_person", "./showdata/lost_person.ejs", res);
});

app.post("/lost", (req, res) => {
    var caseNo = req.body.case_no ;
    var name =  req.body.name ;
    var age = req.body.age ;
    var photo = req.body.photo ;
    var reason = req.body.reason ;
    var identity = req.body.identity ;
    query = "INSERT INTO lost_person (case_no, name, age, photo, probable_reason, special_identity) VALUES ("+caseNo+","+'"'+name+'"'+","+age+","+'"'+photo+'"'+","+'"'+reason+'"'+","+'"'+identity+'"'+");";
    queries(query, res);
    res.redirect("/lost");
}); 

app.delete("/lost_person", (req, res) => {
    var caseNo = req.body.case_no;
    query = "DELETE FROM lost_person WHERE case_no = "+caseNo+";";
    queries(query, res);
    console.log("Data of case no "+caseNo+" deleted");
    res.redirect("/lost_person");
});
//railway routes
app.get("/railway", (req, res) => {
    mysqlQuery("select * from railway_crime", "./showdata/railway_crimes.ejs", res);
});

app.post("/railway", (req, res) => {
    var caseNo = req.body.case_no ;
    var trainNo = req.body.trainNo;
    var stolen = req.body.stolen ;
    var tStatus = req.body.tStatus ;
    var victim = req.body.victim ;
    query = "INSERT INTO railway_crime (case_no, train_no, stolen_stuff, train_status, victtim_details) VALUES ("+caseNo+","+trainNo+","+'"'+stolen+'"'+","+'"'+tStatus+'"'+","+'"'+victim+'"'+");";
    queries(query, res);
    res.redirect("/railway");
});

app.delete("/railway", (req, res) => {
    var caseNo = req.body.case_no;
    query = "DELETE FROM railway_crime WHERE case_no = "+caseNo+";";
    queries(query, res);
    console.log("Data of case no "+caseNo+" deleted");
    res.redirect("/railway");
});
//query route
app.post("/query", (req, res) => {
    mysqlQuery(req.body.name, res);
});

//Server Port Connection
app.listen(3000, () => {
    console.log("The Server is started");
});