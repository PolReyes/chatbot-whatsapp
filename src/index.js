const express = require("express");
const apiRoute = require("./routes/routes");
const body_parser = require("body-parser");
const app = express().use(body_parser.json());
require('dotenv').config();

//const app = express();

const PORT = process.env.PORT || 3000;


//app.use(express.json());

/* app.use('/webhook', apiRoute); */

app.get("/webhook", (req, res) => {
    let mode = req.query["hub.mode"];
    let challenge = req.query["hub.challenge"];
    let token = req.query["hub.verify_token"];



    if (mode && token) {
        if (mode === "subscribe" && token === mytoken) {
            res.status(200).send(challenge);
        } else {
            res.status(403);
        }
    }
});
/*app.get('/', function (req, res) {
    res.send("ChatBot")
})*/

app.listen(PORT, () => (console.log("el puerto es: " + PORT)));