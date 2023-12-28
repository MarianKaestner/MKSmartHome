
//Adds new device
$("#add-device").click(function(){
    var node = $("<div></div>");
    node.addClass("widget");
    node.attr("onclick", "removeDevice(this)");
    node.html("<h2>Smart Device</h2>");
    $("#add-device").before(node);
});

//Removes device
function removeDevice(e){
    e.remove();
}



