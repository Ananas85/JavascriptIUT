$(document).ready(function(){
    var i = 0;
    $('#bouton1' ).bind('click',function(){
        var newDiv = $('#div1' ).clone();
        newDiv.attr('id', i++);
        newDiv.append($('<input>' ).attr('type','button' ).attr('value','Suppr' ).on('mouseup', function(){$(this ).parent().remove();}))
        newDiv.append('<h2>Div '+i+'</h2>');
        newDiv.insertAfter($(this));
    });
});