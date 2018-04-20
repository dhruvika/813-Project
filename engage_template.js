// Attaching events on document because then we can do it without waiting for
// the DOM to be ready (i.e. before DOMContentLoaded fires)
Util.events(document, {
	// Final initalization entry point: the Javascript code inside this block
	// runs at the end of start-up when the DOM is ready
	"DOMContentLoaded": function() {

		Util.one("#attend_button").addEventListener("click", function(){
			attend_button = document.getElementById('attend_button');
			attend_button.classList.remove('inactive');
			attend_button.classList.add('active');
			participate_button = document.getElementById('participate_button');
			participate_button.classList.remove('active');
			participate_button.classList.add('inactive');	
		});

		Util.one('#participate_button').addEventListener("click", function (event){
			participate_button = document.getElementById('participate_button');
			participate_button.classList.remove('inactive');
			participate_button.classList.add('active');	
			attend_button = document.getElementById('attend_button');
			attend_button.classList.remove('active');
			attend_button.classList.add('inactive');		
		});

	},

	
});

