const express = require('express');
const cors = require('cors');
const logger = require("./logger");

const app = express();
app.use(cors());
app.use(express.json())

app.use(logger);

app.Get('/', (req, res) => {
    res.send(`Welcome to the quotes API! There are ${quotes.length} available.`);
})

app.Get('/quotes', (req, res) => {
    res.send("All the quotes!");
})

app.Get('/quotes/random', (req, res) => {
    const randIdx = 3;
    res.send(quotes[randIdx]);
})

app.Get('/quotes/:id', (req, res) => {
    const idx = req.params.id;

     res.send(quotes[idx]);
})

app.post("/quotes", (req, res) => {
    const newQuote = req.body; 

    newQuote["id"] = quotes.length;

    res.status(201).send(newQuote);
})