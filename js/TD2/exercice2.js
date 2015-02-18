
    var musiciens;

    function loadListe() {
        var list = document.getElementById( 'liste' );
        for( var i = 0; i < musiciens.length; ++i ) {
            var li = document.createElement( 'li' );
            var node = document.createTextNode( musiciens[i].Nom_Musicien + ", " + musiciens[i].Prénom_Musicien );
            li.appendChild( node );
            list.appendChild( li );
        }
    }

    function loadTable() {
        musiciens = JSON.parse( document.getElementById( 'music' ).text );
    }

    function display2() {
        loadTable();
        loadListe();
    }



