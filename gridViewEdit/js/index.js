grid_size = 10;

current_class = "class1";
var studentID = 0


  var student_list_names =
  {
    //"id: firstname_lastname"
  }
  var student_list_emails = {
      // student: emails;

  };

  var student_list_images = {
    // student: images;

  };



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


  function clickChange(){
    $(".hide").on('change', function(e) {
  console.log("Changed")
});
  }

  function setDraggable(){
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
  }


  document.addEventListener('DOMContentLoaded', function() {
      clickChange()
      addStudentImages();
      setDraggable();

  }, false);



$(document).ready(function() {

var $TABLE = $('#table');


data = class_to_student['class1'];

         drawTable(data);
function drawTable(data) {


    for (var i = 0; i < data.length; i++) {
        drawRow(data[i],i);
    }
}

function drawRow(rowData,i) {
    var row = $("<tr />");
    $("#personDataTable").append(row); //this will append tr element to table... keep its rence for a while since we will add cels into it

   var fname = "'" + rowData + "'";
   var curchange = "readURL(this," + fname + ");";
   console.log(curchange);
   row.append($('<td contenteditable="true" class="info">' + rowData.split("_")[0] +'</td>'));
   row.append($('<td contenteditable="true" class="info" >' + rowData.split("_")[1]+' </td>'));
   row.append($('<td contenteditable="true" class="info">' + rowData.split("_")[0] +"@mit.edu"  +'</td>'));
   row.append($('<td> <input type="file"' + 'onchange="' + curchange + '"/></td>'));
   row.append($('<td><span class="table-remove fa fa-trash fa-2x"></span></td></tr></table>'));
}



$('.table-add').click(function () {
  var $clone = $TABLE.find('tr.hide').clone(true).removeClass('hide table-line');
  $clone.find("input.datepicker").each(function(){
    $(this).attr("id", "").removeData().off();
    $(this).find('.add-on').removeData().off();
    $(this).find('input').removeData().off();
    $(this).timepicker({defaultTime:'16:20', minuteStep: 1, showMeridian: false});
  });

  $TABLE.find('table').append($clone).find("input.datepicker").addClass('datepicker');

});

$('.table-remove').click(function () {
  $(this).parents('tr').detach();
});



})


 function readURL(input, name) {
     var reader = new FileReader(); //create reader
     console.log(input)
       reader.onload = function() { //attach onload
         //do something with the result

         try {

         console.log(reader.result);
         localStorage[name] = reader.result; //saved to localStorage
         add_student_to_grid(name);
       }
       catch(e){
         console.log(e);
         alert(e);
       }


       };
       var file = input.files[0];
       reader.readAsDataURL(file); //trigger onload function



}



function add_student_to_grid(name){


  var curStudentID = studentID +1;
  studentID = curStudentID           // Create a new image.

  //add if id is not present in student_list_names.keys
  if (! (studentID in student_list_names)) {
    console.log("newKeyadded");
    student_list_names[studentID] = name;
    console.log(student_list_names)
  }


  //called on changes() or we update the info
  else{

  }

  //if image has been uploaded
  var firstName = name.split("_")[0];
  var lastName = name.split("_")[1];

  var student_name = firstName.charAt(0).toUpperCase() + firstName.slice(1) + " " + lastName.charAt(0).toUpperCase;
  var student_img_src = localStorage[name];
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
  name.innerHTML = firstName.charAt(0).toUpperCase() + firstName.slice(1) + " " + lastName.charAt(0).toUpperCase();
  name.setAttribute("class", "name");
  table.setAttribute("class", "studentTable");
  drag_box.appendChild(table);
  drag_box.appendChild(name);
  table.appendChild(student_img);
  student_img.src = student_img_src;
  src.appendChild(drag_box);

  setDraggable();

}

    //----------



  // Stores the JavaScript object as a string
  localStorage.setItem("student_list_emails", JSON.stringify(student_list_emails));
  localStorage.setItem("student_list_images", JSON.stringify(student_list_images));
  localStorage.setItem("student_list_names", JSON.stringify(student_list_names));

  // Parses the saved string into a JavaScript object again
  JSON.parse(localStorage.getItem("student_list_emails"));
  JSON.parse(localStorage.getItem("student_list_images"));
  JSON.parse(localStorage.getItem("student_list_names"));
