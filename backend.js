let path = require("path");
let express = require("express");
let parser = require("body-parser");
app = express();
let port = 8000;
app.locals.deviceList = [];
app.locals.currentDevice = -1;

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
    res.sendFile(path.join(__dirname, "/devicecreation.html"));
});

app.post("/create", (req, res) => {
    app.locals.deviceList.push(new Device(req.body.name, req.body.ipaddress));
    res.redirect("/");
});

app.post("/devicesettings", (req, res) => {
    app.locals.currentDevice = Number(req.body.index);
    res.render("devicesettings.ejs");
});

app.post("/applysettings", (req, res) => {
    app.locals.deviceList[app.locals.currentDevice].name = req.body.name;
    res.redirect("/");
});

app.post("/delete", (req, res) => {
    app.locals.deviceList.splice(app.locals.currentDevice, 1);
    res.redirect("/");
});

app.post("/back", (req, res)  => {
    res.redirect("/");
});

app.listen(port, () => {
    console.log("Listening on port " + port);
});