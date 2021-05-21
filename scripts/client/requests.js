function getAndDisplayFolderElements(userApiKey, folderId = "") {
	FlytrapRequest.initialize(`folder?folder_id=${folderId}`)
		.authorize(userApiKey)
		.makeRequest()
		.then(response => {
			console.info(response);

			document.querySelector(".files.flexbox").innerHTML =
				displayAudioData(response.audio);
			handleAllAudioBoxes();

			document.querySelector(".folders.flexbox").innerHTML =
				displayFolderData(response.folder);
			handleAllFolderBoxes();
			
			const isNotRootFolder = response.root.data;
			if (isNotRootFolder)
				document.title = response.root.data.folder_name + " | Flytrap";
		})
		.catch(response => {
			window.displayStatus(
				"The data could not be fetched due to a system error",
				"error"
			);
			console.error(response);
		});
}

function displayFolderData(folderResponse) {
	if (folderResponse.error || !!!folderResponse.data) return;

	let folderList = "";

	for (const folder of folderResponse.data) {
		const folderListItem = `
		<li id="folder-${folder.id}">
			<a href="/folders/${folder.alpha_id}">${folder.folder_name}</a>
			<div class = 'customize-btns'>
				<button class = 'rename-folder'><img class = 'grey-circle' src = 'https://cdn.borumtech.com/images/Edit.png'></button>
				<button class = 'delete-folder'><img class = 'grey-circle' src = 'https://cdn.borumtech.com/images/Delete.png'></button>
				<button class = 'share-folder'><img class = 'grey-circle' src = 'https://cdn.borumtech.com/images/register.png'></button>
			</div>
		</li>
		`;

		folderList += folderListItem;
	}

	return folderList;
}

function displayAudioData(audioResponse) {
	if (audioResponse.error || !!!audioResponse.data) return;

	let audioList = "";

	for (const audio of audioResponse.data) {
		const audioListItem = `<li id = "file-${audio.id}">
			<a href = '/audio/${audio.alpha_id}'>
				<img id = "microphone-${audio.id}" ondragstart='onDragStart(event);' ondragend='onDragEnd(event)' draggable='true' src = '/images/microphone.png'>
				<p>${audio.file_name}</p>
			</a>
			<div class = 'customize-btns'>
				<button class = 'rename-audio'><img class = 'grey-circle' src = 'https://cdn.borumtech.com/images/Edit.png'></button>
				<button class = 'delete-audio'><img class = 'grey-circle' src = 'https://cdn.borumtech.com/images/Delete.png'></button>
				<button class = 'share-audio'><img class = 'grey-circle' src = 'https://cdn.borumtech.com/images/register.png'></button>
			</div>
		</li>`;

		audioList += audioListItem;
	}

	return audioList;
}

function createNewFolder(userApiKey, name = "New Folder") {
	const parentId = window.location.href.substring(
		window.location.href.lastIndexOf("/") + 1
	);

	FlytrapRequest.initialize(`folder`)
		.post(`parent_id=${parentId}&name=${name}`)
		.authorize(userApiKey)
		.makeRequest()
		.then(response => {
			if (response.error && response.error.message) {
				window.displayStatus(response.error.message, "error");
			}
			addNewFolder(response.data);
		});
}

function renameFolder(userApiKey, folder_id) {
	let new_name = document.querySelector(
		"#" + folder_id + ' input[type="text"]'
	);

	new_name = new_name.value;

	const id = folder_id.substring("rename-folder-box-".length);

	FlytrapRequest
		.initialize("folder")
		.authorize(userApiKey)
		.put(`id=${id}&new_name=${encodeURIComponent(new_name)}`)
		.makeRequest()
		.then(response => {
			document.querySelector("#folder-" + id + " a").innerHTML = new_name;
		});
}

function renameAudioFile(userApiKey, audio_id) {
	const new_name = document.querySelector(
		"#" + audio_id + ' input[type="text"]'
	).value;
	const id = audio_id.substring(17);

	FlytrapRequest.initialize(`audio`)
		.put(`audio_id=${id}&new_name=${new_name}`)
		.authorize(userApiKey)
		.makeRequest()
		.then(response => {
			document.querySelector(".rename-container").style.display = "none";
			window.displayStatus(response);
			document.querySelector("#file-" + id + " p").innerHTML = new_name;
		})
		.catch(response => {
			document.querySelector(".rename-container").style.display = "none";
			window.displayStatus(response, "error");
		});
}

function deleteFolder(userApiKey, folder_id) {
	FlytrapRequest.initialize("folder")
		.delete(`folder_id=${folder_id}`)
		.authorize(userApiKey)
		.makeRequest()
		.then(response => {
			window.displayStatus("The folder was successfully deleted");
			document
				.querySelector(".folders.flexbox")
				.removeChild(document.getElementById(`folder-${folder_id}`));
			document.querySelectorAll(".delete-container")[1].style.display =
				"none";
		});
}

function deleteAudioFile(userApiKey, audio_id) {
	FlytrapRequest.initialize("audio")
		.delete(`audio_id=${audio_id}`)
		.authorize(userApiKey)
		.makeRequest()
		.then(response => {
			document.querySelector(".delete-container").style.display = "none";
			window.displayStatus(response);
		});
}

function shareFolder(userApiKey, folder_id) {
	const emailInput = document.getElementById("share-folder-email");
	folder_id = folder_id.substring("share-folder-box-".length);

	FlytrapRequest.initialize("folder/collaboration")
		.post(
			`folder_id=${folder_id}&recipient_email=${emailInput.value}`
		)
		.authorize(userApiKey)
		.makeRequest()
		.then(response => {
			window.displayStatus("Folder shared successfully");
			document.querySelectorAll(".share-container")[1].style.display = "none";
		})
		.catch(response => {
			window.displayStatus(response, "error");
		})
}

function shareAudioFile(userApiKey, audio_id) {
	const emailInput = document.getElementById("share-file-email");
	audio_id = audio_id.substring("share-audio-box-".length);
	
	FlytrapRequest.initialize("audio/collaboration")
		.post(
			`audio_id=${audio_id}&recipient_email=${emailInput.value}`
		)
		.authorize(userApiKey)
		.makeRequest()
		.then(response => {
			window.displayStatus("Audio successfully shared");
			document.querySelectorAll(".share-container")[0].style.display = "none";
		})
		.catch(response => {
			window.displayStatus(response, "error");
		})
}
