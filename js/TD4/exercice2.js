$(document).ready(function() {
    $('.target span').on('click', function() {
        $(this).css('color', 'red');
        $(this).css('border-color', 'red');
        $(this).css('border-radius', '20px');
        $(this).text("Bouton rouge");
    });
});