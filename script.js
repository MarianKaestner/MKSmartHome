
function addElement(){
    var node = document.createElement("div");
    node.attr("class", "widget");
    node.html("<h2>Smart Device</h2>");
    $("#add-device").before(node);
}
