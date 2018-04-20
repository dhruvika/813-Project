
var currentlyActive;
classes = ["1","2","3","4"]


function getURLParam(name) {
  return new URL(location).searchParams.get(name);
}

var checked = getURLParam("checked") || "1"

function load_feedback() {

  for (i in classes) {
    console.log(i)
    if (document.getElementById("class" + classes[i]).checked){
      currentlyActive = classes[i];
      break
    }
  }

  window.location = "feedback.html?checked="+currentlyActive;

        }

   function load_settings() {

     for (i in classes) {
       console.log(i)
       if (document.getElementById("class" + classes[i]).checked){
         currentlyActive = classes[i];
         break
       }
     }

     window.location = "settings.html?checked="+currentlyActive;

      }



      window.onload = function () {
        document.getElementById("class"+checked).checked = true;
        //document.getElementById("content"+checked).style.display = "block";

      }
