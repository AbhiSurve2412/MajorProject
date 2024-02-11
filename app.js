const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const ejsMate = require('ejs-mate');

//All models
const Player = require('./models/player'); // Require player model
const Organization = require('./models/organization'); // Require organization model


// Set the view engine to EJS
app.engine("ejs",ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

//req data parse
app.use(express.urlencoded({ extended: true }));


// Connect to MongoDB
let MONGO_URL = "mongodb://127.0.0.1:27017/majorProject";

main().then(() => {
    console.log("Connected to DB");
}).catch((err) => {
    console.error(err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
}



// main page before login
app.get("/", (req, res) => {
    res.render('index.ejs');
});

//player route
//signup form for player
app.get("/player/signup", (req, res) => {
    res.render('player/signup.ejs');
});

app.post("/home", async (req, res) => {
    const newPlayer = new Player(req.body.player);
    await newPlayer.save();
    console.log(newPlayer);
    res.redirect("/")
});


//organization route
//signup form for organzation
app.get("/organization/signup", (req, res) => {
    res.render('organization/signup.ejs');
});
//Handlling post request
app.post("/home", async (req, res) => {
    const newOrganization = new Organization(req.body.player);
    await newOrganization.save();
    console.log(newOrganization);
    res.redirect("/")
});


// Start the server
app.listen(8080, () => {
    console.log('Server is listening on port 8080');
});
