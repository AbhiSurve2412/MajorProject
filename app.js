const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set the views directory path
app.set('views', path.join(__dirname, 'views'));

// MongoDB connection URL
let MONGO_URL = "mongodb://127.0.0.1:27017/majorProject";

// Connect to MongoDB
main().then(() => {
    console.log("Connected to DB");
}).catch((err) => {
    console.error(err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
}

// Serve static files from the 'public' directory
app.use(express.static('public'));


// Define route to render boilerplate.ejs
app.get("/", (req, res) => {
    res.render('./layouts/boilerplate.ejs'); // Correct
});

// Start the server
app.listen(8080, () => {
    console.log('Server is listening on port 8080');
});
