/**
 * Created by Emilie on 28/04/2015.
 */

// Global variables - need to keep state within the Web App
var searchTerms;

//var pageNumber;
var navLeftButton;
var navRightButton;

//Create empty array
var localImages = [];
if (localStorage["localImages"]) {
    localImages = JSON.parse(localStorage["localImages"]);
}

$(document).ready(function() {

    //localStorage.clear();
    $('#my_photo_book').hide();
    $('.my-arrow').hide();

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

    $('#target').click(function(e) {

        e.preventDefault();
        if ($('#flipbook').is(':hidden')){
            /* Test */
            $('#flipbook').show('slow');
            $(this).attr('src',"Images/MyphotoBook/Myphotobook.jpg");
            $('#titleLabel').show();
            $('.my-arrow').hide();
            $('.flip-arrow').show();
            $(".red").css({"z-index": "1"});
        } else {
            $('#flipbook').hide('slow');
            $('.my-arrow').show();
            $(".red").css({"z-index": "0"});
        }
        if ($('#my_photo_book').is(':hidden')){
            $('#my_photo_book').show('slow');
            $(this).attr('src',"Images/MyphotoBook/redBook.jpg");
            $('#titleLabel').hide();
            $('.my-arrow').show();
            $('.flip-arrow').hide();
            $(".brown").css({"z-index": "1"});
        } else {
            $('#my_photo_book').hide('slow');
            $('.my-arrow').hide();
            $('.flip-arrow').show();
            $(".brown").css({"z-index": "0"});
        }
    });


    
    navLeftButton = $('.nav-left');
    navRightButton = $('.nav-right');

    //Only make keyframe animation no buttons once:
    navLeftButton.addClass('l_buttonAnimation');
    navRightButton.addClass('r_buttonAnimation');

    navLeftButton.removeClass('l_buttonAnimation');
    navRightButton.removeClass('r_buttonAnimation');


    



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

    loadPhotos();

    //Add a photo container to the first page:
    // $('.pages').append("<div id='photo-container-" + pageNumber + "'></div>");

    //console.log("Photo container added")

    //Add empty photo <divs>
    //var containerNumber = 1;
    //for (var i = 0; i < 61; i++) {
    //    if(i % 6 == 0){
    //            containerNumber++;
    //        }
    //   $('<div />').attr('id', 'photo-' + i).addClass('photo').appendTo('#photo-container-' + containerNumber);
    //}

    //console.log("Empty photo <div>s added");
  
    

    // Handle submit e by pressing 'enter'
    $("#search-form").submit(function(e) {

        console.log('form submitted');

        //Set pageNumber to 1
       // pageNumber = 1;

        // Stop the page from reloading
        e.preventDefault();

        // Make the flipbook appear when new search is commenced
        if ($('#flipbook').is(':hidden')) {
            $('#flipbook').show('slow');
            $('#my_photo_book').hide('slow');
            $("#titleLabel").show();
            $("#target").attr('src',"Images/MyphotoBook/myphotobook.jpg");
        }

        // Remove the 'visibility: hidden' CSS property
        // is executing for the first time

        /*
        if ($('.nav-button').css('visibility') == 'hidden') {
            $('.nav-button').css('visibility', 'visible');
        }

        */
        /* BRIEFLY COMMENT OUT:
         // Fade out nav buttons (as required)
         if (navLeftButton.hasClass('fade-in')) {
         navLeftButton.removeClass('fade-in').addClass('fade-out');
         }
         if (navRightButton.hasClass('fade-in')) {
         navRightButton.removeClass('fade-in').addClass('fade-out');
         }
         */
        // Get search terms
        searchTerms = $('#search-box').val();
        console.log(searchTerms);

        loadPhotos();

        $(".red").css({"z-index": "1"});
        $(".brown").css({"z-index": "0"});

        //Open photo album to correct page
        $("#flipbook").turn("page", 3);

        //Load new photos on new search:
        $( "#search-box" ).keypress(function() {
            $("#flipbook").turn("page", 1);
        });
    });

    // Handle submit event by clicking the search button
    $("#search_button").click(function() {
        $("#search-form").submit();
    });

    // Next flip button click
    $('.flip-arrow-right').click(function() {
        // pageNumber++;
        $("#flipbook").turn("next");
        loadPhotos();

    });

    // Next my button click
    $('.my-arrow-right').click(function() {
        /*Comment his out for now. Otherwise it decrements the page two times */
        //pageNumber++;
        $("#my_photo_book").turn("next");
        loadPhotos();
    });


    //Load photos when clicking/dragging corners (loads 24 pictures at a time)
    $("#flipbook").bind("turning", function(click, page, view) {
        loadPhotos();
     /*   
        if(page == 1){
            navLeftButton.removeClass('fade-in').addClass('fade-out');
        }
        */
    });

    //For my photobook
    $("#my_photo_book").bind("turning", function(click, page, view) {
        myPhotoImages();
     /*   
        if(page == 1){
            navLeftButton.removeClass('fade-in').addClass('fade-out');
        }
        */
    });

    // Prev flip button click
    $('.flip-arrow-left').click(function() {
            //if (pageNumber >= 1){
            //pageNumber--;
            loadPhotos();
            $("#flipbook").turn("previous");
        }
    );

    // Prev my button click
    $('.my-arrow-left').click(function() {
        // if (pageNumber > 1)
        /*Comment his out for now. Otherwise it decrements the page two times */
        //  pageNumber--;
        loadPhotos();
        $("#my_photo_book").turn("previous");
    });


    //Hover-over effect for search button: 
    $("#search_button, #clear").hover(function() {
            $(this).css("background-color", "#9E9595");
        },

        function() {
            $( this ).css( "background-color", "#746767" );
        });

    //Clear local storage button:
    $("#clear").click(function(){
        localStorage.clear();
    });

    myPhotoImages();   

});

function myPhotoImages(){
    if (localStorage["localImages"]) {
    var storedImages = JSON.parse(localStorage["localImages"]);
    console.log(storedImages);
    console.log(storedImages.length);
    var count = 0;
    var photoString = "";
    //var sizeStyling;
    for (i = 0; i < storedImages.length; i++) {
        photoString="<img src='"+storedImages[i]+"'>";
        $('#storagePic_'+i).html(photoString);
        count++;
        /*if(photoString.height() > photoString.width()) {
            $('#storagePic_'+i).addClass("portrait");
        } else {
            $('#storagePic_'+i).addClass("landscape");
        }*/
    }

    console.log($('.my_pic img').width());

    if($('.my_pic img').height() > $('.my_pic img').width()) {
        ($('.my_pic img').addClass("landscape"));
    } else if ($('.my_pic img').height() < $('.my_pic img').width()) {
        ($('.my_pic img').addClass("portrait"));
    }

    console.log(count);
    //console.log(photoString);
    //$('#storagePic').append(photoString);
    } else {
        console.log("No stored images");
    }
}

function loadPhotos() {

    // Hide / display arrow controls
/*
    if (navRightButton.hasClass('fade-out')) {
        navRightButton.removeClass('fade-out').addClass('fade-in');
    }
*/
    /*
     if (pageNumber < 1) {
     if (navLeftButton.hasClass('fade-in')) {
     navLeftButton.removeClass('fade-in').addClass('fade-out');
     }
     }
     */

    /* Add the "="" */
    //if (pageNumber == 1) {
        /*
    if (navLeftButton.hasClass('fade-out')) {
        navLeftButton.removeClass('fade-out').addClass('fade-in');
    }
    */
    // }

    if(searchTerms == null || searchTerms == "") {
        searchTerms = "random";
    }

    /* Comment this out */
    // Fade out existing photos
    // $('.photo').addClass('fade-out');

    // Mention JSON here
    $.getJSON('https://api.flickr.com/services/rest/?jsoncallback=?', {
        'method': 'flickr.photos.search',
        'api_key': '229833ad396e499afb4c9939fa3f40b6',
        'tags': searchTerms,
        //       'page': pageNumber,
        //       'per_page': '60',
        'format': 'json'

    }, function(data) {
        console.log(data);
        //console.log("Images loaded: " + data.photos.total);
        // jQuery loop
        $.each(data.photos.photo, function(i, photo) {
            var imgURL = 'http://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_n.jpg';

            // Pre-cache image
            $('<img />').attr({'src': imgURL, 'data-image-num': i}).load(function() {
                console.log('image loaded');
                var imageDataNum = $(this).attr('data-image-num');
                /* Removed fade in fade out here */
                $('#photo-' + imageDataNum).html("<img class='draggable' id='img"+i+"' src='" + imgURL + "' >");

            });
        });


        /*DRAG'N'DROP*/
        $(document).off('mousedown', '.draggable').on("mousedown", '.draggable', function() {
            var dragSourceElement;

            $(".draggable").attr('draggable', 'true').off('dragstart')
                .on('dragstart', function() {
                    console.log("dragStart");
                    dragSourceElement = this;
                    $(this).css({
                        'opacity': '0.5',
                        'box-shadow': '0px, 0px, 5px rgba(0, 0, 0, 1)'
                    });
                }).off('dragend').on('dragend', function() {
                    console.log("dragEnd");
                    dragSourceElement = this;
                    $(this).css({
                        'opacity': '1',
                        'box-shadow': 'none'
                    });
                });

            $('#target').on('dragover', function(event) {
                imageID = $(this).attr('id');
                //alert(imageID);
                event.preventDefault();
            });

            $(document).off('drop', '#target').on("drop", '#target', function() {
                event.preventDefault();
                //$(dragSourceElement).hide();
                //console.log("test");
                storagePhoto = dragSourceElement.getAttribute('src');
                //add image to array
                localImages.push(storagePhoto);
                //console.log("Storage photo "+storagePhoto);
                //console.log("Added photo to localstorage");
                //Save the array to local storage
                localStorage["localImages"] = JSON.stringify(localImages);
                alert("Picture added to MyPhotoBook!");
            });

        });
    });
}