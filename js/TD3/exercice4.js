function handler() {
    if (requestAjax.readyState === 4) {
        if (requestAjax.status === 200) {
            display();
        }
    }
}

function reload(letter) {
    // Petit loading...
    var list = document.getElementById('data');
    // On vide la liste
    while (list.hasChildNodes()) {
        list.removeChild(list.lastChild);
    }
    var listitem = document.createElement("li");
    listitem.appendChild(document.createTextNode("Chargement..."));
    list.appendChild(listitem);
    connect("donnees.php?json&initiale=" + letter);
}

function display() {
    var json = JSON.parse(requestAjax.responseText);
    var list = document.getElementById('data');
    // On vide la liste
    while (list.hasChildNodes()) {
        list.removeChild(list.lastChild);
    }

    // On parcourt les objets dans le tableau JSON
    json.forEach(function (obj) {
        // On ajoute dans la liste :D
        var listitem = document.createElement("li");
        listitem.appendChild(document.createTextNode(obj.Nom_Musicien + " " + obj.Prénom_Musicien));
        list.appendChild(listitem);
    });
}