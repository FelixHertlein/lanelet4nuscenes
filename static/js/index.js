window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE =
  "";
var NUM_INTERP_FRAMES = 240;


var interp_images = [];
function preloadInterpolationImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE + "/" + String(i).padStart(6, "0") + ".jpg";
    interp_images[i] = new Image();
    interp_images[i].src = path;
  }
}

function setInterpolationImage(i) {
  var image = interp_images[i];
  image.ondragstart = function () {
    return false;
  };
  image.oncontextmenu = function () {
    return false;
  };
  $("#interpolation-image-wrapper").empty().append(image);
}

$(document).ready(function () {
  // Check for click events on the navbar burger icon
  $(".navbar-burger").click(function () {
    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  });

  var options = {
    slidesToScroll: 1,
    slidesToShow: 1,
    loop: true,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 6000,
  };

  // Initialize all div with carousel class
  var carousels = bulmaCarousel.attach(".carousel", options);

  // Loop on each carousel initialized
  for (var i = 0; i < carousels.length; i++) {
    // Add listener to  event
    carousels[i].on("before:show", (state) => {
      //console.log(state);
    });
  }

  // Access to bulmaCarousel instance of an element
  var element = document.querySelector("#my-element");
  if (element && element.bulmaCarousel) {
    // bulmaCarousel instance is available as element.bulmaCarousel
    element.bulmaCarousel.on("before-show", function (state) {
      //console.log(state);
    });
  }

  /*var player = document.getElementById('interpolation-video');
    player.addEventListener('loadedmetadata', function() {
      $('#interpolation-slider').on('input', function(event) {
        console.log(this.value, player.duration);
        player.currentTime = player.duration / 100 * this.value;
      })
    }, false);*/
  //preloadInterpolationImages(); TODO

  $("#interpolation-slider").on("input", function (event) {
    //setInterpolationImage(this.value);
  });
  //setInterpolationImage(0);
  $("#interpolation-slider").prop("max", NUM_INTERP_FRAMES - 1);

  bulmaSlider.attach();
});


// multi content carousel

$( document ).ready(function() {

  const items = $(".multi-carousel .item")
  
  items.each(function() {
    const progress_bar = $(this).find(".item-progress");
    const contents = $(this).find(".item-content")
    const initial = contents.slice(0, -1)
  
    // setup silde fading out
    contents.each(function(index) {
      $(this).css("z-index", -index)
      $(this).css('animation-delay', 1 + index * 2 + 's');
    });

    initial.addClass("animate-item");

    // setup progress bar
    progress_bar.addClass("animate-progress")
    progress_bar.css('animation-duration', contents.length * 2 + 's');

    // refresh animations
    setInterval(() => {
      initial.removeClass("animate-item")
      progress_bar.removeClass("animate-progress")
      initial.width() // trigger reflow
      initial.addClass("animate-item")
      progress_bar.addClass("animate-progress")
    }, 2000 * contents.length);
  })


  // update slider navigation
  let nav_next = $(".slider-navigation-next")
  nav_next.parent().parent().parent().append(nav_next)
  nav_next.css("right", -50)

  let nav_prev = $(".slider-navigation-previous")
  nav_prev.parent().parent().parent().append(nav_prev)
  nav_prev.css("left", -50)
});