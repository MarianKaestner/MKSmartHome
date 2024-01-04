let path = require("path");
let express = require("express");
let parser = require("body-parser");

app = express();
let port = 8000;
app.locals.deviceList = [];
app.locals.currentDevice = -1;

function Device(pName, pAddress, pActive){
    this.name = pName;
    this.address = pAddress;
    this.active = pActive;
}

app.use(parser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/newdevice", (req, res) => {
    res.sendFile(path.join(__dirname, "/devicecreation.html"));
});

app.post("/create", (req, res) => {
    app.locals.deviceList.push(new Device(req.body.name, req.body.ip));
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

app.post("/api/toggle", async (req, res) => {
    if(req.body.active == "true"){
        await fetch("http://" + app.locals.deviceList[Number(req.body.index)].ip + "/on");
    }
    else{
        await fetch("http://" + app.locals.deviceList[Number(req.body.index)].ip + "/off");
    }
    res.status(200).json({message: "Request successful"});
});

app.listen(port, () => {
    console.log("Listening on port " + port);
});