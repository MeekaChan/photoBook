/**
 * Created by Emilie on 28/04/2015.
 */

// Global variables - need to keep state within the Web App
var searchTerms;
var pageNumber;

var navLeftButton;
var navRightButton;

//Create empty array
var localImages = [];
if (localStorage["localImages"]) {
    localImages = JSON.parse(localStorage["localImages"]);
}

$(document).ready(function() {

    //localStorage.clear();

    /*BACKGROUND BUTTONS*/
    $("#table").click(function() {
        $("html").css("background-image", "url(Images/Background/wood_dark.jpg)").css("background-size", "cover");
    });

    $("#concrete").click(function() {
        $("html").css("background-image", "url(Images/Background/wildtextures-concrete-wall-background.jpg)").css("background-size", "cover");
    });

    $("#grass").click(function() {
        $("html").css("background-image", "url(Images/Background/a_grass_background.jpg)").css("background-size", "cover");
    });

    $("#blank-salmon").click(function() {
        $("html").css("background", "#FFCDAA", "background-image", "url(none)").css("background-size", "cover");
    });

    $("#blank-green").click(function() {
        $("html").css("background", "#B8E68A", "background-image", "url(none)").css("background-size", "cover");
    });

    /*INITIATE FLIPBOOK*/

    $("#flipbook").turn({
        width: 800,
        height: 567,
        autoCenter: true
    });

    $("#my_photo_book").turn({
        width: 800,
        height: 567,
        autoCenter: true
    });

    console.log("Flipbook created")

    // Set pageNumber to 1
    pageNumber = 1;

    //Add a photo container to the first page:
    $('.pages').append("<div id='photo-container-" + pageNumber + "'></div>");

    console.log("Photo container added")

    // Add empty photo <divs>
    for (var i = 0; i < 3; i++) {
        $('<div />').attr('id', 'photo-' + i).addClass('photo').appendTo('#photo-container-' + pageNumber);
    }

    console.log("Empty photo <div>s added");

    navLeftButton = $('.nav-left');
    navRightButton = $('.nav-right');

    navLeftButton.addClass('fade-out');
    navRightButton.addClass('fade-out');

    // Handle submit e by pressing 'enter'
    $("#search-form").submit(function(e) {

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

        loadPhotos();

        //Open photo album
        $("#flipbook").turn("next");
    });

    // Handle submit event by clicking the search button
    $("#search_button").click(function(e) {

        // Stop the page from reloading
        e.preventDefault();
        $("#search-form").submit();
    });

    // Next button click
    $('.nav-right').click(function() {
        //var currentPage = $("#flipbook").turn('page');
        pageNumber++;

        newContainerOdd = $("<div />");
        $("#flipbook").turn("addPage", newContainerOdd, (pageNumber+4));
        // $('<div />', {"id": "photo-container-" + (pageNumber + 4)}).appendTo('.p' + (pageNumber+4));

        //Create a photo container on the current page:
        //$(currentPage).append("<div id='photo-container-" + pageNumber + "'></div>");

        for (var i = 4; i < 7; i++) {
            $('<div />').attr('id', 'photo-' + i).addClass('photo').appendTo('#photo-container-' + pageNumber);
        }
        // 1) Find a way to dynamically assign the correct numbers to the photos inside the photo-containers (AND THE PHOTOCONTAINERS ALSO)
        // 2) Create two pages at a time (since two are displayed at the same time in the book)
        // 3) Make the different photo-# unique - aka do not change when loadPhotos()-function is called.
        $("#flipbook").turn("next");

        loadPhotos();
    });

    // Prev button click
    $('.nav-left').click(function() {
        if (pageNumber > 1)
            pageNumber--;
        loadPhotos();
        $("#flipbook").turn("previous");
    });

    if (localStorage["localImages"]) {
        var storedImages = JSON.parse(localStorage["localImages"]);
        console.log(storedImages);
        var photoString = "";
        for (i = 0; i < storedImages.length; i++) {
            photoString="<img src='"+storedImages[i]+"'>";
            console.log($('#storagePic_'+i));
            $('#storagePic_'+i).append(photoString);
        }
        console.log(photoString);
        //$('#storagePic').append(photoString);
    } else {
        console.log("No stored images");
    }

    /*----------------------Old local storage------------------------*/
    /*var dataImage = localStorage.getItem('imgData');
    bannerImg = document.getElementById('storagePic');
    $(bannerImg).append("<img src='"+dataImage+"'>");
    console.log(storedImages);
    bannerImg.src = "data:image/png;base64," + dataImage;*/
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

    // Mention JSON here
    $.getJSON('https://api.flickr.com/services/rest/?jsoncallback=?', {
        'method': 'flickr.photos.search',
        'api_key': '229833ad396e499afb4c9939fa3f40b6',
        'tags': searchTerms,
        'page': pageNumber,
        'per_page': '3',
        'format': 'json'
    }, function(data) {
        console.log(data);

        // jQuery loop
        $.each(data.photos.photo, function(i, photo) {
            var imgURL = 'http://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_n.jpg';

            // Pre-cache image
            $('<img />').attr({'src': imgURL, 'data-image-num': i}).load(function() {
                console.log('image loaded');
                var imageDataNum = $(this).attr('data-image-num');
                $('#photo-' + imageDataNum).append("<img class='draggable' id='img"+i+"' src='" + imgURL + "' >").removeClass('fade-out').addClass('fade-in');
            });
        });

        $('body').on("mousedown", function() {

            var dragSourceElement;

            $(".draggable").attr('draggable', 'true')
                .bind('dragstart', function() {
                dragSourceElement = this;
                $(this).css({
                    'opacity': '0.5',
                    'box-shadow': '0px, 0px, 5px rgba(0, 0, 0, 1)'
                });

            }).bind('dragend', function() {
                dragSourceElement = this;
                $(this).css({
                    'opacity': '1',
                    'box-shadow': 'none'
                });
            });

            $('#target').each(function(){
                $(this).bind('dragover', function(event) {
                    imageID = $(this).attr('id');
                    //alert(imageID);
                    event.preventDefault();
                });

                $(this).bind('drop', function(event) {
                    event.preventDefault();
                    //$(dragSourceElement).hide();
                    alert("Picture added to MyPhotoBook!");
                    console.log("test");
                    storagePhoto = dragSourceElement.getAttribute('src');
                    //add image to array
                    localImages.push(storagePhoto);
                    console.log("Added photo to localstorage");
                    //Save the array to local storage
                    localStorage["localImages"] = JSON.stringify(localImages);
                });
            });
        });
    });
}