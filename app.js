const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const ejsMate = require('ejs-mate');

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




// Define route to render boilerplate.ejs
app.get("/", (req, res) => {
    res.render('player/index.ejs');
});

// Start the server
app.listen(8080, () => {
    console.log('Server is listening on port 8080');
});
