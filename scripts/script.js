function searchFlytrap(e) {
	const query = e.target.value;
	const fileListEl = document.querySelector('.file-list-container');
	if (['Shift', 'Control'].includes(e.key))
		return;
	fetch('ajax/search.php?q=' + query, {method: 'get'}).then(response => {
		if (response.status >= 200 && response.status < 300) {
			return response.text();
		}
	}).then(response => {
		return JSON.parse(response);
	}).then(response => {
		document.querySelector('.files.flexbox').innerHTML = "";
		for (item in response) {
			addNewFile(response[item]);
		}
	});
	if (e.key == 'Enter') {
		location.href = '/search?q=' + query;
	}
}

function addNewFile(data) {
	document.querySelector('.files.flexbox').innerHTML += `<li id = ${data[0]}><a href><img src = 'images/microphone.png'><p>${data[1]}</p></a><div class = 'customize-btns'>	<button class="rename-audio"><img class="grey-circle" src="http://cdn.bforborum.com/images/Edit.png"></button><button class="delete-audio"><img class="grey-circle" src="http://cdn.bforborum.com/images/Delete.png"></button><button class="share-audio"><img class="grey-circle" src="http://cdn.bforborum.com/images/register.png"></button></div></li>`;
	handleShareBox();
	handleDeleteBox();
	handleNewFileBox();
	handleRenameBox();
}

document.getElementById('search-bar').onkeyup = searchFlytrap;

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

			if (!['audio/wav', 'audio/x-wav', 'audio/mp3', 'audio/mpeg'].includes(file.type)) {
				displayStatus('You may only upload an audio file!');
				return;
			}

			if (file.size > 10000000) {
	    	displayStatus('max upload size is 10 MB');
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
	}

	xhr.addEventListener('loadstart', handleEvent);
	function fakeProgress(percent) {
		if (percent > 90) { // Base case
			return;
		} else {
			document.getElementById('upload-file-progress-bar').value = percent;
			setTimeout(function() {
				fakeProgress(percent + 1);
			}, 200);
		}
	}

	fakeProgress(1);
	xhr.addEventListener('loadend', handleEvent);
	xhr.addEventListener('error', handleEvent);
	xhr.addEventListener('abort', handleEvent);

	xhr.onreadystatechange = function() { // Call a function when the state changes.
		if (xhr.readyState == 4 && xhr.status == 200) {
			toggleDisplay('none', 1);
			toggleDisabled(false);
			document.getElementById('upload-file-progress-bar').style.display = "none";
			displayStatus(xhr.responseText);
		}
	}
	xhr.send(data);
}

function displayStatus(status) {
	document.querySelector('.status-container').classList.add("show-status");
	document.querySelector('.status-container').style.display = "block";
	document.querySelector('.status-container').innerHTML = status;
	setTimeout(function() {
		document.querySelector('.status-container').classList.remove('show-status');
		document.querySelector('.status-container').classList.add('hide-status');
	}, 2000);
}
