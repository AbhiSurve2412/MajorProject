const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const ejsMate = require('ejs-mate');
const player = require('./models/player'); // Require player model


// Set the view engine to EJS
app.engine("ejs",ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

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
    res.render('player/index.ejs');
});

//signup form for player
app.get("/player/signup", (req, res) => {
    res.render('player/signup.ejs');
});

app.post("/home", async (req, res) => {
    const newPlayer = new player(req.body.player);
    // await newPlayer.save();
    console.log(newPlayer);
    res.redirect("/")
});

// Start the server
app.listen(8080, () => {
    console.log('Server is listening on port 8080');
});
