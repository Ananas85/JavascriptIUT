var foot_token = '815a15260e514a68aa0c6322bd849950';

$(document).ready(function() {

    moment.locale('fr');

    $('.addWidget').on('click', function() {
        addWidget($(this).data('type'))
    });

    $('#save').on('click', serializeWidgets);
    $('#restore').on('click', restoreWidgets);
    $('#clear').on('click', function() {
        $('#widgets').empty();
    });

});
var clock_launched = false;

function generatePanel(title, content) {
    var panel = $('<div>').addClass('panel').addClass('panel-info');
    var header = $('<div>').addClass("panel-heading");
    header.append($('<h3>').addClass('panel-title').html(title));
    header.append($('<button>').addClass('btn btn-xs btn-danger pull-right deleteWidget').append($('<i>').addClass('fa fa-times')));
    panel.append(header);
    panel.append($('<div>').addClass('panel-body').html(content));
    return panel;
}

function insertWidget(type, panel) {
    var size = 'col-md-3';
    if (type == 'youtube')
        size = 'col-md-4';
    else if (type == 'flickr')
        size = 'col-md-6';
    $('#widgets').append($('<div>').addClass(size).html(panel.attr('data-type', type).addClass('widget')));

    $('.deleteWidget').on('click', function() {
        $(this).parent().parent().parent().remove();
    });
}

function addWidget(type) {
    if (type == "datetime") {
        addDatetime();
    } else if (type == "weather") {
        addWeather();
    } else if (type == "flickr") {
        addFlickr();
    } else if (type == "foot") {
        addFoot();
    }
}

function addDatetime() {
    var panel = generatePanel("Horloge", $("<div>").addClass("clock-container"));
    insertWidget("datetime", panel);
    launchClockLoop();
    updateClocks();
}

function addWeather() {
    var content = $('<div>').addClass('text-center');
    var panel = generatePanel("Météo", content);
    insertWidget("weather", panel);
    content.append($('<i>').addClass('text-muted fa fa-3x fa-circle-o-notch fa-spin'));
    $.get("http://api.openweathermap.org/data/2.5/weather?q=Gradignan,fr&lang=fr&units=metric")
        .success(function (data) {
            content.empty();
            content.append($('<h4>').append($('<small>').text(data.name)));
            content.append($('<h2>').text(data.weather[0].description));
            content.append($('<h1>').addClass('text-primary').text(data.main.temp + "°C"));
        });
}

function addFlickr() {
    var content = $('<div>').addClass('text-center');
    var panel = generatePanel("Dernière photos Flickr", content);
    insertWidget("flickr", panel);
    content.append($('<i>').addClass('text-muted fa fa-3x fa-circle-o-notch fa-spin'));
    $.getJSON("https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?", {format: 'json', tags: 'Apple Watch'})
        .done(function (data) {
            content.empty();
            var gallery = content.append($('<div>').addClass('row'));
            var i = 0;
            $.each(data.items, function (key, item) {
                if (i > 2) return;
                var link = item.link;
                var imgsrc = item.media.m;
                var img = new Image();
                $(img).load(function() {
                    gallery.append($('<div>').addClass("col-md-4").append($('<a>').attr('href', link).attr('target', '_blank').addClass('thumbnail').append($(this))));
                }).attr({ src: imgsrc});
                i++;
            });
        });
}

function addFoot() {
    var content = $('<div>').addClass('text-center');
    var panel = generatePanel("Résultats du Bayern", content);
    insertWidget("foot", panel);
    content.append($('<i>').addClass('text-muted fa fa-3x fa-circle-o-notch fa-spin'));
    $.ajax({
        headers: { 'X-Auth-Token': foot_token },
        url: 'http://api.football-data.org/alpha/teams/5/fixtures',
        dataType: 'json',
        type: 'GET'
    })
        .success(function (data) {
            content.empty();
            var i = 0;
            $.each(data.fixtures.reverse(), function (key, item) {
                if (i > 4 || item.status != "FINISHED") return;
                console.log(item);
                var row = $('<div>').addClass('row');
                var left = $('<div>').addClass('col-sm-6 text-left');
                left.append($('<h5>').text(item.homeTeamName));
                left.append($('<h1>').text(item.result.goalsHomeTeam));
                var right = $('<div>').addClass('col-sm-6 text-right');
                right.append($('<h5>').text(item.awayTeamName));
                right.append($('<h1>').text(item.result.goalsAwayTeam));
                row.append(left);
                row.append(right);
                content.append($('<div>').addClass('text-center').append($("<h5>").html("<b>" + moment(item.date).format("Do MMM YYYY") + "</b><br/><small>" + item.matchday + "e Journée</small>")))
                content.append(row);
                content.append($('<hr>'));
                i++;
            });
        });
}

function launchClockLoop() {
    if (clock_launched)
        return;

    setInterval(updateClocks, 100);

    clock_launched = true;
}

function updateClocks() {
    var container = $('.clock-container');
    container.empty();
    container.append($('<h2>').html(moment().format("HH:mm:ss.S")));
    container.append($('<h5>').html(moment().format("Do MMM YYYY")));
}

function serializeWidgets() {
    var types = [];
    $('.widget').each(function () {
        types.push($(this).attr('data-type'));
    });
    localStorage.setItem("layout", types.join());
}

function restoreWidgets() {
    var str = localStorage.getItem("layout");
    var types = str.split(',');

    $('#widgets').empty();

    $.each(types, function(k, v) {
        addWidget(v);
    });

}