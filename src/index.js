const express = require("express");
const apiRoute = require("./routes/routes");
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;


app.use(express.json());

app.use('/webhook', apiRoute);

/*app.get('/', function (req, res) {
    res.send("ChatBot")
})*/

app.listen(PORT, () => (console.log("el puerto es: " + PORT)));