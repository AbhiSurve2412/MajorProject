const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const ejsMate = require('ejs-mate');

//models
const User = require('../models/User');

// Set the view engine to EJS
app.engine("ejs",ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

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

// Define route to render idex page before login 
app.get("/", (req, res) => {
    res.render('player/index.ejs');
});

//user route
//get request for signupAsPlayer
app.get("/player/signup", (req,res)=>{
    res.render("player/signup");
});

//post request to store in DB
app.post("/player/signup", async (req, res)=>{
    let player = req.body;
    console.log(player);
});





// Start the server
app.listen(8080, () => {
    console.log('Server is listening on port 8080');
});
