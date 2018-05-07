grid_size = 10;

current_class = "class1";


var studentID = -1
var students = []

var class_list_names = {};
var class_list_seats = {};
var class_list_images = {};
var class_list_grid_name = {};

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



  //adds student images from class_data.js

  function addStudentImages(){

    console.log(getClass());
    var class_list = class_to_student["class"+getClass()];
    //console.log(class_to_student);
     class_list_names = JSON.parse(sessionStorage.getItem("class_list_names"))
     class_list_images = JSON.parse(sessionStorage.getItem("class_list_images"))
     class_list_seats = JSON.parse(sessionStorage.getItem("class_list_seats"))
     class_list_grid_name = JSON.parse(sessionStorage.getItem("class_list_grid_names"))

    if(class_list_names !=null){
      if (!(getClass() in class_list_names)){
        class_list_names[getClass()] = {}
      }
    }
    else{
        class_list_names = {};
        class_list_names[getClass()] = {}

    }

    if(class_list_images !=null){
      if (!(getClass() in class_list_images)){
        class_list_images[getClass()] = {}
      }
    }
    else{
        class_list_images = {};
        class_list_images[getClass()] = {}

    }

    if(class_list_seats !=null){
      if (!(getClass() in class_list_seats)){
        class_list_seats[getClass()] = {}
      }
    }
    else{
      class_list_seats = {}
      class_list_seats[getClass()] = {}
    }

    if(class_list_grid_name !=null){
      if (!(getClass() in class_list_grid_name)){
        class_list_grid_name[getClass()] = {}
      }
    }
    else {
      console.log(class_list_grid_name);
      class_list_grid_name = {}
      class_list_grid_name[getClass()] = {}

    }
    console.log(class_list_names);



    //
    // if (sessionStorage.getItem("class_list_names") === null) {
    //   class_list_names[getClass()] = {}
    //
    // }
    // else{
    //   class_list_names = JSON.parse(sessionStorage.getItem("class_list_names"));
    //   if (!(getClass() in class_list_names)){
    //     class_list_names[getClass()] = {}
    //   }
    //
    // }
    // if (sessionStorage.getItem("class_list_images") === null) {
    //   class_list_images[getClass()] = {}
    // }
    // else{
    //   class_list_images = JSON.parse(sessionStorage.getItem("class_list_images"));
    //
    // }
    // if (sessionStorage.getItem("class_list_seats") === null) {
    //   class_list_seats[getClass()] = {}
    // }
    // else{
    //   class_list_seats = JSON.parse(sessionStorage.getItem("class_list_seats"));
    //
    // }
    // if (sessionStorage.getItem("class_list_grid_names") === null) {
    //   class_list_grid_name[getClass()] = {}
    // }
    // else{
    //   class_list_grid_name = JSON.parse(sessionStorage.getItem("class_list_grid_name"));
    //
    // }
    var current_row = 0;
    var current_col = 0;
    for (var i = 0; i < class_list.length; i++){

        var student_name = class_list[i];
        console.log(student_to_img[student_name])
        var student_img_src = "../" + student_to_img[student_name];
        sessionStorage.setItem(student_name, student_img_src);

    }
    update_grid();
    console.log(class_list_names);
  }


  function clickChange(){
    $(".hide").on('change', function(e) {
  console.log("Changed")
});
  }

  function setDraggable(){
    $(" .box ")
      .draggable({
         grid: [ grid_size, grid_size ]
       })
       .draggable("option", "containment", "parent")
      //.resizable({ grid: grid_size * 2 })

      .on("mouseover", function(){
        $( this ).addClass("move-cursor")
      })

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
          console.log(typeof(this.id));
          console.log(this.style.left);
          var id = this.id;
          console.log(class_list_seats)
          class_list_seats[getClass()][id.split("_")[1]] = [this.style.left, this.style.top];
          console.log(class_list_seats);
          sessionStorage.setItem("class_list_seats", JSON.stringify(class_list_seats))
      });
  }

  function getClass() {
    console.log("CURRENT CLASS IS: "+ sessionStorage.getItem("currentClass"));
    if (sessionStorage.getItem("currentClass") === null) {
      return "1";
    }
    return sessionStorage.getItem("currentClass");
  }


  document.addEventListener('DOMContentLoaded', function() {
      clickChange()
      //addStudentImages();
      setDraggable();


  }, false);

function startlistener(){
  window.addEventListener("mousedown", function(e) {


    update_grid();

  }, false)
}




$(document).ready(function() {

var $TABLE = $('#table');
startlistener();
addStudentImages();
console.log(class_list_names);

var curClass = getClass();
console.log(getClass());
console.log(curClass);
data = class_to_student['class' + curClass];
console.log(class_list_names);



drawTable(data);



function drawTable(data) {


    for (var i = 0; i < data.length; i++) {
        drawRow(data[i]);
        //console.log("Adding students")
        add_student_to_grid(data[i], i);
    }
    update_grid();
}

function editing(x){
  console.log("")
}



function drawRow(rowData) {
    var row = $("<tr>");
    $("#personDataTable").append(row); //this will append tr element to table... keep its rence for a while since we will add cels into it

   curStudentID = studentID +1;
   studentID = curStudentID;
   students.push(studentID);
   var fid = "id=" + "_" + studentID.toString() + "fname";
   var lid = "id=" + "_" + studentID.toString() + "lname";
   var tid = "id=" + "_" + studentID.toString() + "trash"

    var fname = "'" + rowData + "'";
    var curchange = "readURL(this," + fname +","+ studentID.toString() +  ");";
   row.append($('<td onkeyup="changer()"contenteditable="true"' + fid + ' class="info">' + rowData.split("_")[0] +'</td>'));
   row.append($('<td onkeyup="changer()" contenteditable="true"' + lid + ' class="info" >' + rowData.split("_")[1]+' </td>'));
   row.append($('<td contenteditable="true" onkeyup="changer()" class="info">' + rowData.split("_")[0] +"@mit.edu"  +'</td>'));
   row.append($('<td> <input type="file"' + 'onchange="' + curchange + '"/></td>'));
   row.append($('<td ' + tid  +'name="table-remover"' +'><button  onclick="removeElement(this);" class="table-remove fa fa-trash fa-2x"></button></td></tr></table>'));
}



$('.table-add').click(function () {
  drawRow("firstname_lastname")
  // var $clone = $TABLE.find('tr.hide').clone(true).removeClass('hide table-line');


  // $TABLE.find('table').append($clone).find("input.datepicker").addClass('datepicker');

});

$('td[name=table-remover]').click(function () {
  var idRemove = $(this).context.parentElement.id.split("_")[0];
  for (var i = 0; i <students.length; i++){
    if (students[i]==idRemove){
      console.log(i);
      students.splice(i, 1);
    }
  }
  console.log(students);
  $(this).parents('tr').detach();

});



})

 function readURL(input, name, id) {
     var reader = new FileReader(); //create reader
     console.log(input)
       reader.onload = function() { //attach onload
         //do something with the result

         try {

         console.log(reader.result);
         sessionStorage[name] = reader.result; //saved to sessionStorage
         add_student_to_grid(name, id);
         update_grid();
       }
       catch(e){
         console.log(e);
         alert(e);
       }


       };
       var file = input.files[0];
       reader.readAsDataURL(file); //trigger onload function



}


function removeElement(elem){
  var idRemove = $(elem).context.parentElement.id.splice("_")[0];
  console.log(idRemove)
  for (var i = 0; i <students.length; i++){
    if (students[i]==idRemove){
      console.log(i);
      students.splice(i, 1);
    }
  }
  console.log(students);
  $(elem).parents('tr').detach();

}

function update_grid () {
  console.log(class_list_names);
  sessionStorage.setItem("default", JSON.stringify(class_list));

  console.log("updating grid");


  for (var i =0; i <= students.Length; i++){
    j = students[i]
    var fname = document.getElementById(j.toString() +"_" + "fname").innerHTML;
    var lname = document.getElementById(j.toString() +"_" +  "lname").innerHTML;

    var name =  fname + "_" + lname;

    if (j in class_list_images[getClass()]){

      add_student_to_grid(name, j, false)
    }
    else{
      studentID +=1;
      class_list_names[getClass()][studentID] = name;
      //class_list_images[getClass()][studentID] =

    }




  }
  console.log(class_list_names);
  sessionStorage.setItem("class_list_names", JSON.stringify(class_list_names));
  console.log(sessionStorage.getItem("class_list_names"));
}




function add_student_to_grid(name,id, newImage=true){

  var curStudentID = id         // Create a new image.

  //add if id is not present in student_list_names.keys
  console.log(class_list_names);
  class_list_names[getClass()][id] = name;
  console.log(class_list_names[getClass()]);




  //if image was uploaded
  if (id in class_list_images[getClass()]){
    if (newImage){
      var student_img_src = sessionStorage[name];
      console.log(student_img_src);
      student_img = class_list_images[getClass()][id]
      student_img.src = student_img_src;
    }
    //console.log("updating grid");

    name = class_list_grid_name[getClass()][id]
    var firstName = class_list_names[getClass()][id].split("_")[0];
    var lastName = class_list_names[getClass()][id].split("_")[1];
    name.innerHTML = firstName.charAt(0).toUpperCase() + firstName.slice(1) + " " + lastName.charAt(0).toUpperCase();
  }

  //if image has been uploaded
  else{
    var firstName = class_list_names[getClass()][id].split("_")[0];
    var lastName = class_list_names[getClass()][id].split("_")[1];

    var student_name = firstName.charAt(0).toUpperCase() + firstName.slice(1) + " " + lastName.charAt(0).toUpperCase;
    var student_img_src = sessionStorage[name];
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
    name.setAttribute("id", "gridName" + "_" + id.toString());
    name.innerHTML = firstName.charAt(0).toUpperCase() + firstName.slice(1) + " " + lastName.charAt(0).toUpperCase();
    name.setAttribute("class", "name");
    table.setAttribute("class", "studentTable");
    drag_box.setAttribute("id", "gridBox" +"_" + id.toString());
    student_list_seats = class_list_seats[getClass()];
    console.log(class_list_seats[getClass()]);
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
    class_list_images[getClass()][id] = student_img;
    class_list_grid_name[getClass()][id] = name;
  }

}

    //----------



  // Stores the JavaScript object as a string
  //sessionStorage.setItem("student_list_emails", JSON.stringify(student_list_emails));
  sessionStorage.setItem("class_list_images", JSON.stringify(class_list_images));
  sessionStorage.setItem("class_list_names", JSON.stringify(class_list_names));

  // Parses the saved string into a JavaScript object again
  JSON.parse(sessionStorage.getItem("class_list_emails"));
  JSON.parse(sessionStorage.getItem("class_list_images"));
  JSON.parse(sessionStorage.getItem("class_list_names"));
