const express = require("express");
const connectDB = require('./config/db');
const app = express();
connectDB();
const PORT = process.env.PORT||5000;
//Initialize middleware
app.use(express.json({extended:false}));
app.get("/",(req,res)=>{
    console.log('Hello from server.');
    res.send("NAMASTE WORLD");
})
//Define Routes
app.use('/api/users',require('./routes/api/users'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/profile',require('./routes/api/profile'));

app.listen(PORT,(err)=>{
    if(!err){
        console.log("Server is up and running on port 5000");
    }
})