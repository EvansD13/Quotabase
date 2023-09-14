require("dotenv").config()

//const app = require('./app');
const quotes = require("./quotes.json")

const port = process.env.PORT

const express = require('express');
const cors = require('cors');
//const logger = require("./logger.js");

const fs = require(`fs`)
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
    res.send(quotes);
})

app.get('/quotes/random', (req, res) => {
    let randIdx = Math.floor(Math.random() * quotes.length);//3;
    console.log()
    res.send(quotes[randIdx]);

})

app.get('/quotes/:id', (req, res) => {
    let idx = req.params.id - 1;
    console.log(req.params.idx)
    
    if (idx > quotes.length){
        res.status(404).send(`Error! There are fewer than ${idx} quotes in the database. Please try another index to find an inspiring quote!`)

    }else{
        res.send(quotes[idx]);
    }
})

app.post("/quotes", (req, res) => {
    let newQuote = req.body;
    console.log(newQuote)
    const found = quotes.find(found => found.text.toLowerCase() === newQuote.text.toLowerCase())

    const ids = quotes.map(quote => quote.id)
    let MaxID = Math.max(...ids)
    /*
    if (found != undefined){
        console.log("Quote in database")
        res.status(400).send("This quote is already in our database!")
        
    }else{
        */
    newQuote["id"] = quotes.length + 1;
    req.body.id = quotes.length + 1
    
    quotes.push(req.body)

    fs.writeFile("quotes.json", JSON.stringify(quotes), function(err){
        if (err) throw err;
        console.log("Complete")
    })
    console.log("Added!")
    //Max id + 1


    res.status(201).send("Added");
//}
})

module.exports = {app};


app.listen(port, () => {
    console.log(`API listening on port ${port}.`);
})