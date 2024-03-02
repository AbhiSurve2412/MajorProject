const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const session = require("express-session");
//Passport require
const passport = require("passport");
const LocalStrategy = require("passport-local");

//All models
const Player = require("./models/player"); // Require player model
const Organization = require("./models/organization"); // Require organization model

// Set the view engine to EJS
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));

//req data parse
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
let MONGO_URL = "mongodb://127.0.0.1:27017/majorProject";

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.error(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

//Sessions setup
const sessionOptions = {
  secret: "mysupersecretcode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};
app.use(session(sessionOptions));

//passport setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    Player.authenticate()
  )
);
passport.serializeUser(Player.serializeUser());
passport.deserializeUser(Player.deserializeUser());
// main page before login
app.get("/", (req, res) => {
  res.render("index.ejs");
});

//player route
//signup form for player
app.get("/player/signup", (req, res) => {
  res.render("player/signup.ejs");
});
// POST route to handle player signup form submission
app.post("/player/signup", async (req, res) => {
  try {
    const {
      email,
      password,
      inGameName,
      inGameId,
      ProfileImage,
      realName,
      age,
    } = req.body.player;
    const newPlayer = new Player({
      email,
      inGameName,
      inGameId,
      ProfileImage,
      realName,
      age,
    });
    const registeredPlayer = await Player.register(newPlayer, password);
    console.log(registeredPlayer);
    res.redirect("/");
  } catch (error) {
    console.error("Registration error:", error);
    res.redirect("/player/signup");
  }
});

//login route
app.post("/user/login",passport.authenticate("local", { 
    failureRedirect: "/player/signup", 
    successRedirect: "/"
})
);

//organization route
//signup form for organzation

// Start the server
app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
