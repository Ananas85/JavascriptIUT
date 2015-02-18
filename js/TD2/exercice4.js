function Personne(n, p) {
    this.nom = n;
    this.prenom = p;
}

Personne.afficheIdentité = function () {
    return this.nom + " " + this.prenom;
}

function Musicien(n, p, i) {
    Musicien.prototype = Personne;
    Personne.apply(this, arguments);
    this.instrument = "piano";
    this.afficheIdentité = function () {
        return Personne.afficheIdentité.call(this) + " " + this.instrument;
    };
}

function Adresse(v, r) {
    this.ville = v;
    this.rue = r;
    this.adresse = function () {
        return this.rue + " " + this.ville;
    };
}

function Abonne(n, p, r, v, c) {
    Abonne.prototype = Personne;
    Personne.apply(this, arguments);
    this.code = c;
    this.adresse = new Adresse(v, r);
    this.afficheIdentité = function () {
        return this.code + " " + Personne.afficheIdentité.call(this) + " " + this.adresse.adresse();
    };
}

var artistes = [];
var personnes = [];
var abonnes = [];

Array.prototype.Affiche = function (e) {
    Affiche(this, e);
};

function ChargeMusiciens() {
    var musiciens = JSON.parse(document.getElementById('music').text);
    musiciens.forEach(function (e) {
        var mus = new Musicien(e.Nom_Musicien, e.Prénom_Musicien);
        artistes.push(mus);
        personnes.push(mus);
    });
}

function insertAbonné() {
    var nom = document.getElementById("nom").value;
    var prenom = document.getElementById("prenom").value;
    var rue = document.getElementById("rue").value;
    var ville = document.getElementById("ville").value;
    var code = document.getElementById("code").value;

    document.getElementById("code").value = parseInt(code) + 1;

    var ab = new Abonne(nom, prenom, rue, ville, code);
    abonnes.push(ab);
    personnes.push(ab);
    AfficheAbonnes();
}

function AfficheMusiciens() {
    artistes.Affiche("musiciens");
}

function AfficheAbonnes() {
    abonnes.Affiche("abonnes");
}

function AffichePersonnes() {
    personnes.Affiche("personnes");
}

function Affiche(donnees, liste) {
    var list = document.getElementById(liste);
    list.style.visibility = "visible";
    while (list.lastChild)
        list.removeChild(list.lastChild);
    donnees.forEach(function (elm) {
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(elm.afficheIdentité()));
        list.appendChild(li);
    });
}