const express = require("express");
const apiRoute = require("./routes/routes");
const body_parser = require("body-parser");
const app = express().use(body_parser.json());
require('dotenv').config();

//const app = express();

const PORT = process.env.PORT || 3000;


//app.use(express.json());

app.use('/webhook', apiRoute);


app.get('/', function (req, res) {
    res.status(200).send("ChatBot OK")
})

app.listen(PORT, () => (console.log("el puerto es: " + PORT)));