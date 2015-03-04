var requestAjax;

function connect(page) {
    requestAjax = new XMLHttpRequest();
    if(requestAjax != null) {
        requestAjax.open("GET", page, true);
        requestAjax.onreadystatechange = handler;
        requestAjax.send();
    } else {
        window.alert("Pas de support AJAX ( XMLHTTP ) ");
    }
}

function handler(){
    if(requestAjax.readyState === 4){
        if(requestAjax.status === 200 ){
            display();
        }
    }
}

function call(){
    connect("donnees.xml");
}

function display(){
    var docXml = requestAjax.responseXML;
    var responses = docXml.getElementsByTagName("NOM");
    var text = "";
    for( i = 0; i < responses.length; ++i ){
        text = text + responses[i].firstChild.textContent + " ";
    }

    var divlist = document.getElementById("musiciens");
    divlist.style.visibility = "visible";
    divlist.value = text;
}