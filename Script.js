/**
 * Created by Emilie on 28/04/2015.
 */

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

    /*ORIGINAL BACKGROUND BUTTON*/
    /*$("#concrete").click(function() {
        $("html").css("background-image", "url(" + allImages[current] + ")").css("background-repeat");
                
        current = (current++ < allImages.length - 1) ? current : 0 ;
    });*/
});

// Global variables - need to keep state within the Web App
var searchTerms;
var pageNumber;

var navLeftButton;
var navRightButton;

$(document).ready(function() {

    // Add empty photo <divs>
    for (var i = 0; i < 10; i++) {
        $('<div />').attr('id', 'photo-' + i).addClass('photo').appendTo('#photo-container');
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

    // Fade out existing photos
    $('.photo').addClass('fade-out');

    // Show loading bar
    /*$('#loading-bar').css('visibility', 'visible');*/

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

        // Hide loading bar
        //$('#loading-bar').css('visibility', 'hidden');

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
    });
}
