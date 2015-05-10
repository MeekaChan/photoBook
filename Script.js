/**
 * Created by Emilie on 28/04/2015.
 */

// Global variables - need to keep state within the Web App
var searchTerms;
var pageNumber;

var navLeftButton;
var navRightButton;

var dragSourceElement;

$(document).ready(function() {

    $("#table").click(function() {
        $("html").css("background-image", "url(Images/Background/wooden_tabletop_1012121.JPG)").css("background-size", "cover");
    });

    $("#concrete").click(function() {
        $("html").css("background-image", "url(Images/Background/wildtextures-concrete-wall-background.jpg)").css("background-size", "cover");
    });

    $("#grass").click(function() {
        $("html").css("background-image", "url(Images/Background/depositphotos_3258821-Grass-background---golf-field.jpg)").css("background-size", "cover");
    });

    $("#blank").click(function() {
        $("html").css("background", "#FFCDAA", "background-image", "url(none)").css("background-size", "cover");
    });

    $("#flipbook").turn({
        width: 800,
        height: 567,
        autoCenter: true
    });

    // Add empty photo <divs>
    for (var i = 0; i < 10; i++) {
        if (i<3){
            $('<div />').attr('id', 'photo-' + i).addClass('photo').appendTo('#photo-container-1');
        }
        else if (i<6 && i>2){
            $('<div />').attr('id', 'photo-' + i).addClass('photo').appendTo('#photo-container-2');
        }
        else if (i<10 && i>5){
            $('<div />').attr('id', 'photo-' + i).addClass('photo').appendTo('#photo-container-3');
        }
    }

    navLeftButton = $('.nav-left');
    navRightButton = $('.nav-right');

    navLeftButton.addClass('fade-out');
    navRightButton.addClass('fade-out');

    /*console.log('document loaded');
     // Remove the 'visibility: hidden' CSS property
     // is executing for the first time
     if ($('.nav-button').css('visibility') == 'hidden') {
     $('.nav-button').css('visibility', 'visible');
     }
     // Fade out nav buttons (as required)
     if (navLeftButton.hasClass('fade-in')) {
     navLeftButton.removeClass('fade-in').addClass('fade-out');
     }
     if (navRightButton.hasClass('fade-in')) {
     navRightButton.removeClass('fade-in').addClass('fade-out');
     }*/

    // Handle submit event
    $('#search-form').submit(function(e) {

        console.log('form submitted');

        // Stop the page from reloading
        e.preventDefault();

        // Remove the 'visibility: hidden' CSS property
        // is executing for the first time
        if ($('.nav-button').css('visibility') == 'hidden') {
            $('.nav-button').css('visibility', 'visible');
        }

        // Fade out nav buttons (as required)
        if (navLeftButton.hasClass('fade-in')) {
            navLeftButton.removeClass('fade-in').addClass('fade-out');
        }
        if (navRightButton.hasClass('fade-in')) {
            navRightButton.removeClass('fade-in').addClass('fade-out');
        }

        // Get search terms
        searchTerms = $('#search-box').val();
        console.log(searchTerms);

        // Set pageNumber to 1
        pageNumber = 1;

        loadPhotos();
    });

    // Next button click
    $('.nav-right').click(function() {
        pageNumber++;
        loadPhotos();
    });

    // Prev button click
    $('.nav-left').click(function() {
        if (pageNumber > 1)
            pageNumber--;
        loadPhotos();
    });
});

function loadPhotos() {

    // Hide / display arrow controls
    if (navRightButton.hasClass('fade-out')) {
        navRightButton.removeClass('fade-out').addClass('fade-in');
    }

    if (pageNumber == 1) {
        if (navLeftButton.hasClass('fade-in')) {
            navLeftButton.removeClass('fade-in').addClass('fade-out');
        }
    } else if (pageNumber > 1) {
        if (navLeftButton.hasClass('fade-out')) {
            navLeftButton.removeClass('fade-out').addClass('fade-in');
        }
    }

    // Add draggable class to photos
    $('.photo').addClass('draggable');

    // Fade out existing photos
    $('.photo').addClass('fade-out');

    // Mention JSON here
    $.getJSON('https://api.flickr.com/services/rest/?jsoncallback=?', {
        'method': 'flickr.photos.search',
        'api_key': '229833ad396e499afb4c9939fa3f40b6',
        'tags': searchTerms,
        'page': pageNumber,
        'per_page': '9',
        'format': 'json'
    }, function(data) {
        console.log(data);

        // jQuery loop
        $.each(data.photos.photo, function(i, photo) {
            var imgURL = 'http://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_n.jpg';

            console.log(imgURL);

            // Pre-cache image
            $('<img />').attr({'src': imgURL, 'data-image-num': i}).load(function() {
                console.log('image loaded');
                var imageDataNum = $(this).attr('data-image-num');
                $('#photo-' + imageDataNum).css('background-image', 'url(' + imgURL + ')').removeClass('fade-out').addClass('fade-in');
            });
        });

        $(".draggable").attr('draggable', 'true').bind('dragstart', function() {
            dragSourceElement = this;
            $(this).css({
                'opacity': '0.5',
                'box-shadow': '0px, 0px, 5px rgba(0, 0, 0, 1)'
            });
        });

        $(".draggable").attr('draggable', 'true').bind('dragstart', function() {
            dragSourceElement = this;
            $(this).css({
                'opacity': '1',
                'box-shadow': 'none'
            });
        });

        $('#target').each(function(){
            $(this).bind('dragover', function(event) {
                event.preventDefault();
            });

            $(this).bind('drop', function(event) {
                event.preventDefault();
                //$(dragSourceElement).hide();
                alert("Picture added to MyPhotoBook!");
            });
        });
    });
}