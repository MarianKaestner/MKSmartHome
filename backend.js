let path = require("path");
let express = require("express");
let parser = require("body-parser");
app = express();
let port = 8000;

app.use(parser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) => {
    console.log(path.join(__dirname, "/public/index.html"));
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(port, () => {
    console.log("Listening on port " + port);
})