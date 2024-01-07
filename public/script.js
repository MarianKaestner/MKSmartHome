for(let i = 0; i < $("input").length; i++){
    if($("#" + i).hasClass("checked")) $("#" + i).prop("checked", true);
}

function toggle(checkbox){
    let value;
    if($(checkbox).prop("checked")){
        value = "true";
    }
    else{
        value = "false";
    }

    fetch("/api/toggle", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "active" : value,
            "index" : $(checkbox).attr("id")})
    })
    .then(response => {
        if(!response.ok) throw new Error("Bad Request")
        })
    .catch(error => {
        togglenofetch($("#" + $(checkbox).attr("id")));
        alert("Something went wrong, please check the devices info");
        console.error("Something went wrong, please check the devices info", error);
    });
}

function togglenofetch(checkbox){
    $(checkbox).prop("checked", !$(checkbox).prop("checked"));
}



