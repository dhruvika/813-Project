var wide = (780 - 15) / 16,
tall = (780 - 17) / 16; // set the square dimensions. this can be incorporated into the grid() function with 16 replaced by 'original'

function grid(x, y) {
  var original = x,
    y = y;
  $("#main").empty(); // empty and restart
  $("#main").width(wide * (original + 1));

  for (var i = 0; i < original * y; i++) {

    $("<div class='squares'></div>").appendTo('#main');
  }

  var square = $(".squares");
  square.width(wide);
  square.height(tall);

  var side = square.eq(original - 1).position().left + square.width() + 2; // tighten the #main width
  $("#main").width(side);

  $('.squares').hover(
    function() {
      $(this).addClass('hover-general');
    }
  )
}

function gridq() {
  $('.squares').removeClass('hover-general');
  $('div').remove('.squares');

  var newgrid = prompt("How many squares on each side?");
  var widthscreen = 192;

  if (newgrid > 0) {
    grid(newgrid, newgrid);
  }
}

// Attaching events on document because then we can do it without waiting for
// the DOM to be ready (i.e. before DOMContentLoaded fires)
Util.events(document, {
  // Final initalization entry point: the Javascript code inside this block
  // runs at the end of start-up when the DOM is ready
  "DOMContentLoaded": function() {
    grid(16, 16); // starting dimension
  }
});

