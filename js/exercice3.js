function add() {
    var x = parseInt(document.getElementById("Op1" ).value);
    var y = parseInt(document.getElementById("Op2" ).value);
    var r = document.getElementById("Resultat");
    document.getElementById("plop").textContent = "Résultat de "+ x.toString() + " + " + y.toString() + " = ";


    r.value = x + y;
}

function div() {

    var x = parseInt(document.getElementById("Op1" ).value);
    var y = parseInt(document.getElementById("Op2" ).value);

    if ( y == 0) {
        alert("Division par 0 impossible");
    } else {
        var r = document.getElementById("Resultat");
        document.getElementById("plop").textContent = "Résultat de "+ x.toString() + " / " + y.toString() + " = ";


        r.value = x / y;
    }
}

function diff() {
    var x = parseInt(document.getElementById("Op1" ).value);
    var y = parseInt(document.getElementById("Op2" ).value);
    var r = document.getElementById("Resultat");
    document.getElementById("plop").textContent = "Résultat de "+ x.toString() + " - " + y.toString() + " = ";


    r.value = x - y;
}

function mult() {
    var x = parseInt(document.getElementById("Op1" ).value);
    var y = parseInt(document.getElementById("Op2" ).value);
    var r = document.getElementById("Resultat");
    document.getElementById("plop").textContent = "Résultat de "+ x.toString() + " * " + y.toString() + " = ";
    r.value = x * y;
}