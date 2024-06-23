const VerifyToken = (req, res) => {

    try {
        let accesToken = process.env.TOKEN;
        let token = req.query["hub.verify_token"];
        let challenge = req.body["hub.challenge"];

        if (challenge != null && token != null && token == accesToken) {
            res.send(challenge);
        } else {
            res.status(400).send();
        }



    } catch (e) {
        res.status(400).send();
    }

}

const ReceivedMessage = (req, res) => {
    res.send("Mensaje recibido");
}

module.exports = {
    VerifyToken,
    ReceivedMessage
}