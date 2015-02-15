function toAdd() {
    var inputEntry = document.getElementById('Add');
    var table = document.getElementById('list');
    var row = document.createElement('tr');
    var cell = document.createElement('td');
    var cellData = document.createTextNode(inputEntry.value);
    cell.appendChild(cellData);
    row.appendChild(cell);
    table.appendChild(row);
}

function sommaire() {
    var divliste = document.getElementById("liens");

    while ( divliste.hasChildNodes()){
        divliste.removeChild(divliste.lastChild);
    }

    var reps = document.getElementsByTagName("h4");
    for ( i = 0; i < reps.length ; i++ ) {
        var ligne = document.createElement("p");
        var link = divliste.ownerDocument.createElement("a");
        var currentID = reps[i].textContent;
        reps[i].id = currentID;
        link.appendChild(document.createTextNode(reps[i].textContent));
        link.setAttribute("href","#"+currentID);
        ligne.appendChild(link);
        divliste.appendChild(ligne);
    }
}