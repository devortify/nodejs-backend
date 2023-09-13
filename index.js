// import modules
const express = require('express');
const dotenv= require('dotenv');
const mongoose=require('mongoose');
const todoRoutes =require('./routes/todo');
const cors= require("cors");

// defining the app
const app = express();
// Configuring dotenv module
dotenv.config();
const PORT=process.env.PORT;
const DATABASE_URL=process.env.DATABASE_URL;
// express.json is a parser 
app.use(express.json())
app.use(cors())

// creating a route
app.get('/',(req,res)=>res.json({"message":"server is running"}));

// routing api's
app.use('/api/v1/todo',todoRoutes);


// Connecting MongooseDatabase
mongoose.set("strictQuery", false);
mongoose.connect(DATABASE_URL,{useNewUrlParser: true})
.then(()=>{
    console.log("Database connected successfully");
    app.listen(PORT,
        ()=> console.log(`server is running at ${PORT}`));
    
})
.catch((err)=>{
    console.log("Database connection failed");
    console.log(err);
})
