const VerifyToken = (req, res) => {

    try {
        let accesToken = "bf7886799222fe3518017ab";
        let token = req.query["hub.verify_token"];
        let challenge = req.query["hub.challenge"];

        if (challenge != null && token != null && token == accesToken) {
            res.send(challenge, "0");
        } else {
            res.status(400).send("1");
        }



    } catch (e) {
        res.status(400).send("2");
    }

}

const ReceivedMessage = (req, res) => {
    res.send("Mensaje recibido");
}

module.exports = {
    VerifyToken,
    ReceivedMessage
}