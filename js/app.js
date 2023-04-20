$(document).ready(() => {

    $(".inicio").click(function() {
        $(".fondo").hide();
        $(".bienvenido").show();
    });

    $(".continuar").click(function() {
        $(".fondo").hide();
        $(".bienvenido").show();
    });

    $(".continuar").click(()=> {
        window.location.href = "menu.html";
     }) 

});