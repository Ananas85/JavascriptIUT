var musique = [];


function Musicien(n, p){
    this.nom = n;
    this.prenom = p;
}

function loadTable3(){
    var musiciens = JSON.parse( document.getElementById('music').text );
    console.log(musiciens);
    for (var i = 0; musiciens.length; ++i){
        musique[i] = new Musicien(musiciens[i].Nom_Musicien, musiciens[i].Prénom_Musicien);
    }
}

function createListe3(){
    var list = document.getElementById('liste2');
    for(var i=0; i< musiciens.length; ++i){
        var li = document.createElement('li');
        var node = document.createTextNode(musique[i].nom + ", " + musique[i].prenom);
        li.appendChild(node);
        list.appendChild(li);
    }
}
function display3(){
    loadTable3();
    createListe3();
}
