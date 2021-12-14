const express = require("express");

const app = express();
const PORT = process.env.PORT||5000;
app.get("/",(req,res)=>{
    console.log('Hello from server.');
    res.send("NAMASTE WORLD");
})

app.listen(PORT,(err)=>{
    if(!err){
        console.log("Server is up and running on port 5000");
    }
})