let w;
function connectToBorum() {
		w = window.open('http://www.bforborum.com/Login', "MsgWindow", "width=500,height=600");
		window.addEventListener("message", function(event) {
			if (event.origin !== "http://www.bforborum.com")
		    return;
			console.log(event.data);
			performLoginWithBorum(event);
		}, false);
	document.body.onunload = function() {w.close()};
}

function performLoginWithBorum(event) {
	fetch('ajax/loginwithborum.php?email=' + event.data[0] + '&password=' + event.data[1]).then(response => {
		if (response.status >= 200 && response.status < 300) {
			return response.text();
		}
	}).then(response => {
		if (response == "OK") {
			setTimeout(function() {
				window.location.href = "/";
			}, 1000);
		}
	});
}
