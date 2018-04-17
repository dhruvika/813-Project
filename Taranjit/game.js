// constants
const size = 1;

// Holds DOM elements that don’t change, to avoid repeatedly querying the DOM
var dom = {};

// Attaching events on document because then we can do it without waiting for
// the DOM to be ready (i.e. before DOMContentLoaded fires)
Util.events(document, {
	// Final initalization entry point: the Javascript code inside this block
	// runs at the end of start-up when the DOM is ready
	"DOMContentLoaded": function() {

		var grid = document.getElementById("tableGrid");
		var headings = ["First Name", "Last Name", "Email", "Select"]

		// Creating a pre-defined list of students.
		for (var i = 0; i < size; i++) {
		// creates a table row
			var row = document.createElement("tr");

			for (var j = 0; j < headings.length; j++) {
			  // Create a <td> element and a text node, make the text
			  // node the contents of the <td>, and put the <td> at
			  // the end of the table row
			  var cell = document.createElement("td");
			  cell.innerHTML = headings[j];
			  console.log(cell.innerHTML)
			  cell.style.fontWeight = 'bold';

			  row.appendChild(cell);
			}
		// add the row to the end of the table body
			grid.appendChild(row);
		}

		Util.one("#add").addEventListener("click", function(){
			var tableColumns = document.getElementsByClassName("addInput")
			var table = document.getElementById("tableGrid");
			var row = table.insertRow();
			for (var c = -1; c < tableColumns.length; c++){
				var cell = row.insertCell(c);
				if (c == -1){
					var selectInput = document.createElement('input');
					selectInput.setAttribute('type', 'checkbox');
					selectInput.setAttribute('class', 'select')
					cell.appendChild(selectInput);

				}
				else{
					var cellInputId = tableColumns[c].id
					cell.innerHTML = document.getElementById(cellInputId).value;
					var regex = new RegExp(/\s/);
					if (regex.test(cell.innerHTML) || cell.innerHTML === ""){
						table.deleteRow(-1);
						break;
					}
				}
				row.setAttribute('id', cell.innerHTML)
				selectInput.setAttribute('id', cell.innerHTML)

			}
		});

		Util.one("#delete").addEventListener("click", function(){
		var table = document.getElementById("tableGrid");
		for (var i = 0, row; row = table.rows[i]; i++) {
			if (row.querySelector('.select:checked')){
				table.deleteRow(i);
			}
		}
		
		});

	},

	// Keyboard events arrive here
	"keyup": function(evt) {

	},

	// Click events arrive here
	"click": function(evt) {
		// Your code here
	}
});





