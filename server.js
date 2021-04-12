const express = require('express')
const app = express();
const cors = require("cors");
const mongodb = require("mongodb");
app.use(cors())
app.use(express.json())
app.listen(process.env.PORT || 4000);

const URL = "mongodb+srv://dbuser:error404@cluster0.coton.mongodb.net/shorterlink?retryWrites=true&w=majority";
const DB = "shorterlink"
app.post("/",async (req,res)=>{
    try{
        console.log(req.body);
    let connection = await mongodb.connect(URL);
    let db = connection.db(DB);
     await db.collection("link").insertOne(req.body);
    connection.close();
    res.json({
        "message":"added"
    })}
    catch(error)
    {
        console.log(error);
    }
})

app.get("/:id", async (req,res)=>{
    try{
        console.log(req.body);
    let connection = await mongodb.connect(URL);
    let db = connection.db(DB);
    let link =  await db.collection("link").find({shortid:req.params.id}).toArray();
    connection.close();
    res.send(link);}
    catch(error)
    {
        console.log(error);
    }
})
app.get("/", async (req,res)=>{
    try{
        console.log(req.body);
    let connection = await mongodb.connect(URL);
    let db = connection.db(DB);
    let link =  await db.collection("link").find().toArray();
    connection.close();
    res.send(link);}
    catch(error)
    {
        console.log(error);
    }
})
app.delete("/:id",async (req,res)=>{
    try{
        console.log(req.body);
    let connection = await mongodb.connect(URL);
    let db = connection.db(DB);
    let link =  await db.collection("link").deleteOne({shortid:req.params.id});
    connection.close();
    res.json({
        "Link":"removed"
    })}
    catch(error)
    {
        console.log(error);
    }  
})
