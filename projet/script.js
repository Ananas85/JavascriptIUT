

$(document).ready(function() {

    moment.locale('fr');

    $('.addWidget').on('click', function() {
        addWidget($(this).data('type'))
    });

    $('.deleteWidget').on('click', function() {
        $(this).parent().parent().parent().remove();
    });

    $('#save').on('click', serializeWidgets);
    $('#restore').on('click', restoreWidgets);
    $('#clear').on('click', function() {
        $('#widgets').empty();
    });

});
var clock_launched = false;

function generatePanel(title, content) {
    var panel = $('<div>').addClass('panel').addClass('panel-default');
    var header = $('<div>').addClass("panel-heading");
    header.append($('<h3>').addClass('panel-title').html(title));
    header.append($('<button>').addClass('btn btn-xs btn-danger pull-right deleteWidget').append($('<i>').addClass('fa fa-times')));
    panel.append(header);
    panel.append($('<div>').addClass('panel-body').html(content));
    return panel;
}

function insertWidget(type, panel) {
    $('#widgets').append($('<div>').addClass('col-md-3').html(panel.attr('data-type', type).addClass('widget')));
}

function addWidget(type) {
    if (type == "datetime") {
        addDatetime();
    }
}

function addDatetime() {
    var panel = generatePanel("Horloge", $("<div>").addClass("clock-container"));
    insertWidget("datetime", panel);
    launchClockLoop();
    updateClocks();
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