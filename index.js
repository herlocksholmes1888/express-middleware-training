import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

var userIsAuthorized = false;

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.use(bodyParser.urlencoded({ extended: true }));

function checkPassword(req, res, next){
    const password = req.body["password"];
    if (password === "1234"){
        userIsAuthorized = true;
    }
    next();
}
app.use(checkPassword);

app.post("/check", (req, res) => {
    if(userIsAuthorized === true) {
        res.sendFile(__dirname + "/public/secret.html");
    } else {
        res.sendFile(__dirname + "/public/index.html");
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
