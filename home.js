//TODO:
// Fix new tab clicking on Engagement (eswar)
// change contrast on select
// logo goes to home
// parent feedback email confirmation

var currentlyActive;
var previousContent = "content1";
var previousLabel = "label1";
classes = []
total_classes = 0;
var classesReady;
var radios;
//Format: button color, section color
class_colors = ["#6EA0C7" ,"#C76E6E", "#E6C578", "#98B879", "#B98FDE", "#FFB6C1"]

function getURLParam(name) {
	return new URL(location).searchParams.get(name);
}

var checked = getURLParam("checked") || "1";

function load_feedback() {

	for (i in classes) {
		if (document.getElementById("class" + classes[i]).checked){
			currentlyActive = classes[i];
			sessionStorage.setItem("currentClass", currentlyActive.toString());

			break
		}
	}

	window.location = "feedback.html?checked="+currentlyActive;

}



 function load_settings() {

	 for (i in classes) {
		 // console.log(i)
		 if (document.getElementById("class" + classes[i]).checked){
			 currentlyActive = classes[i];
			 sessionStorage.setItem("currentClass", currentlyActive.toString());
			 break
		 }
	 }

	 window.location = "settings.html?checked="+currentlyActive;

		}


	function load_engagement() {

		for (i in classes) {
			if (document.getElementById("class" + classes[i]).checked){
				currentlyActive = classes[i];
				sessionStorage.setItem("currentClass", currentlyActive.toString());
				break
			}
		}

		window.location = "engagement.html?checked="+currentlyActive;
			}

	window.onload = function () {

	}

	function classClick(classnum){
		console.log("Class Num: ", classnum)
		var content = "content" + classnum;
		if(previousContent != null && document.getElementById(previousContent) != null) {
			document.getElementById(previousContent).style["display"] = "none";
			for(var i=1; i<=classes.length; i++){
				if(i != classnum) {
					console.log("Lightening label: ", i)
					document.getElementById('label'+i).style.filter = "opacity(45%)";
					document.getElementById('label'+i).style.color = "black";
				}
			}
		}
		sessionStorage.setItem("currentClass", classnum.toString());
		console.log("Content: ", document.getElementById(content))
		var selected_content = document.getElementById(content);
		selected_content.style["display"] = "flex";
		selected_content.style.backgroundColor = class_colors[parseInt(classnum)-1];
		selected_content.style.filter = "opacity(100%)"
		var selected_label = document.getElementById('label'+classnum);
		selected_label.style.filter = "opacity(100%)";
		selected_label.style.color = "white";
		var selected_class = document.getElementById("class"+classnum);
		selected_class.checked = true;

		previousContent = content;
	}

	function add_new_class(classname){
		// Update class number and class list
		total_classes += 1;
		var class_num = total_classes;
		classes.push(""+(class_num));
		window.sessionStorage.setItem("classes", JSON.stringify(classes));
		window.sessionStorage.setItem("total_classes", JSON.stringify(total_classes));

		// Create label and radio for new class
		var new_class_radio = document.createElement('input');
		new_class_radio.id = "class"+class_num;
		new_class_radio.type = "radio";
		new_class_radio.name = "tabs";

		var defaultText = 'Class Name Here';
		var content = classname || defaultText;
		var new_class_label = document.createElement('label');
		new_class_label.style.backgroundColor = class_colors[parseInt(class_num)-1];

		new_class_label.htmlFor = "class"+class_num;
		new_class_label.contentEditable = false;
		new_class_label.id = "label"+class_num;

		child_label_tag = document.createElement('label');
		child_label_tag.id = "text"+class_num;
		child_label_tag.innerHTML = content;
		// child_label_tag.htmlFor = "class"+class_num;
		new_class_label.appendChild(child_label_tag);

		close_icon_div = document.createElement('div');
		close_icon_div.id = "remove"+class_num;
		close_icon = document.createElement('i');
		close_icon.classList.add("fa");
		close_icon.classList.add("fa-times");
		close_icon_div.appendChild(close_icon);
		new_class_label.appendChild(close_icon_div);

		var tabs_element = document.getElementById("main_tabs");
		tabs_element.appendChild(new_class_radio);
		tabs_element.appendChild(new_class_label);
		var page_tabs_html = document.getElementById("page_tabs").innerHTML;
		window.sessionStorage.setItem("tabs_code", page_tabs_html);

		add_new_section(class_num, 'body_home');
		classClick(class_num);

	}

	function add_new_section(class_num, page_type){

		var section_tag = document.createElement('section');
		section_tag.id = "content"+class_num;
		section_tag.style.backgroundColor = class_colors[parseInt(class_num)-1];

		var page_element = document.getElementById('page_sections');
		page_element.appendChild(section_tag);

		if(page_type == 'body_home'){

			var all_buttons_tag = document.createElement('div');
			all_buttons_tag.id = "allButtons";

			section_tag.appendChild(all_buttons_tag);

			var page_icons = {"Engagement": [load_engagement, "fa-star"],
												"Feedback": [load_feedback, "fa-comment-alt"],
												"Settings": [load_settings, "fa-wrench"]}

			for(option in page_icons){
				// var callback = page_icons[option][0];
				var icon = page_icons[option][1];
				var option_button = document.createElement('button');
				option_button.id = option;
				option_button.classList.add(option);

				all_buttons_tag.appendChild(option_button);

				var div_element = document.createElement('div');
				div_element.classList.add(option);
				option_button.appendChild(div_element);

				var icon_element = document.createElement('i');
				icon_element.classList.add(option);
				icon_element.classList.add('fas');
				icon_element.classList.add(icon);
				icon_element.classList.add('fa-4x');
				div_element.appendChild(icon_element);
				div_element.appendChild(document.createElement('br'));

				var heading_element = document.createElement('h2');
				heading_element.classList.add(option);
				heading_element.innerHTML = "<br>" + option;
				div_element.appendChild(heading_element);
			}

			checkChanges();
			checkEngagementButtons();
			checkFeedbackButtons();
			checkSettingsButtons();
			// addDeleteClick(class_num);

			var page_sections_html = document.getElementById("page_sections").innerHTML;
			window.sessionStorage.setItem(page_type+"_code", page_sections_html);

		}

		if(page_type == 'body_engagement'){
			//Edit section tag
			var object_element = document.createElement('object');
			object_element.id = "engagementCell";
			object_element.type = "text/html";
			object_element.data = "engage_template.html";
			section_tag.appendChild(object_element);

			// addDeleteClick(class_num);

			var page_sections_html = document.getElementById("page_sections").innerHTML;
			window.sessionStorage.setItem(page_type+"_code", page_sections_html);

		}

		if(page_type == 'body_feedback'){
			var object_element = document.createElement('object');
			object_element.id = "feedbackCell";
			object_element.type = "text/html";
			object_element.data = "parent_feedback.html";
			section_tag.appendChild(object_element);

			// addDeleteClick(class_num);

			var page_sections_html = document.getElementById("page_sections").innerHTML;
			window.sessionStorage.setItem(page_type+"_code", page_sections_html);
		}

		if(page_type == 'body_settings'){

			var object_element = document.createElement('object');
			object_element.id = "settingsCell";
			object_element.type = "text/html";
			object_element.data = "gridViewEdit/gridViewEdit.html";
			section_tag.appendChild(object_element);

			// addDeleteClick(class_num);

			var page_sections_html = document.getElementById("page_sections").innerHTML;
			window.sessionStorage.setItem(page_type+"_code", page_sections_html);
		}
}


	function delete_class(classnum){
		// Remove class number from classes
		for(i in classes){
			var cur_class = classes[i];
			if(cur_class == classnum) {
				var index = classes.indexOf(cur_class);
				classes.splice(index, 1);
			}
		}

		// Delete button and section
		var class_radio = document.getElementById("class"+classnum);
		class_radio.remove();
		var class_label = document.getElementById("label"+classnum);
		class_label.remove();
		var class_section = document.getElementById("content"+classnum);
		class_section.remove();

		// Save to session Storage
		var page_tabs_html = document.getElementById("page_tabs").innerHTML;
		window.sessionStorage.setItem("tabs_code", page_tabs_html);

		var page_sections_html = document.getElementById("page_sections").innerHTML;
		window.sessionStorage.setItem("sections_code", page_sections_html);

		window.sessionStorage.setItem("classes", JSON.stringify(classes));
		window.sessionStorage.setItem("total_classes", JSON.stringify(total_classes));
	}


function addDeleteClick(classnum){

	$('div[id*=remove'+classnum+']').on("click", function(e){
		var confirm = window.confirm("Are you sure you want to delete this class?");
			if(confirm){
				var classId = e.currentTarget.id;
				var classNum = classId[classId.length-1];
				var index = classes.indexOf(""+classnum);
				var focus_class = null;
				if (index > 0) focus_class = classes[index - 1];
				else focus_class = classes[index + 1]
				delete_class(classNum);
				classClick(focus_class);

			}
	});
}

function checkChanges(){
	$('input[name="tabs"]').change(function(e){
		var classId = e.target.id;
		var classNum = classId[classId.length-1];
		classClick(classNum);
	});

	$('label[id*="text"]').on("click", function(e){
		var classId = e.target.id;
		var classNum = classId[classId.length-1];
		var radio_button = document.getElementById('class'+classNum)
		radio_button.checked = true;
		classClick(classNum);
	});
}

function checkEngagementButtons(){

		$('.Engagement').on("click", function(e){
			console.log("click!")
			load_engagement();
		});
}

function checkFeedbackButtons(){

		$('.Feedback').on("click", function(e){
			load_feedback();
		});
}

function checkSettingsButtons(){

		$('.Settings').on("click", function(e){
			load_settings();
		});
}


Util.events(document, {
	// Final initalization entry point: the Javascript code inside this block
	// runs at the end of start-up when the DOM is ready

	"DOMContentLoaded": function(e) {
		// want to load sections and classes list
		// sessionStorage.clear();
		var page_tabs_html = sessionStorage.getItem('tabs_code');

		if(page_tabs_html != null) {
			console.log("already have tabs code")
			// Get most recent tabs
			var page_tabs_element = document.getElementById("page_tabs");
			page_tabs_element.innerHTML = page_tabs_html;

			// Get most recent class list
			classes = JSON.parse(sessionStorage.getItem("classes"));
			total_classes = JSON.parse(sessionStorage.getItem("total_classes"));

			// Get most recent sections
			var body_tag_id = document.getElementsByTagName("body")[0].id;
			console.log("Body tag: ", body_tag_id)
			var page_sections_html = sessionStorage.getItem(body_tag_id+'_code');
			var page_sections_element = document.getElementById("page_sections");
			// If not a new class
			if(page_sections_html != null) page_sections_element.innerHTML = page_sections_html;

			var current_class = sessionStorage.getItem('currentClass');
			console.log("Current Class: ", current_class)


			for(var i=0; i<classes.length; i++){
				var class_name = classes[i];
				var class_num = class_name[class_name.length-1];
				var is_section = document.getElementById("content"+class_num) != null;
				if(!is_section){
					console.log("No section for: ", current_class)
					add_new_section(class_num, body_tag_id);
				}
			}

			if(body_tag_id == 'body_home'){
				console.log("In home!")
				checkEngagementButtons();
				checkFeedbackButtons();
				checkSettingsButtons();
			}

			var current_class = sessionStorage.getItem('currentClass');
			window.document.getElementById('class'+current_class).checked = true;

			classClick(current_class);

			checkChanges();

			for(var i in classes){
				var class_num = parseInt(classes[i]);
				addDeleteClick(class_num);
			}

		}
		else{
			console.log("dont have tabs code")
			var default_classes = ['World History', 'AP History', 'Euro. History', 'US History']
			for(var i=0; i<4; i++){
				add_new_class(default_classes[i], true);
			}

			window.document.getElementById("class"+1).checked = true;

			classClick(1);

			var page_sections_html = document.getElementById("page_sections").innerHTML;
			sessionStorage.setItem("body_home_code", page_sections_html);
			checkChanges();
			for(var i in classes){
				var class_num = parseInt(classes[i]);
				addDeleteClick(class_num);
			}

		}


	}


});
