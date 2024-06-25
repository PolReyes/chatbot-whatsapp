//require('dotenv').config();
const VerifyToken = (req, res) => {

    try {
        let accesToken = "bf7886799222fe3518017ab";
        //let accesToken = process.env.TOKEN;
        //let token = req.query["hub.verify_token"];
        //let challenge = req.query["hub.challenge"];

        let mode = req.query["hub.mode"];
        let challenge = req.query["hub.challenge"];
        let token = req.query["hub.verify_token"];



        /*if (mode && token) {
            if (mode === "subscribe" && token === accesToken) {
                res.status(200).send(challenge);
            } else {
                res.status(403);
            }
        }*/

        if (challenge != null && token != null && token == accesToken) {
            res.send(challenge, "0 " + mode + "/" + challenge + "/" + token + "/" + process.env.TOKEN);
        } else {
            res.status(400).send("1 " + mode + "/" + challenge + "/" + token + "/" + process.env.TOKEN);
        }



    } catch (e) {
        res.status(400).send("Algo salió mal " + e);
    }

}

const ReceivedMessage = (req, res) => {
    /*    try {
            let entry = req.body["entry"][0];
            let changes = entry["changes"][0];
            let value = changes["value"];
            let messageObject = value["messages"];
            let messages = messageObject[0];
            let text = GetTextUser(messages);
    
            if (typeof messageObject != "undefined") {
                let messages = messageObject[0];
                let text = GetTextUser(messages);
    
                console.log(text)
            }
    
            console.log(text, messageObject);
    
            res.send("EVENT_RECEIVED");
        } catch (e) {
            res.send("EVENT: " + e)
        };*/

    res.send("EVENT_RECEIVED");
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