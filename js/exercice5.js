function passerEnSaisie(id){
    var span = document.getElementById(id);
    var para = span.parentNode;
    var input = document.createElement("input");
    input.setAttribute('for',"renseignement");
    input.setAttribute('id',id);
    para.replaceChild(input,span);
    input.value = span.firstChild.nodeValue;
    input.focus();
}

function validerlasaisie(){
    var inputs = document.querySelectorAll('[for="renseignement"]');
    for (i = 0; inputs.length; i++ ) {
        //On prend le noeud parent ( un paragraphe )
        var para = inputs[i].parentNode;

        //On crée un span
        var span = document.createElement("span");

        //On set l'id et le contenu du span
        span.setAttribute('id',inputs[i].id );
        span.textContent = inputs[i].value;
        para.replaceChild(span,inputs[i]);
    }
}
