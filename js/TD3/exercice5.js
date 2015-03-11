var albums;
var panier;
var panierRect;
var liste;
var selection;
var total = 0;

document.onmousemove = MouseMove;
document.onmousedown = pick;
document.onmouseup = checkCartContent;


//Ici on charge toute la liste en parsant le JSON
function loadListe() {
    liste = document.getElementById('listeAlbums');
    connect("albums.php");
    var li = document.createElement('li');
    li.appendChild(document.createTextNode("Chargement des albums..."));
    liste.appendChild(li);
}

function handler() {
    if (requestAjax.readyState === 4) {
        if (requestAjax.status === 200) {
            fillListe();
        }
    }
}

function fillListe() {

    while (liste.hasChildNodes()) {
        liste.removeChild(liste.lastChild);
    }

    albums = JSON.parse(requestAjax.responseText);
    for ( var i = 0; i < albums.length; ++i) {
        var li = document.createElement('li');
        li.id = albums[i].Titre;
        var img = new Image();
        img.width = 50;
        img.height = 50;
        img.src = "image.php?code=" + albums[i].Code_Album;
        img.id = "album " + albums[i].Code_Album + "-" + albums[i].Titre_Album;
        li.appendChild(img);
        var node = document.createTextNode(albums[i].Titre_Album + " " + albums[i].Année_Album);
        li.appendChild(node);
        liste.appendChild(li);
    }
}



//Ici on charge le tableau
function loadTable(){
    var Titlerow = panier.getElementsByTagName('tbody')[0].insertRow();
    Titlerow.insertCell(0).innerHTML = "Titre de l'album";
    Titlerow.insertCell(1).innerHTML = "Quantité";
    Titlerow.insertCell(2).innerHTML = "Prix";
}

function MouseMove(event) {
    if(typeof selection != 'undefined') {
        var s = selection.id;
        //On vérifie que ce soit un album
        if (s.indexOf('album')>-1) {
            var mouseRect = selection.getBoundingClientRect();
            var centerH = event.clientY + (mouseRect.top - mouseRect.bottom) /2;
            var centerW = event.clientX - (mouseRect.right - mouseRect.left) /2;
            selection.style.position = 'absolute';
            selection.style.left = window.pageXOffset + centerW + 'px';
            selection.style.top = window.pageYOffset + centerH  + 'px';
        }
    }
}

function pick(ev)
{
    var imgs = document.getElementsByTagName('img');
    var i = 0;
    var trouve = false;
    while( i < imgs.length && !trouve){
        var rect = imgs[i].getBoundingClientRect();
        if (( rect.left < ev.clientX) && ( ev.clientX < rect.right) && (rect.top < ev.clientY) && (ev.clientY < rect.bottom))
        {
            if (imgs[i].id.toString().indexOf('album') >-1){
                selection = imgs[i];
                trouve = true;
                event.preventDefault();
            }

        }
        i++;
    }
}

function checkCartContent(){
    if ( selection != null )
    {
        panierRect = document.getElementById('caddie').getBoundingClientRect();
        var selectRect = selection.getBoundingClientRect();
        if ( selectRect.left > panierRect.left && selectRect.right < panierRect.right && selectRect.top > panierRect.top && selectRect.bottom < panierRect.bottom ) {
            addInCart(selection.id);
        }
        else {
            removeFromCart(selection.id);
        }

        selection = null;

    }

}


function addInCart(id) {
    var arrayString = id.split("-");
    var test = document.getElementById("row " + arrayString[1].toString());
    if(test == null){
        var row = panier.getElementsByTagName('tbody')[0].insertRow();
        row.insertCell(0).innerHTML = arrayString[1].toString();
        row.id = "row " + arrayString[1].toString();
        //On crée le sélecteur
        var select = document.createElement('select');
        select.id = "select -" + id;
        select.onchange = quantityChanged;
        for (var i = 1; i <= 10; i++) {
            var option = document.createElement('option');
            option.value = i;
            option.text = i;
            option.selected = (i == 1);
            select.add(option);
        }
        //var plus = document.createElement('option');
        //plus.text = "+";
        //select.add(plus);

        row.insertCell(1).appendChild(select);

        var prix = select.options[select.selectedIndex].text * 10;

        row.insertCell(2).innerHTML = prix;

        total += prix;
        refreshTotal();
    }

}

function removeFromCart(id) {
    var row = document.getElementById("row " + id.split("-")[1].toString());
    if (row == null)
        return;
    var prix = row.cells[2].textContent;
    total -= prix;
    row.parentNode.removeChild(row);
    refreshTotal();

}

function refreshTotal() {
    document.getElementById('total').textContent = total;
}

function quantityChanged() {
    total -= this.parentNode.parentNode.childNodes[2].textContent;
    var prix = this.options[this.selectedIndex].value * 10;
    this.parentNode.parentNode.childNodes[2].textContent = prix;
    total += prix;
    refreshTotal();
}