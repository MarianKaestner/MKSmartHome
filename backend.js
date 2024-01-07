let path = require("path");
let express = require("express");
let parser = require("body-parser");
let fs = require("fs")

app = express();
let port = 8000;
app.locals.deviceList = [];
app.locals.currentDevice = -1;

function Device(pName, pAddress, pActive){
    this.name = pName;
    this.ip = pAddress;
    this.active = pActive;
}

fs.readFile("info.json", (err, data) => {
    if(err) throw err;
    app.locals.deviceList = JSON.parse(data);
});

function updateInfo(){
    fs.writeFile("info.json", JSON.stringify(app.locals.deviceList), (err) => {
        if(err) throw err;
    });
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
    app.locals.deviceList.push(new Device(req.body.name, req.body.ip, false));
    updateInfo();
    res.redirect("/");
});

app.post("/devicesettings", (req, res) => {
    app.locals.currentDevice = Number(req.body.index);
    res.render("devicesettings.ejs");
});

app.post("/applysettings", (req, res) => {
    app.locals.deviceList[app.locals.currentDevice].name = req.body.name;
    app.locals.deviceList[app.locals.currentDevice].ip = req.body.ip;
    updateInfo();
    res.redirect("/");
});

app.post("/delete", (req, res) => {
    app.locals.deviceList.splice(app.locals.currentDevice, 1);
    updateInfo();
    res.redirect("/");
});

app.post("/back", (req, res)  => {
    res.redirect("/");
});

app.post("/api/toggle", async (req, res) => {
    if(req.body.active == "true"){
        try{
            await fetch("http://" + app.locals.deviceList[Number(req.body.index)].ip + "/on");
            app.locals.deviceList[Number(req.body.index)].active = true;
            updateInfo();
            res.status(200).json({message: "Request successful"});
        }
        catch(err){
            return res.status(400).json({message: "Fetch failed"});
        }
        
    }
    else{
        try{
            await fetch("http://" + app.locals.deviceList[Number(req.body.index)].ip + "/off");
            app.locals.deviceList[Number(req.body.index)].active = false;
            updateInfo();
            res.status(200).json({message: "Request successful"});
        }
        catch(err){
            return res.status(400).json({message: "Fetch failed"});
        }
    }
});

app.listen(port, () => {
    console.log("Listening on port " + port);
});