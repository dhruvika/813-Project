
grid_size = 10;
var image;
var globalimage;
var is_participation_mode = false;
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

startlistener();
//addStudentImages();

data = class_to_student['class1'];
});


function modify_distracted(val){
  var dist = document.getElementById('dist').value;
  var new_dist = parseInt(dist, 10) + val;

  if (new_dist < 0){
    new_dist = 0;
  }
  document.getElementById('dist').value = new_dist;
}

function modify_comment(val){
  var comment = document.getElementById('comment').value;
  var new_comment = parseInt(comment, 10) + val;

  if (new_comment < 0){
    new_comment = 0;
  }
  document.getElementById('comment').value = new_comment;
}


function modify_question(val){
  var question = document.getElementById('question').value;
  var new_question = parseInt(question, 10) + val;

  if (new_question < 0){
    new_question = 0;
  }
  document.getElementById('question').value = new_question;
}

function draw_all_students(){
  var curClass = getClass();

  class_list_names = JSON.parse(sessionStorage.getItem("class_list_names"))
  class_list_seats = JSON.parse(sessionStorage.getItem("class_list_seats"))

  console.log(class_list_seats);
  if (class_list_names == null){
     student_list_names = class_to_student["class"+getClass()];

  }
  else{
    if ((getClass() in class_list_names)){
      console.log("found class")
      student_list_names = JSON.parse(sessionStorage.getItem("class_list_names"))[getClass()];

    }
    else{
      student_list_names = class_to_student['class'+getClass()];
      console.log(student_list_names)

    }
  }
  
  if (class_list_seats != null){
    if ((getClass() in class_list_seats)){
      student_list_seats = JSON.parse(sessionStorage.getItem("class_list_seats"))[getClass()];
    }
    else{
      student_list_seats = []
    }
  }
  else{
    class_list_seats = {};
    student_list_seats = [];
  }

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
      //console.log("NEWIMAGE");
      var student_img_src;
      if (sessionStorage.getItem(name) == null) {
         student_img_src ="../" + student_to_img[student_name];
      }
      else{
         student_img_src = sessionStorage[name];

      }
      //console.log(student_img_src);
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
    console.log(sessionStorage);
    console.log(name.length)
    console.log(name.toString()==='eswar_a');
    console.log(sessionStorage.getItem("eswar_a"));
    if (sessionStorage.getItem(name) === null) {
       student_img_src ="../" + student_to_img[name];
       console.log("not in session")
    }
    else{
      console.log("inSession");
      console.log(sessionStorage);
       student_img_src = sessionStorage[name];

    }
    var student_name = firstName.charAt(0).toUpperCase() + firstName.slice(1) + " " + lastName.charAt(0).toUpperCase;
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
    //console.log(student_list_seats);
    if (id in student_list_seats){
      var positions = student_list_seats[id];
      //console.log(positions,id);
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
  //console.log("CURRENT CLASS IS: "+ sessionStorage.getItem("currentClass"));
  if (sessionStorage.getItem("currentClass") === null) {
    return "1";
  }
  return sessionStorage.getItem("currentClass");
}

function startlistener(){
  var span = document.getElementById("x");
  var modal = document.getElementById("myModal");
  span.onclick = function() { 
      modal.style.display = "none";
  }
  window.addEventListener("mousedown", function(e){
      e.preventDefault();
      console.log("mousedown", e);
      original_sq = e.toElement.parentElement.parentElement;
      globalimage = original_sq;
      if (globalimage.id.includes("gridBox")){
        image = true;
        console.log("found image");
      }
      

  }, false);
  window.addEventListener("mouseup", function(e){
    e.preventDefault();
    console.log("mouseup", e.toElement.parentElement.parentElement);
    if (image){
      var divsq = e.toElement.parentElement.parentElement;

      if (divsq == original_sq){
        document.getElementById("comment").value = 0;
        document.getElementById("question").value = 0;
        document.getElementById("dist").value = 0;
        console.log("divsq", divsq)
        for (var i=0; i < divsq.childNodes.length; i++){
          console.log("child",divsq.childNodes[i]);
          if (divsq.childNodes[i].className.includes("name")){
            console.log("gridName");
            document.getElementById("text").innerHTML = divsq.childNodes[i].innerHTML;
          } else if (divsq.childNodes[i].className.includes("studentTable")){
            console.log("studentImages");
            document.getElementById("popupimg").src = divsq.childNodes[i].childNodes[0].src;
          }
        }
        document.getElementById("")
        console.log("Click Detected Mouseup");
        var modal = document.getElementById("myModal");
        modal.style.display = "block";
      }
    }
    image = false;

  }, false);

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

      //$(" .text ").hide();

    })

    .on("mouseup", function(){
      $( this )
        .removeClass("grab-cursor")
        .removeClass("opac")

        // console.log(this.id);
        // console.log(this.style.left);
        student_list_seats[this.id.split("_")[0]] = [this.style.left, this.style.top];
        sessionStorage.setItem("student_list_seats", JSON.stringify(student_list_seats))
    });
}
