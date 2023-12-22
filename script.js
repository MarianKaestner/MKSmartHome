
$("#add-device").click(function(){
    var node = $("<div></div>");
    node.addClass("widget");
    node.html("<h2>Smart Device</h2>");
    $("#add-device").before(node);
});



