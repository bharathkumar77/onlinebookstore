var express = require('express')
var mongo = require('mongodb').MongoClient
var app = express()
var database;

//Body parsing middle ware to the data in JSON format
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//Connecting to Mongo DB through node
mongo.connect("mongodb://localhost:27017", (err, data) => {
    if (err) {
        console.log(
            "Can't connect to the database"
        )
    }
    else {
        console.log("Connected successfully to Mongo")
    }
    database = data.db('onlinebookstore', (err) => {
        if (!err)
            console.log("connected to onlinebookstore")
        else
            console.log("cant connect to onlinebookstore")

    })
})


//Getting data from cartdetails collection 
app.get("/data", (req, res) => {
    database.collection('cartdetails').find({}).toArray((err, result) => {
        if (err) {
            console.log("error" + err)
        }
        else {
            res.json(result)
        }
    }

    )



})

//Deleting one document from the collection and fetching the collection back
app.get("/delete/:id", (req, res) => {

    database.collection('cartdetails').deleteOne({ id: req.params.id }, err => {
        console.log("Document Deleted")
    })
    database.collection('cartdetails').find({}).toArray((err, result) => {
        if (err) {
            console.log("error" + err)
        }
        else {
            res.json(result)
        }
    })
})

//routes for increasing and decreasing the quantity
app.get("/increasequantity/:id", (req, res) => {

    database.collection('cartdetails').updateOne({ id: req.params.id }, { $inc: { quantity: 1 } }, (err) => {
        console.log("Document updated")
    })
    database.collection('cartdetails').find({}).toArray((err, result) => {
        if (err) {
            console.log("error" + err)
        }
        else {
            res.json(result)
        }
    })
})
app.get("/decreasequantity/:id", (req, res) => {

    database.collection('cartdetails').updateOne({ id: req.params.id }, { $inc: { quantity: -1 } }, (err) => {
        console.log("Document updated")
    })
    database.collection('cartdetails').find({}).toArray((err, result) => {
        if (err) {
            console.log("error" + err)
        }
        else {
            res.json(result)
        }
    })
})

//POST request to store the transaction details that come from front end 
app.post("/transaction", (req, res) => {
    var data = req.body.transactionDetails;

    database.collection('transactiondetails').insertOne(data, result => {
        console.log(result);
    })
})

//Initiating the server on port 8005
app.listen(8005, (err) => {
    if (!err)
        console.log("Server connected at Port 8005")
    else
        console.log("Couln't load the server" + err)
})