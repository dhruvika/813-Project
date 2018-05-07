
grid_size = 10;
  var student_list_names =
  {
    //"id: firstname_lastname"
  }


  var student_list_seats = {
    // student: images;

  };


    var student_list_images = {
      // student: images;

    };

    var student_list_grid_name = {
          // student: images;

    };

$(document).ready(function() {
draw_all_students();

//startlistener();
//addStudentImages();


data = class_to_student['class1'];
});



function draw_all_students(){
  var curClass = getClass();
  student_list_names = JSON.parse(sessionStorage.getItem("student_list_names"));
  student_list_seats = JSON.parse(sessionStorage.getItem("student_list_seats"))
  console.log(student_list_seats);
  for (var key in student_list_names){
    console.log(student_list_names[key])
    add_student_to_grid(student_list_names[key],key);
  }

  //addStudentImages();
  //

}


function add_student_to_grid(name,id, newImage=true){

  var curStudentID = id         // Create a new image.
  //console.log(name);
  //add if id is not present in student_list_names.keys

    //student_list_names[id] = name;



  //called on changes() or we update the info


  if (id in student_list_images){
    if (newImage){
      var student_img_src = sessionStorage[name];
      console.log(student_img_src);
      student_img = student_list_images[id]
      student_img.src = student_img_src;
    }
    //console.log("updating grid");

    name = student_list_grid_name[id]
    var firstName = student_list_names[id].split("_")[0];
    var lastName = student_list_names[id].split("_")[1];
    name.innerHTML = firstName.charAt(0).toUpperCase() + firstName.slice(1) + " " + lastName.charAt(0).toUpperCase();
  }

  //if image has been uploaded
  else{
    var firstName = student_list_names[id].split("_")[0];
    var lastName = student_list_names[id].split("_")[1];

    var student_name = firstName.charAt(0).toUpperCase() + firstName.slice(1) + " " + lastName.charAt(0).toUpperCase;
    var student_img_src = sessionStorage[name];
    //console.log(student_img_src)
    //console.log(sessionStorage);
    student_img = document.createElement('img');
    drag_box = document.createElement('div');
    drag_box.setAttribute("class", "box")
    student_img.style.top = 0 + "px";
    student_img.style.left = 0 + "px";
    student_img.style.position = "relative";
    student_img.counter = 0;
    student_img.setAttribute("class", "studentImages");
    var src = document.getElementById("contain");
    var table = document.createElement("div");
    var name = document.createElement("div");
    name.setAttribute("id", "gridName" + id.toString());
    name.innerHTML = firstName.charAt(0).toUpperCase() + firstName.slice(1) + " " + lastName.charAt(0).toUpperCase();
    name.setAttribute("class", "name");
    table.setAttribute("class", "studentTable");
    drag_box.setAttribute("id", "gridBox" +id.toString());
    if (id in student_list_seats){
      var positions = student_list_seats[id];
      console.log(positions,id);
      drag_box.style.left = positions[0];
      drag_box.style.top = positions[1];

    }
    drag_box.appendChild(table);
    drag_box.appendChild(name);
    table.appendChild(student_img);
    student_img.src = student_img_src;
    src.appendChild(drag_box);

    setDraggable();
    student_list_images[id] = student_img;
    student_list_grid_name[id] = name;
  }

}

//=======Helpers
function getClass() {
  console.log("CURRENT CLASS IS: "+ sessionStorage.getItem("currentClass"));
  if (localStorage.getItem("username") === null) {
    return "1";
  }
  return sessionStorage.getItem("currentClass");
}

function setDraggable(){
  $(" .box ")
    .draggable({
       grid: [ grid_size, grid_size ]
     })
     .draggable("option", "containment", "parent")
     .draggable("option", "disabled", true)
    //.resizable({ grid: grid_size * 2 })


    .on("mousedown", function(){
      $( this )
        .removeClass("move-cursor")
        .addClass("grab-cursor")
        .addClass("ui-helper")
        .addClass("opac");

      //$(" .text ").hide();

    })

    .on("mouseup", function(){
      $( this )
        .removeClass("grab-cursor")
        .removeClass("opac")
        .addClass("move-cursor");
        console.log(this.id);
        console.log(this.style.left);
        student_list_seats[this.id.split("_")[0]] = [this.style.left, this.style.top];
        sessionStorage.setItem("student_list_seats", JSON.stringify(student_list_seats))
    });
}