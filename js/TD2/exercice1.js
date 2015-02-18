var data ="<?xml version=\"1.0\" encoding=\"UTF-8\" ?> \
    <GENS> \
        <PERSONNE>\
            <NOM> Flora Bonhomme </NOM> \
            <ADRESSE> \
                <RUE> 5 rue Galliéni </RUE> \
                <CODE> 75012 </CODE> \
                <VILLE> Paris </VILLE> \
            </ADRESSE>\
            <TEL> 01 23 45 67 89 </TEL>\
        </PERSONNE>\
        <PERSONNE>\
        	<NOM> Anne Gentile </NOM>\
            <ADRESSE>\
                <RUE> 2 rue des Dames </RUE>\
                <CODE> 75007 </CODE>\
                <VILLE> Paris </VILLE>\
            </ADRESSE>\
            <TEL> 01 45 23 67 89 </TEL> \
       </PERSONNE>\
   </GENS>";

function display() {
    var parser = new DOMParser();
    var docXML = parser.parseFromString(data, "application/xml");
    var personnes = docXML.getElementsByTagName("PERSONNE");
    var table = document.getElementById("ma_table");
    var row = table.insertRow();
    row.insertCell(0).innerHTML = "NOM";
    row.insertCell(1).innerHTML = "ADRESSE";
    row.insertCell(2).innerHTML = "TELEPHONE";
    for (i = 0; i < personnes.length; i++) {
        var row = table.insertRow();
        var nom = personnes[i].getElementsByTagName("NOM")[0].firstChild.nodeValue;
        row.insertCell(0).appendChild(document.createTextNode(nom));
        var rue = personnes[i].getElementsByTagName("RUE")[0].firstChild.nodeValue;
        var code = personnes[i].getElementsByTagName("CODE")[0].firstChild.nodeValue;
        var ville = personnes[i].getElementsByTagName("VILLE")[0].firstChild.nodeValue;
        var adresse = rue + " " + code + " " + ville;
        row.insertCell(1).appendChild(document.createTextNode(adresse));
        var telephone = personnes[i].getElementsByTagName("TEL")[0].firstChild.nodeValue;
        row.insertCell(2 ).appendChild(document.createTextNode(telephone));

    }

    document.appendChild(table);
}