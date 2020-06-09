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
		document.querySelector('.folders.flexbox').innerHTML = "";
		// Display the files that match the query
		console.log("Add New File Data: ");
		console.log(response[0])
		for (item of response[0]) {
			addNewFile(item);
		}
		// Display the folders that match the query
		console.log("Add New Folder Data: ");
		console.log(response[1])
		for (item of response[1]) {
			addNewFolder(item);
		}
	});
	if (e.key == 'Enter') {
		location.href = '/search?q=' + query;
	}
}

function createNewFolder(user_id) {
	fetch('/ajax/newfolder.php').then(response => {
		if (response.status >= 200 && response.status < 300) {
			return response.text();
		}
	}).then(response => JSON.parse(response)).then(response => {
		if (response.length == 1) {
			window.displayStatus(response[0]);
		}
		addNewFolder({afid: response[2], 0: response[1], 1: response[3]});
	});
}

function addNewFolder(data) {
	document.querySelector('.folders.flexbox').innerHTML += `<li id = \"folder-${data[0]}\"><a href = "/folders/${data['afid']}">${data[1]}</a><div class = 'customize-btns'><button class = 'rename-folder'><img class = 'grey-circle' src = 'http://cdn.bforborum.com/images/Edit.png'></button><button class = 'delete-folder'><img class = 'grey-circle' src = 'http://cdn.bforborum.com/images/Delete.png'></button><button class = 'share-folder'><img class = 'grey-circle' src = 'http://cdn.bforborum.com/images/register.png'></button></div></li>`;
	handleActionBox('share', 'folder');
	handleActionBox('delete', 'folder');
	handleActionBox('rename', 'folder');
}

function addNewFile(data) {
	document.querySelector('.files.flexbox').innerHTML += `<li id = 'file-${data[0]}'><a href = "/audio/${data['afid']}"><img src = 'images/microphone.png'><p>${data['file_name']}</p></a><div class = 'customize-btns'>	<button class="rename-audio"><img class="grey-circle" src="http://cdn.bforborum.com/images/Edit.png"></button><button class="delete-audio"><img class="grey-circle" src="http://cdn.bforborum.com/images/Delete.png"></button><button class="share-audio"><img class="grey-circle" src="http://cdn.bforborum.com/images/register.png"></button></div></li>`;
	handleActionBox('share', 'audio');
	handleActionBox('delete', 'audio');
	handleNewFileBox();
	handleActionBox('rename', 'audio');
}

document.getElementById('search-bar').onkeyup = searchFlytrap;

function exitPopup(e) {
	e.target.parentElement.style.display = "none";
}

document.querySelectorAll('.action-container img').forEach((item, i) => {
	item.onclick = exitPopup;
	item.onkeydown = e => {
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
	document.querySelector('.status-container').classList.remove('hide-status');
	document.querySelector('.status-container').classList.add("show-status");
	document.querySelector('.status-container').style.display = "block";
	document.querySelector('.status-container').innerHTML = status;
	setTimeout(function() {
		document.querySelector('.status-container').classList.remove('show-status');
		document.querySelector('.status-container').classList.add('hide-status');
	}, 2000);

}

function onDragStart(event) {
	event.dataTransfer.setData('text/plain', event.target.id);
	event.currentTarget.style.backgroundColor = 'yellow';
}

function onDragOver(event) {
  event.preventDefault();

	if (event.target.getAttribute("draggable") == "true")
		event.dataTransfer.dropEffect = "none"; // dropping is not allowed
	else
		event.dataTransfer.dropEffect = "all"; // drop it like it's hot
}

function onDrop(event) {
  const id = event.dataTransfer.getData('text'); // Get id in text format
	if (!id.includes('microphone-')) {
		return;
	}

  const draggableElement = document.getElementById(id);
  const dropzone = event.target.closest('li');
	let newFolderID = dropzone.id.substring("folder-".length);
	let fileID = draggableElement.parentElement.parentElement.id.substring("file-".length);
	console.log("Folder ID: " + newFolderID + ", File ID: " + fileID)

  dropzone.appendChild(draggableElement.parentElement.parentElement);

  event.dataTransfer.clearData();

	fetch("/ajax/movefolder.php", {
	  method: "post",
	  headers: {
	    'Content-Type': 'application/x-www-form-urlencoded'
	  },

	  //make sure to serialize your JSON body
	  body: `new_folder=${newFolderID}&file_id=${fileID}`
	})
	.then( (response) => {
		if (response.status >= 200 && response.status < 300) {
			return response.text();
		}
	}).then(response => {
		window.displayStatus(response);
	});
}

function onDragEnd(event) {
	event.currentTarget.style.background = 'none';
}
