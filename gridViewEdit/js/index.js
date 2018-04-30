grid_size = 10;

current_class = "class1";



  //adds student images from class_data.js

  function addStudentImages(){
    var class_list = class_to_student[current_class];
    var current_row = 0;
    var current_col = 0;
    for (var i = 0; i < class_list.length; i++){
      var student_name = class_list[i];
      console.log(student_name)
      var student_img_src = "../" + student_to_img[student_name];
      student_img = document.createElement('img');
      drag_box = document.createElement('div');
      drag_box.setAttribute("class", "box")
      student_img.style.top = 0 + "px";
      student_img.style.left = 0 + "px";
      student_img.style.position = "relative";
      student_img.counter = 0;
      student_img.setAttribute("class", "studentImages");
      //student_img.setAttribute("onclick", "createLightBox()")
      var src = document.getElementById("contain");
      var table = document.createElement("div");
      var name = document.createElement("div");

      //get first Name + last name initial
      var firstName = "";
      var lastNameInit = "";
      for (var j=0; j< student_name.length; j++){
        if (student_name[j] == "_") {
          firstName = student_name.slice(0, j);
          lastNameInit = student_name[j+1];


        }
      }

      name.innerHTML = firstName.charAt(0).toUpperCase() + firstName.slice(1) + " " + lastNameInit.charAt(0).toUpperCase();
      name.setAttribute("class", "name");
      table.setAttribute("class", "studentTable");
      drag_box.appendChild(table);
      drag_box.appendChild(name);
      table.appendChild(student_img);
      student_img.src = student_img_src;

      src.appendChild(drag_box);

    }
  }


  document.addEventListener('DOMContentLoaded', function() {
      addStudentImages();
      $(" .box ")
        .draggable({ grid: [ grid_size, grid_size ] })

        .resizable({ grid: grid_size * 2 })

      	.on("mouseover", function(){
        	$( this ).addClass("move-cursor")
      	})

      	.on("mousedown", function(){
        	$( this )
            .removeClass("move-cursor")
            .addClass("grab-cursor")
            .addClass("opac");

        	//$(" .text ").hide();

      	})

      	.on("mouseup", function(){
        	$( this )
            .removeClass("grab-cursor")
            .removeClass("opac")
            .addClass("move-cursor");
      	});
  }, false);
