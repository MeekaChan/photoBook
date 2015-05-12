/**
 * Created by Emilie on 28/04/2015.
 */

// Global variables - need to keep state within the Web App
var searchTerms;
var pageNumber;

var navLeftButton;
var navRightButton;

$(document).ready(function() {

    //localStorage.clear();

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

    $("#my_photo_book").turn({
        width: 800,
        height: 567,
        autoCenter: true
    });

    /*FLIPBOOK*/
    // Set pageNumber to 1
    pageNumber = 1;

    //Add a photo container to the first page:
    $('.pages').append("<div id='photo-container-" + pageNumber + "'></div>");

    // Add empty photo <divs>
    for (var i = 0; i < 3; i++) {
        $('<div />').attr('id', 'photo-' + i).addClass('photo').appendTo('#photo-container-' + pageNumber);
    }

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

    console.log(localStorage["localImages"]);

    navLeftButton = $('.nav-left');
    navRightButton = $('.nav-right');

    navLeftButton.addClass('fade-out');
    navRightButton.addClass('fade-out');

    /*$("body").on("mousedown", function() {
        console.log("Hello Foo");
    })*/

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

        loadPhotos();

        //Open photo album
        $("#flipbook").turn("next");
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

    /*$('.nav-right').click(function() {
        pageNumber++;
        loadPhotos();
    });*/

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
            photoString+="<img src='"+storedImages[i]+"'>";
        }
        console.log(photoString);
        $('#storagePic').append(photoString);
    } else {
        console.log("No stored images");
    }

    //var dataImage = localStorage.getItem('imgData');
    //bannerImg = document.getElementById('storagePic');
    //$(bannerImg).append("<img src='"+dataImage+"'>");
    //console.log(storedImages);
    //bannerImg.src = "data:image/png;base64," + dataImage;

});

//Create empty array
var localImages = [];
if (localStorage["localImages"]) {
    localImages = JSON.parse(localStorage["localImages"]);
}

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
    //$('.photo').addClass('draggable');
    //console.log($('div.photo img'));

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
            //console.log(i);
            //console.log(imgURL);

            // Pre-cache image
            $('<img />').attr({'src': imgURL, 'data-image-num': i}).load(function() {
                console.log('image loaded');
                var imageDataNum = $(this).attr('data-image-num');
                //$('#photo-' + imageDataNum).css('background-image', 'url(' + imgURL + ')').removeClass('fade-out').addClass('fade-in');
                $('#photo-' + imageDataNum).append("<img class='draggable' id='img"+i+"' src='" + imgURL + "' >").removeClass('fade-out').addClass('fade-in');
            });
        });

        $('body').on("mousedown", function() {

        var dragSourceElement;

        $(".draggable").attr('draggable', 'true')
            .bind('dragstart', function() {
            dragSourceElement = this;
                //console.log("HERE!" + this);
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
                //alert("Picture added to MyPhotoBook!");
                //alert(dragSourceElement);
                //alert(dragSourceElement.getAttribute('id'));
                storagePhoto = dragSourceElement.getAttribute('src');
                //imgData = getBase64Image(storagePhoto);
                //add image to array
                console.log(localImages);
                localImages.push(storagePhoto);
                console.log(localImages);
                //Save the array to local storage
                localStorage["localImages"] = JSON.stringify(localImages);
                //localStorage.setItem("imgData", storagePhoto);
                //console.log(storagePhoto);

            });
        });
        });
    });
}

/*function getBase64Image(img) {
    // Create an empty canvas element
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    // Copy the image contents to the canvas
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    // Get the data-URL formatted image
    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}*/