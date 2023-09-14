require("dotenv").config()

//const app = require('./app');

const port = process.env.PORT

const express = require('express');
const cors = require('cors');
//const logger = require("./logger.js");

const app = express();
app.use(cors());
app.use(express.json())

function logger(req, res, next) {
    
    console.log(req.method, req.originalUrl);
    next()

}


//app.use(logger);

app.get('/', (req, res) => {
    res.send(`Welcome to the quotes API! There are ${quotes.length} available.`);
})

app.get('/quotes', (req, res) => {
    res.send("All the quotes!");
})

app.get('/quotes/random', (req, res) => {
    let randIdx = Math.floor(Math.random() * quotes.length());//3;
    res.send(quotes[randIdx]);
})

app.get('/quotes/:id', (req, res) => {
    let idx = req.params.id;

     res.send(quotes[idx]);
})

app.post("/quotes", (req, res) => {
    let newQuote = req.body; 
    const ids = quotes.map(quote => quote.id)
    let MaxID = Math.max(...ids)

    newQuote["id"] = MaxID + 1//quotes.length;
    //Max id + 1

    res.status(201).send(newQuote);
})

module.exports = {app};


app.listen(port, () => {
    console.log(`API listening on port ${port}.`);
})