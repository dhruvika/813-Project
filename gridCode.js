// NOTE: Make sure to not reuse any variable names from class_data.js as it is "global"
var grid_rows = 10
var grid_cols = 10
var wide = (600 - 9) / grid_cols;
var tall = (600 - 11) / grid_rows; // set the square dimensions. this can be incorporated into the grid() function with 16 replaced by 'original'
current_class = "class1";

function grid(x, y) {
  var original = x,
    y = y;
  $("#main").empty(); // empty and restart
  $("#main").width(wide * (original + 1));

  var current_col = 0;
  var current_row = 0;
  var main_div = document.getElementById('main');
  for (var i = 0; i < original * y; i++) {

    var square = document.createElement('div');
    square.classList.add('squares');
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


// Attaching events on document because then we can do it without waiting for
// the DOM to be ready (i.e. before DOMContentLoaded fires)
Util.events(document, {
  // Final initalization entry point: the Javascript code inside this block
  // runs at the end of start-up when the DOM is ready
  "DOMContentLoaded": function() {
    grid(16, 16); // starting dimension
    addStudentImages();
  }
});

