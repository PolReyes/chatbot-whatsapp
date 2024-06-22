const VerifyToken = (req, res) => {
    res.send("Token correcto");
}

const ReceivedMessage = (req, res) => {
    res.send("Mensaje recibido");
}

module.exports = {
    VerifyToken,
    ReceivedMessage
}