// NOTE: Make sure to not reuse any variable names from class_data.js as it is "global"
var grid_rows = 16
var grid_cols = 16
var wide = (1500 - 9) / grid_cols;
var tall = (1500 - 11) / grid_rows; // set the square dimensions. this can be incorporated into the grid() function with 16 replaced by 'original'
current_class = "class1";


var absent_list;
var present_list;
var tardy_list;

var image = false;
var globalimage;
var original_sq;
var start_x;
var start_y;
var moved_x;
var moved_y;
var prev_pos_x;
var prev_pos_y;
// When the user clicks on <span> (x), close the modal




function grid(x, y) {
  var original = x,
    y = y;
  $("#main").empty(); // empty and restart
  $("#main").width(wide * (original + 1));

  var current_col = 0;
  var current_row = 0;
  var main_div = document.getElementById('main');
  var no_student = false;
  for (var i = 0; i < original * y; i++) {

    var square = document.createElement('div');
    square.classList.add('squares');
    if (no_student){ //any table that has no students should be disabled
      square.classList.add('pointer-events-none');
    }
    main_div.appendChild(square);
    if(current_col < grid_cols){
      square.id = "div_r"+current_row+"c"+current_col;
      current_col += 1;
    }
    else{
      current_row += 1;
      current_col = 0;
    }
  }

  var square = $(".squares");
  square.width(wide);
  square.height(tall);

  var side = square.eq(original - 1).position().left + square.width() + 2; // tighten the #main width
  $("#main").width(side);
}

function addStudentImages(){
  var class_list = class_to_student[current_class];
  var current_row = 0;
  var current_col = 0;
  for (var i = 0; i < class_list.length; i++){
    var student_name = class_list[i];
    var student_img_src = student_to_img[student_name];
    div = document.getElementById("div_r"+current_row+"c"+current_col);
    student_img = document.createElement('img');
    student_img.style.top = 0 + "px";
    student_img.style.left = 0 + "px";
    student_img.style.position = "relative";
    student_img.counter = 0;
    student_img.setAttribute("class", "studentImages");
    student_img.setAttribute("onclick", "createLightBox()")
    if(current_col < grid_cols){
      student_img.id = "img_r"+current_row+"c"+current_col;
      student_img.src = student_img_src;
      div.appendChild(student_img);
      current_col += 1;
    }
    else {
      current_row += 1;
      current_col = 0;
    }
  }
}

function createLightBox(){
  
}
// Attaching events on document because then we can do it without waiting for
// the DOM to be ready (i.e. before DOMContentLoaded fires)
Util.events(document, {
  // Final initalization entry point: the Javascript code inside this block
  // runs at the end of start-up when the DOM is ready
  "DOMContentLoaded": function() {
    grid(grid_rows, grid_cols); // starting dimension
    addStudentImages();

    var img_array = document.querySelectorAll("div_r");
    var span = document.getElementById("x");
    var modal = document.getElementById("myModal");
    span.onclick = function() { 
      modal.style.display = "none";
    }
  },


  "mousedown": function(e){
      e.preventDefault();
      console.log("mousedown", e);
      globalimage = e.target;
      if (globalimage.id.includes("img")){
        image = true;
        console.log("found image");

      }
      original_sq = globalimage.parentElement;
      console.log(globalimage);
      start_x = e.pageX;
      start_y = e.pageY;
      moved_x = e.pageX;
      moved_y = e.pageY;
      prev_pos_x = 0;
      prev_pos_y = 0;
  },


  "mouseup": function(e){
    console.log(is_participation_mode);
    e.preventDefault();
    console.log("mouseup", e.toElement);
    var dx = e.pageX - start_x;
    var dy = e.pageY - start_y;
    if (image){
      var divsq = e.toElement;
      if (divsq == globalimage){
        console.log("Click Detected Mouseup");
        var modal = document.getElementById("myModal");
        modal.style.display = "block";
        var modalImg = document.getElementById("imgTest");
        modalImg.src = "popup2.png";
      }
    }
    image = false;
  }
});