const express = require('express')
const app = express()
const port = 5000;   //backend on 5000, frontend on 3000
const mongoDB = require("./db")
mongoDB()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
})

app.use(express.json())

app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));
// app.use('/api', require("./Routes/OrderData"));

app.get('/', (req,res)=>{
  res.send('Hello World')
})
 
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})






//To start the backend part:
//cd mernapp->backend
//nodemon ./index.js

//1. I have imported data set into my mongodb Atlas through 
//the import mongodb database tool

//2. With the help of mongoose, aap schema bana sakte ho in mongodb
//(which is otherwise schemaless)
//Mongoose connects your database with mongodb

//3. We will be fetching data from mongoDB to our backend 
//through mongoose

//4. We use Schema through mongoose to validate data
//Example: MongoDB wont give us any error if we send 
//wrong or curropt data so how to validate whether the 
//given data is appropriate is why we use Schema through mongoose


//5. Model is a wrapper for Schema

//6. The password is hashed using the bcrypt library