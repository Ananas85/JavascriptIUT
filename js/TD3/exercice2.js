function handler(){
    if(requestAjax.readyState === 4){
        if(requestAjax.status === 200 ){
            display();
        }
    }
}


function call(){
    connect("donnees.json");
}

function display(){
    var docJSON = JSON.parse(requestAjax.responseText);
    var text = "";
    for( i = 0; i < docJSON.length; ++i ){
        text = text + docJSON[i].Nom_Musicien + " ";
    }

    var divlist = document.getElementById("musiciens");
    divlist.style.visibility = "visible";
    divlist.value = text;
}