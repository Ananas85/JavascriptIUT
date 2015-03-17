$(document).ready(function(){
    $("h2").each(function(index){
        var titreId = "Titre" + index;
        $(this ).attr('id',titreId);
        $("#liens" ).append($("<li></li>" ).append($("<a></a>" ).text($(this).text()).attr("href","#"+titreId)));

    });
    var input = $('<input>').attr('type','button').attr("value",'Top').bind('click', function(){
        $('html, body').animate({ scrollTop: 0 }, 'slow');
    });
    $("p").after(input);

    $("h2").hover(function(){$(this ).css('color','red')}, function(){$(this ).css('color','black')});
});