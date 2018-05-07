//TODO:
// Storage problems: wont go to next page, wont save sections
// Sections local stroage
// Tab ordering on delete
// Edit class name

var currentlyActive;
var previousContent = "content1";
classes = []
total_classes = 0;
var classesReady;
var radios;
//Format: button color, section color
class_colors = [["#0A5DBA","#8C9BAB"], ["#D92A2E","#E39496"], ["#C0783A","#EBA060"], ["#5A9620","#98B879"], ["purple","#874a87"], ["#FF1493","#FFB6C1"]]

function getURLParam(name) {
	return new URL(location).searchParams.get(name);
}

var checked = getURLParam("checked") || "1";

function load_feedback() {

	for (i in classes) {
		if (document.getElementById("class" + classes[i]).checked){
			currentlyActive = classes[i];
			break
		}
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
				break
			}
		}

		window.location = "engagement.html?checked="+currentlyActive;
			}

	window.onload = function () {

	}

	// window.onbeforeunload = function() {
	// 	localStorage.removeItem('tabs_code'); return '';
	// };

	function classClick(classnum){
		// console.log("Class Click: ", classnum);
		var content = "content" + classnum;
		// console.log(document.getElementById(content));
		if(previousContent != null && document.getElementById(previousContent) != null) {
			document.getElementById(previousContent).style["display"] = "none";
		}
		document.getElementById(content).style["display"] = "flex";
		previousContent = content;
	}

	function add_new_class(classname){
		// Update class number and class list
		total_classes += 1;
		var class_num = total_classes;
		classes.push(""+(class_num));
		window.localStorage.setItem("classes", JSON.stringify(classes));
		window.localStorage.setItem("total_classes", JSON.stringify(total_classes));

		// Create label and radio for new class
		var new_class_radio = document.createElement('input');
		new_class_radio.id = "class"+class_num;
		new_class_radio.type = "radio";
		new_class_radio.name = "tabs";

		var defaultText = 'Class Name Here';
		var content = classname || defaultText;
		var new_class_label = document.createElement('label');
		new_class_label.style.backgroundColor = class_colors[class_num-1][0];
		new_class_label.htmlFor = "class"+class_num;
		new_class_label.contentEditable = false;
		new_class_label.id = "label"+class_num;

		child_label_tag = document.createElement('label');
		child_label_tag.id = "text"+class_num;
		child_label_tag.innerHTML = content;
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
		window.localStorage.setItem("tabs_code", page_tabs_html);
		// console.log("Tabs Code: ", page_tabs_html);

		add_new_section(class_num);

		checkChanges();
		checkEngagementButtons();
		checkFeedbackButtons();
		checkSettingsButtons();
		addDeleteClick();

		var page_sections_html = document.getElementById("page_sections").innerHTML;
		window.localStorage.setItem("sections_code", page_sections_html);

	}

	function add_new_section(class_num){

		var section_tag = document.createElement('section');
		section_tag.id = "content"+class_num;
		section_tag.style.backgroundColor = class_colors[class_num-1][1];

		var page_element = document.getElementById('page_sections');
		page_element.appendChild(section_tag);

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

		classClick(class_num);
	}


	function delete_class(classnum){
		total_classes = total_classes - 1;
		console.log("Total # classes after delete: ", total_classes);
		var num_classes = total_classes;
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

		// Save to local Storage
		var page_tabs_html = document.getElementById("page_tabs").innerHTML;
		window.localStorage.setItem("tabs_code", page_tabs_html);

		var page_sections_html = document.getElementById("page_sections").innerHTML;
		window.localStorage.setItem("sections_code", page_sections_html);

		window.localStorage.setItem("classes", JSON.stringify(classes));
		window.localStorage.setItem("total_classes", JSON.stringify(total_classes));
	}


function addDeleteClick(){
	$('div[id*="remove"]').on("click", function(e){
		var classId = e.currentTarget.id;
		var classNum = classId[classId.length-1];
		delete_class(classNum);
		classClick(classes[classes.length-1]);
	});
}

function checkButtons(){
		// console.log("checking");
		if (classesReady){
			// console.log("checked");
			console.log(document.getElementById("class4").checked);
		}

	}

function checkChanges(){
	$('input[name="tabs"]').change(function(e){
		var classId = e.target.id;
		var classNum = classId[classId.length-1];
		classClick(classNum);
	});

	$('label[id*="text"]').on("click", function(e){
		console.log("clicked label");
		var classId = e.target.id;
		var classNum = classId[classId.length-1];
		classClick(classNum);
	});
}

function checkEngagementButtons(){

		$('.Engagement').on("click", function(e){
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
		// localStorage.clear();
		// want to load sections and classes list
		var page_tabs_html = localStorage.getItem('tabs_code');

		if(page_tabs_html != null) {
			console.log("Have tabs stored!")
			// Get most recent tabs
			var page_tabs_element = document.getElementById("page_tabs");
			page_tabs_element.innerHTML = page_tabs_html;		

			var page_sections_html = localStorage.getItem('sections_code');
			var page_sections_element = document.getElementById("page_sections");
			page_sections_element.innerHTML = page_sections_html;

			// Get most recent class list
			classes = JSON.parse(localStorage.getItem("classes"));
			total_classes = JSON.parse(localStorage.getItem("total_classes"));
			// Get most recent sections
			// var page_sections_element = document.getElementById("page_sections");
			// page_sections_element.innerHTML = page_sections_html;

			window.document.getElementById("class"+checked).checked = true;
		}
		else{
			console.log("Dont have tabs stored!")
			var default_classes = ['World History', 'AP History', 'Euro. History', 'US History']
			for(var i=0; i<4; i++){
				add_new_class(default_classes[i]);
			}

			classClick(1);

			var page_sections_html = document.getElementById("page_sections").innerHTML;
			localStorage.setItem("sections_code", page_sections_html);

			// console.log("Getting stored: ", localStorage.getItem("sections_code"));
		}

		// Make sure you load all the relevant buttons by now
		addDeleteClick();

	},

	// "dblclick": function(e) {
	// 	var target = e.target;
	// 	var labels = Util.all("label.text");
	// 	console.log("Click on: ", target.nodeName);
	// 	if((target.nodeName == "LABEL" || target.nodeName == "INPUT" || target.nodeName == "TEXT")){
	// 		console.log("Clicked on editable things")
	// 		for(var i = 0; i < labels.length; i++){
	// 			var label = labels[i];
	// 			console.log("kiddos:", label.children, "of: ", label);
	// 			var child_label = label.children[0];
	// 			label.contentEditable = true;
	// 		}
	// 	}

	// },

	"click": function(e) {
		console.log("Clicked on: ", e.target.nodeName)
	// 	var target = e.target;
	// 	var labels = Util.all("label.text");
	// 	if(!(target.nodeName == "LABEL" || target.nodeName == "INPUT" || target.nodeName == "TEXT")){
	// 		console.log("Clicked on uneditable thing: ", target.nodeName)
	// 		for(var i = 0; i < labels.length; i++){
	// 			var label = labels[i];
	// 			label.contentEditable = false;
	// 		}

	// 	}
	},

	// "keypress": function(e) {
	// 	var target = e.target;
	// 	var labels = Util.all("label.text");
	// 	if(e.keyCode == 13){
	// 		for(var i = 0; i < labels.length; i++){
	// 			var label = labels[i];
	// 			label.contentEditable = false;
	// 		}
	// 	}
	// },


	// "mousedown": function(e){
	// 	if (e.detail > 1) {
	//     e.preventDefault();
	//   }

	// }


});
