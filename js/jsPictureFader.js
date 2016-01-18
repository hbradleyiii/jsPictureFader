
    ///////////////////////////////////
    //    jsPictureFader 1.0         //
    //    Harold Bradley III         //
    //    Aug 28, 2010               //
    ///////////////////////////////////

// Style any number of images to be directly on top of one another.
// Place them in a block level element with an id of "jsPictureFader".
// Place reference to this file right above the closing HTML tag.
// No dependencies.

var jsPictureFader = {

    init: function() { // Init sets up pictures array, initializes zIndex, creates a closure so init() variables are available
        var pictures = document.getElementById("jsPictureFader").getElementsByTagName('img'); // pictures is an array of img elements
        var curOpacity = 100; // Opacity of the top image

        for (var i = pictures.length-1; i > 0; i--){
            pictures[i].style.zIndex = i+500; // Set zIndex explicitly, (well above 0)
        } // zIndex - higher numbers are on top (higher array index is also on top)

        var changeImg = function(){ // Set inside for closure; needs variables in init().
            pictures = jsPictureFader.changeOrder(pictures);
            setTimeout(changeImg, 3000); // Reset timer for infinite loop
        }; // This is useful for testing purposes, but must be changed manually

        var fadeImg = function() { // Set inside for closure; needs variables in init().
            if (curOpacity > 0) { // If not invisible, keep fading...
                curOpacity = curOpacity - 5; // Change opacity by 5%
                jsPictureFader.setOpacity(pictures[pictures.length-1], curOpacity); // Change opacity of top image
                setTimeout(fadeImg, 25); // Reset timer to quickly repeat the fade
            } else { // Fading is complete, so continue process
                pictures = jsPictureFader.changeOrder(pictures); // Put top image on bottom, (move other images up)
                curOpacity = 100; // Reset current Opacity to 100
                jsPictureFader.setOpacity(pictures[0], 100); // Make bottom image (previously top) opaque
                setTimeout(fadeImg, 3000); // Reset timer to repeat entire process
            }
        };

        setTimeout(fadeImg, 3000);
    },


    changeOrder: function(pictures) { // Changes the zindex AND returns a reordered array. Top goes on bottom. Everything else moves up.
        var newPictures = new Array();
        var upIndex = pictures[pictures.length-1].style.zIndex;
        pictures[pictures.length-1].style.zIndex = pictures[0].style.zIndex; // Put the top image on the bottom
        newPictures[0] = pictures[pictures.length-1]; // top on bottom of new array
        for (var m = pictures.length-2; m >= 0; m--){ // Start with !second! from top image & work down, moving each up.
            pictures[m].style.zIndex = upIndex; // Set zIndex of current to previous
            upIndex = upIndex - 1;
            newPictures[m+1] = pictures[m];
        }

        return newPictures;
    },

    setOpacity: function(curElement, opacityLevel) {
        curElement.style.opacity = opacityLevel / 100; // Cross Browser compatible
        curElement.style.filter = 'alpha(opacity='+opacityLevel+')';
    },

};

jsPictureFader.init();
