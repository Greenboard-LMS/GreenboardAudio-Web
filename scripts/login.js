let w;
function connectToBorum(page) {
		w = window.open('http://www.bforborum.com/' + page, "MsgWindow", "width=500,height=600");
		window.addEventListener("message", function(event) {
			if (event.origin !== "http://www.bforborum.com")
		    return;

		  console.log(event.data);
		}, false);
	document.body.onunload = function() {w.close()};
}
