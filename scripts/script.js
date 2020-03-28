function exitPopup(e) {
	e.target.parentElement.style.display = "none";
}

document.querySelectorAll('.action-container img').forEach((item, i) => {
	item.onclick = exitPopup;
	item.onkeydown = e => {
		console.log(e);
		if (e.key == 'Escape') {
			exitPopup(e);
		}
	};
});

document.querySelector('.new-file-box-container form input[name="file"]').onchange = uploadFile;

function uploadFile(e) {
	const progressBar = document.getElementById('upload-file-progress-bar');
	const data = new FormData();

	for (let fileNumber in this.files) {
		if (this.files.hasOwnProperty(fileNumber)) {
			const file = this.files[fileNumber];

			data.append('file' + fileNumber, file);

			if (file.type !== 'audio/wav' && file.type !== 'audio/x-wav' && file.type !== 'audio/mpeg' && file.type !== 'audio/mp3') {
				alert('You may only upload an audio file!');
				return;
			}

			if (file.size > 10000000) {
	    	alert('max upload size is 10 MB');
				return;
	  	}

			progressBar.style.display = "inline-block";
		}
	}

	sendFiles(data);
}

function sendFiles(data) {
	let xhr;
	if (window.XMLHttpRequest){ // code for IE7+, Firefox, Chrome, Opera, Safari
		xhr = new XMLHttpRequest();
	} else { // code for IE6, IE5
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	console.log(document.getElementById('audio-files'));
	const url = 'ajax/uploadaudio.php';
	xhr.open("POST", url, true);

	// Send the proper header information along with the request
	xhr.overrideMimeType("multipart/form-data");

  function handleEvent(e) {
		document.getElementById('upload-file-progress-bar').value = e.loaded;
		document.getElementById('upload-file-progress-bar').max = e.total;
	}

	xhr.addEventListener('loadstart', handleEvent);
	xhr.addEventListener('load', handleEvent);
	xhr.addEventListener('loadend', handleEvent);
	xhr.addEventListener('progress', handleEvent);
	xhr.addEventListener('error', handleEvent);
	xhr.addEventListener('abort', handleEvent);

	xhr.onreadystatechange = function() { // Call a function when the state changes.
		if (xhr.readyState == 4 && xhr.status == 200) {
			setTimeout(function() {
				toggleDisplay('none', 1);
				toggleDisabled(false);
				document.getElementById('upload-file-progress-bar').style.display = "none";
			}, 1000);
		}
	}
	xhr.send(data);
}
