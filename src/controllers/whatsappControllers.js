const axios = require("axios");
const VerifyToken = (req, res) => {

    try {
        let accesToken = process.env.TOKEN;

        let mode = req.query["hub.mode"];
        let challenge = req.query["hub.challenge"];
        let token = req.query["hub.verify_token"];



        if (mode && token) {
            if (mode === "subscribe" && token === accesToken) {
                res.status(200).send(challenge);
            } else {
                res.status(403);
            }
        } else {
            res.status(200).send("Token ya se verificó");
        }


    } catch (e) {
        res.status(400).send("Algo salió mal " + e);
    }

}

const ReceivedMessage = (req, res) => {
    let body_param = req.body;

    // console.log(JSON.stringify(body_param, null, 2));

    if (body_param.object) {
        if (body_param.entry &&
            body_param.entry[0].changes &&
            body_param.entry[0].changes[0].value.message &&
            body_param.entry[0].changes[0].value.message[0]
        ) {
            let phon_no_id = body_param.entry[0].changes[0].value.metadata.phone_number_id;
            let from = body_param.entry[0].changes[0].value.messages[0].from;
            let msg_body = body_param.entry[0].changes[0].value.messages[0].text.body;
            console.log(phon_no_id + "/" + from + "/" + msg_body)
            axios({
                method: "POST",
                //url: ?access_token=EAAKfkGMvt58BO9ZBGCJ8odNmUZA60vtqZCwlwLbW3ppXuISJskKtpStwR6uFnx94zGxgvqyVLjvMAq0bYFZAuVYZCDSoA4Qa8LbJOWueWAi2Tcn1KJJFcoYjHPnDFiCzyB1RfCPihTeNiFE45Bph88y3QZB5RqbztemXD1vms3kYZCoBBMyZCH1nkYMeXbkFwyVQ
                url: "https://graph.facebook.com/v19.0/" + phon_no_id + "/messages?access_token=" + process.env.TOKENAPI,
                //url: "https://graph.facebook.com/v19.0/" + phon_no_id + "/messages",
                data: {
                    messaging_product: "whatsapp",
                    to: from,
                    text: {
                        body: "Hi.. I'm Prasath, your message is " + msg_body
                    },
                    type: "text"
                },
                headers: {
                    "Content-Type": "application/json",
                    //Authorization: "Bearer EAAKfkGMvt58BOyUHO8uOcOEmZBaw15YbE3fV3XkcJVPY6oa57esVj3D5XlDrCTYMveFkpObQsVgDZBtUK9KPz8OpZBmkikNoXLAX28dZCPeNo2g1yBdNfpczuHq0ZAqg4EOOzZByokUCgKU35yJWM5SR3sYYHiQjc7lqa0NFP0n5wDPZCNnKiUk4mj72RidMOK3dFr6xNKZBjC2MuSoTQjDj"
                }

            });
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    }
}

function GetTextUser(messages) {
    let text = "";
    let typeMessage = messages["type"];

    if (typeMessage == "text") {
        text = messages["text"]["body"];
    }
    else if (typeMessage == "interactive") {
        let interactiveObject = messages["interactive"];
        let typeInteractive = interactiveObject["type"];
        console.log(interactiveObject);

        if (typeInteractive == "button_reply") {
            text = interactiveObject["button_reply"]["title"];
        }
        else if (typeInteractive == "list_reply") {
            text = interactiveObject["list_reply"]["title"];
        }
        else {
            console.log("sin mensaje");
        }
    } else {
        console.log("No mensaje")
    }
    return text;
}



module.exports = {
    VerifyToken,
    ReceivedMessage
}