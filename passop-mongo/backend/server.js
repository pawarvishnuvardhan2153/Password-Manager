const express = require('express')
const dotenv = require('dotenv').config();
const { MongoClient } = require('mongodb');
const bodyparer = require('body-parser')
const cors = require('cors');

// or as an es module:
// import { MongoClient } from 'mongodb'
// dotenv.config()

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'passop';

const app = express()
const port = 3000
app.use(bodyparer.json())
app.use(cors()); // This requires the function to be invoked


client.connect();
const db = client.db(dbName);

app.get('/', async (req, res) => {
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})

// save the password
app.post('/', async (req, res) => {
    const password = req.body
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
    res.send({success:true, result: findResult})
})

//delete the password
app.delete('/', async (req, res) => {
    const password = req.body
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password);
    res.send({success:true, result: findResult})
})


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})