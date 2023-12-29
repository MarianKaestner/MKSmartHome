let path = require("path");
let express = require("express");
let parser = require("body-parser");
app = express();
let port = 8000;
app.locals.deviceList = [];

function Device(pName, pAddress){
    this.name = pName;
    this.address = pAddress;
}

app.use(parser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/newdevice", (req, res) => {
    res.render("deviceform.ejs");
});

app.post("/submit", (req, res) => {
    res.redirect("http://localhost:8000/newdevice");
});

app.post("/create", (req, res) => {
    app.locals.deviceList.push(new Device(req.body.name, req.body.ipaddress));
    res.redirect("http://localhost:8000");
})

app.listen(port, () => {
    console.log("Listening on port " + port);
});