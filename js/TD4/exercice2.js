$(document).ready(function() {
    $('.target span').on('click', function() {
        if( this.style.color != "green" ){
            $(this).css('color', 'green');
            $(this).css('border-color', 'green');
            $(this).css('border-radius', '0px');
            $(this).text("Bouton Vert");
        } else {
            $(this).css('color', 'red');
            $(this).css('border-color', 'red');
            $(this).css('border-radius', '20px');
            $(this).text("Bouton Rouge");
        }

    });
});