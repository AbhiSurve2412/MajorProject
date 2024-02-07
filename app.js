const express = require('express');
const app = express();
const mongoose = require('mongoose');

const path = require('path');
app.set('view engine', 'ejs');
app.set('path', path.join(__dirname, 'views'));


let MONGO_URL = "mongodb://127.0.0.1:27017/majorProject";
main().then(() => {
    console.log("Connected to DB");
})
.catch((err) => {
    console.error(err);
});
async function main(){
    await mongoose.connect(MONGO_URL);
}


app.get("/",(req,res)=>{
    res.send("Hi,I am root");
});

app.listen(8080,()=>{
    console.log('listening on 8080');
});