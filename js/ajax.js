var requestAjax;

function connect(page) {
    requestAjax = new XMLHttpRequest();
    if (requestAjax != null) {
        requestAjax.open("GET", page, true);
        requestAjax.onreadystatechange = handler;
        requestAjax.send();
    } else {
        window.alert("Pas de support AJAX ( XMLHTTP ) ");
    }
}
