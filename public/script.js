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
        body: JSON.stringify({"active" : value}),
    })
    .then(response => response.json())
    .catch(error => console.error("Fehler: ", error));
}



