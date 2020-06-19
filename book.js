const express = require('express');
var router = express.Router();
var publicDir = require("path").join(__dirname,'/public');
router.use(express.static(publicDir));
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://kool2406:0961688824Kool@cluster0-y4ose.mongodb.net/test "


router.get('/',async (req,res)=>{   
    let client = await MongoClient.connect(url);
    let dbo = client.db("Kool");
    let result = await dbo.collection("Book").find({}).toArray();
    res.render('showbook',{book:result});
});

router.get('/delete',async (req,res)=>{
    let id = req.query.id;
    var ObjectID = require('mongodb').ObjectID;
    let condition = {"_id" : ObjectID(id)};
    let client= await MongoClient.connect(url);
    let dbo = client.db("Kool");
    await dbo.collection("Book").deleteOne(condition);
    let results = await dbo.collection("Book").find({}).toArray();
    res.render('showbook',{book:results});
});
router.get('/insert',async(req,res)=>{
    res.render('insert');
});
router.post('/doInsert',async(req,res)=>{
    let client= await MongoClient.connect(url);
    let dbo = client.db("Kool");
    let name = req.body.txtNameBook;
    let price = req.body.txtPriceBook;
    let description = req.body.txtDescriptionBook;
    let newProduct = {NameBook : name, PriceBook : price, DescriptionBook:description};
    await dbo.collection("Book").insertOne(newProduct);
    console.log(newProduct);
    let results = await dbo.collection("Book").find({}).toArray();
    res.render('showbook',{book:results});
});
router.get('/update',async(req,res)=>
{
    let id = req.query.id;
    var ObjectID = require('mongodb').ObjectID; 
    let cliet = await MongoClient.connect(url);
    let dbo = cliet.db('Kool');
    let result = await dbo.collection("Book").findOne({'_id' : ObjectID(id)});
    res.render('update',{book:result});
})
router.post('/doUpdate', async(req,res)=>{
    let id = req.body.id;
    let name = req.body.txtNameBook;
    let price = req.body.txtPriceBook;
    let description = req.body.txtDescriptionBook;
    let newValues ={$set : {NameBook: name,PriceBook:price,DescriptionBook:description}};
    var ObjectID = require('mongodb').ObjectID;
    let condition = {"_id" : ObjectID(id)};
    
    let client= await MongoClient.connect(url);
    let dbo = client.db("Kool");
    await dbo.collection("Book").updateOne(condition,newValues);
    //
    let results = await dbo.collection("Book").find({}).toArray();
    res.render('showbook',{book:results});
});

module.exports = router;