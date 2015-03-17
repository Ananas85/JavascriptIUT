$(document).ready(function(){
    $("#object" ).animate({
        top: "30px",
        left: "30px"
    },2000).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    $("#close_message" ).on("click", function(){
        $("#object" ).fadeOut("slow");
    });
});