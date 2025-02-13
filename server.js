const express = require("express");
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 8000;
const mongoose = require('mongoose');
const routes = require('./routes');
require('dotenv').config();


mongoose.connect(process.env.MONGODB_URI);

const database = mongoose.connection;

database.on('connected',()=>{
    console.log("Database Connected");
});


const corsOptions = {
    origin : "*",
    optionSuccessStatus : 200,
    port : PORT,
};


app.get("/",cors(),(req,res)=>{
    res.status(200).json("Welcome to Toposel-API, To use the api use the /api route");
});


app.use(cors(corsOptions));

app.use(express.json());


app.use("/api",routes);


app.listen(PORT,()=>{
    console.log(`Server started listening on PORT:${PORT}`);
});
