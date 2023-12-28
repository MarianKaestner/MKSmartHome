let path = require("path");
let express = require("express");
app = express();
let port = 8000;

app.get("/", (req, res) => {
    console.log(path.join(__dirname, "/public/index.html"));
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(port, () => {
    console.log("Listening on port " + port);
})