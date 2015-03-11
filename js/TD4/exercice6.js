var albums;
var panier;
var panierRect;
var liste;
var selection;
var total = 0;

$(document).ready(function () {

    // Chargement du tableau

    var titleRow = $('thead').append($('<tr>'));
    titleRow.append($('<td>').text("Titre de l'album"));
    titleRow.append($('<td>').text("Quantité"));
    titleRow.append($('<td>').text("Prix"));

    // Chargement des albums

    $('#listeAlbums').html("<li>Chargement...</li>");

    $.get('../TD3/albums.php').success(function (data) {
        albums = data;
        $('#listeAlbums').html("");
        $.each(albums, function (id, album) {
            var li = $('<li>');
            $('#listeAlbums').append(li);
            var img = $('<img>');
            img.css('width', 50);
            img.css('height', 50);
            img.attr('class', 'cover');
            img.attr('src', "../TD3/image.php?code=" + album.Code_Album);
            img.data("album", album);
            img.data("incart", false);
            li.append(img);
            li.append(" " + album.Titre_Album);
        });


        $('img.cover').draggable({
            opacity: 0.4,
            cursor: 'pointer',
            snap: true,
            stop: function (event, ui) {
                var cart_top = $('#caddie').offset().top;
                var cart_left = $('#caddie').offset().left;
                var cart_right = $('#caddie').offset().left + $('#caddie').width();
                var cart_bottom = $('#caddie').offset().top + $('#caddie').height();

                console.log({cart_top: cart_top, cart_left: cart_left, cart_right: cart_right, cart_bottom: cart_bottom});

                var obj = ui.helper;

                var top = obj.offset().top;
                var left = obj.offset().left;

                var album = obj.data('album');

                if (top > cart_top && top < cart_bottom && left > cart_left && left < cart_right && !obj.data('incart'))
                {
                    // Mis dans le panier

                    obj.data('incart', true);

                    var row = $('<tr>').attr('class', "row_" + album.Code_Album);

                    row.append($('<td>').text(album.Titre_Album));

                    var select = $('<select>').change(function() {
                        var qte = $(this).find(':selected').text();
                        var totalCell = $('.row_'+album.Code_Album).find('.row_total');

                        total -= totalCell.text();
                        var prix = qte * 10;
                        totalCell.text(prix);
                        total += prix;

                        if (prix == 0)
                            deleteRow(obj, $('.row_' + album.Code_Album));

                        refreshTotal();
                    });

                    for (var i = 0; i <= 10; i++) {
                        var option = $('<option>').attr('value', i).text(i);
                        if  (i == 1)
                            option.attr('selected', 'selected');
                        select.append(option);
                    }

                    row.append(select);
                    row.append($('<td>').attr('class', 'row_total').text(10));

                    $('tbody').append(row);
                    row.animate({ 'background-color': 'green', color: 'white'}, 300, 'swing', function () {
                        row.animate({ 'background-color': 'white', color: 'black'}, 800);
                    });
                    total += 10;
                    refreshTotal();

                } else if (!(top > cart_top && top < cart_bottom && left > cart_left && left < cart_right) && obj.data('incart')) {
                    // Pas dans le panié de yoplait

                    obj.data('incart', false);

                    deleteRow(obj, $('.row_' + album.Code_Album));

                    refreshTotal();



                }

            }
        });

        $("img.cover").each(function (key, item) {
            $(this).data('left', $(this).css('left'));
            $(this).data('top', $(this).css('top'));
        });
    });
});

function refreshTotal() {
    document.getElementById('total').textContent = total;
}

function deleteRow(obj, row) {
    var album = obj.data('album');
    var row = $('.row_'+album.Code_Album);
    var prix = row.find('.row_total').text();
    total -= prix;

    row.children('td')
        .animate({ padding: 0, 'background-color': 'red', color: 'white' })
        .wrapInner('<div />')
        .children()
        .slideUp(1000, function() {
            row.remove();
        });

    obj.animate({
        left: "0",
        top:  "0"
    }, 300);
}