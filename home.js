
var currentlyActive;
var previousContent = "content1";
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


	function load_engagement() {

		for (i in classes) {
			console.log(i)
			if (document.getElementById("class" + classes[i]).checked){
				currentlyActive = classes[i];
				break
			}
		}

		window.location = "engagement.html?checked="+currentlyActive;
			}

	window.onload = function () {
		window.document.getElementById("class"+checked).checked = true;
		//document.getElementById("content"+checked).style.display = "block";

	}

	function add_new_class(){
		// Update class number and class list
		var class_num = classes.length + 1;
		classes.push(""+(class_num+1));

		// Create label and radio for new class
		var new_class_radio = document.createElement('input');
		new_class_radio.id = "class"+class_num;
		new_class_radio.type = "radio";
		new_class_radio.name = "tabs";

		var defaultText = 'Class Name Here';
		var new_class_label = document.createElement('label');
		new_class_label.style.backgroundColor = "purple";
		new_class_label.for = "class"+class_num;
		// new_class_label.classList.add("class_tabs");
		new_class_label.innerHTML = defaultText;
		new_class_label.contentEditable = true;
	
		new_class_label.addEventListener("keypress", function(e){
				var label = e.target;
				var key = e.which || e.keyCode;
				if(key == 13)label.contentEditable = false;
			});

		var tabs_element = document.getElementById("main_tabs");
		tabs_element.appendChild(new_class_radio);
		tabs_element.appendChild(new_class_label);

	}

	function classClick( classnum){
		console.log("clicked")
		var content = "content" + classnum;
		console.log(document.getElementById(content));
		document.getElementById(content).style["display"] = "flex";

		if(previousContent != null){
			document.getElementById(previousContent).style["display"] = "none";
		}
		previousContent = content;


	}

Util.events(document, {
	// Final initalization entry point: the Javascript code inside this block
	// runs at the end of start-up when the DOM is ready

	"click": function(e) {
		var target = e.target;
		var labels = Util.all("label");
		console.log(!(target.nodeName == "LABEL" || target.nodeName == "INPUT"))
		if(!(target.nodeName == "LABEL" || target.nodeName == "INPUT")){
			for(var i = 0; i < labels.length; i++){
				var label = labels[i];
				label.contentEditable = false;	
			}
		}
	}


});

