// NOTE: Make sure to not reuse any variable names from class_data.js as it is "global"
var grid_rows = 16
var grid_cols = 16
var wide = (1500 - 9) / grid_cols;
var tall = (1500 - 11) / grid_rows; // set the square dimensions. this can be incorporated into the grid() function with 16 replaced by 'original'
current_class = "class1";




var image = false;
var globalimage;
var original_sq;
var start_x;
var start_y;
var moved_x;
var moved_y;
var prev_pos_x;
var prev_pos_y;

function grid(x, y) {
	console.log("************************")
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
  console.log("############################")
  if (is_participation_mode) {
    console.log("############################")
  }
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


		Util.one("#attend_button").addEventListener("click", function(){
			attend_button = document.getElementById('attend_button');
			attend_button.classList.remove('inactive');
			attend_button.classList.add('active');
			participate_button = document.getElementById('participate_button');
			participate_button.classList.remove('active');
			participate_button.classList.add('inactive');
			is_participation_mode = false;
		});

		Util.one('#participate_button').addEventListener("click", function (event){
			participate_button = document.getElementById('participate_button');
			participate_button.classList.remove('inactive');
			participate_button.classList.add('active');
			attend_button = document.getElementById('attend_button');
			attend_button.classList.remove('active');
			attend_button.classList.add('inactive');
			is_participation_mode = true;
		});

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

  "mousemove": function(e){
    e.preventDefault();
      if (image){
        console.log("moving")
        var dx = e.pageX - start_x;
        var dy = e.pageY - start_y;
        moved_x = e.pageX;
        moved_y = e.pageY;
        prev_pos_x = prev_pos_x + dx;
        prev_pos_y = prev_pos_y + dy;
        console.log("prev_pos_x", dx);
        console.log("prev_pos_y", dy);
        console.log("globalimage", globalimage);
        globalimage.style.top = dy + "px";
        globalimage.style.left = dx + "px";
        globalimage.style.zIndex = 1;
        globalimage.classList.add("pointer-events-none");
      }
  },


  "mouseup": function(e){
    console.log(is_participation_mode);
    e.preventDefault();
    console.log("mouseup", e.toElement);
    var dx = e.pageX - start_x;
    var dy = e.pageY - start_y;
    if (image){
      globalimage.style.top = 0 + "px";
      globalimage.style.left = 0 + "px";
      globalimage.style.zIndex = 1;
      var divsq = e.toElement;
      if (divsq == globalimage){
        var counter = globalimage.counter;
        if ((counter == 0) && (!is_participation_mode)){
          divsq.classList.add("add-present-border");

        } else if ((counter == 1) && (!is_participation_mode)){
          divsq.classList.remove("add-present-border");
          divsq.classList.add("add-late-border");
        } else if ((counter == 2) && (!is_participation_mode)){
          divsq.classList.remove("add-late-border");
          divsq.classList.add("add-absent-border");
        } else if ((counter == 3) && (!is_participation_mode)){
          counter = -1;
          divsq.classList.remove("add-absent-border");

        }
        counter += 1;
        globalimage.counter = counter;
      }
      if (divsq.id.includes("div_")){
        divsq.appendChild(globalimage);
      } else if (divsq.id.includes("img")){
        original_sq.appendChild(divsq);
        divsq.parentElement.appendChild(globalimage);
      }

      //var origdivsq = getDivAt(start_x, stary_y);

      //origdivsq.appendChild(newimage);

      globalimage.classList.remove("pointer-events-none");
    }
    image = false;
  }




});


function load_listview(){
	var current = document.getElementById("gridview");
	var buttong = document.getElementById("grid_icon");

	if(current.name == "gridview"){
		console.log(buttong)
		buttong.className = "glyphicon glyphicon-th";
		document.getElementById("participate_button").className = "active";
		document.getElementById("attend_button").className = "inactive";
		current.data = "listview.html";
		current.name = "listview"
		current.style.padding = "20px 180px";
	}
	else{
		alert("You are in Grid View. To interact with students, you can drag, drop and mark attendance.")
		console.log("list")
		console.log(buttong)

		buttong.className = "glyphicon glyphicon-th-list";
		document.getElementById("participate_button").className = "inactive";
		document.getElementById("attend_button").className = "active";
		current.data = "gridview.html";
		current.name = "gridview"
		current.style.padding = "0px";
	}




}

function loadHome() {
	top.location ="index.html";
}


function changeView(){
	console.log("changeView()");
	document.getElementByClassName("bottom").innerHTML = " <object id=\"listview\" type=\"text/html\" data=\"listviewattendance.html ></object> "
}
