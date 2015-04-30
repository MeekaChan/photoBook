/**
 * Created by Emilie on 28/04/2015.
 
 COMMENT FROM ELINU5!!!!
 */

$(document).ready(function() {
    $("#table").click(function() {
	    $("html").css("background-image", "url(http://mayang.com/textures/Wood/images/Flat%20Wood%20Textures/wooden_tabletop_1012121.JPG)").css("background-size", "cover");
    });

    $("#concrete").click(function() {
        $("html").css("background-image", "url(http://www.precisionskateboard.com/blog/wp-content/uploads/2013/06/wildtextures-concrete-wall-background.jpg)").css("background-size", "cover");
    });

    $("#planks").click(function() {
        $("html").css("background-image", "url(http://benshabtay.com/3qchina1/Background1.jpg)").css("background-size", "cover");
    });

    $("#wooden").click(function() {
        $("html").css("background-image", "url(http://congregationalehouse.com/wp-content/uploads/2014/04/wooden-table-background-brqkvusf.jpg)").css("background-size", "cover");
    });

    $("#grass").click(function() {
        $("html").css("background-image", "url(http://static4.depositphotos.com/1004998/325/i/950/depositphotos_3258821-Grass-background---golf-field.jpg)").css("background-size", "cover");
    });

    $("#pergament").click(function() {
        $("html").css("background-image", "url(http://www.morocco-luxury-camps.com/wp-content/uploads/2012/11/paper-background.jpg)").css("background-size", "cover");
    });

    $("#paper").click(function() {
        $("html").css("background-image", "url(http://www.publicdomainpictures.net/pictures/20000/velka/rough-beige-paper-texture.jpg)").css("background-size", "cover");
    });

    $("#blank").click(function() {
        $("html").css("background", "#FFCDAA", "background-image", "url(none)").css("background-size", "cover");
    });

    /*$("#concrete").click(function() {
        $("html").css("background-image", "url(" + allImages[current] + ")").css("background-repeat");
                
        current = (current++ < allImages.length - 1) ? current : 0 ;
    });*/
});