function getAndDisplayFolderElements(userApiKey, folderId = "") {
	fetch(`https://api.audio.borumtech.com/v1/folder?folder_id=${folderId}`, {
		headers: {
			authorization: `Basic ${userApiKey}`,
		},
	})
		.then(response => {
			if (response.ok) return response.json();
		})
		.then(response => {
			console.info(response);

			document.querySelector(
				".files.flexbox"
			).innerHTML = displayAudioData(response.audio);
			handleAllAudioBoxes();

			document.querySelector(
				".folders.flexbox"
			).innerHTML = displayFolderData(response.folder);
			handleAllFolderBoxes();
		})
		.catch(response => {
			window.displayStatus(
				"The data could not be fetched due to a system error",
				"error"
			);
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
				<button class = 'rename-audio'><img class = 'grey-circle' src = 'https://cdn.borumtech.com/images/Edit.png'></button>
				<button class = 'delete-audio'><img class = 'grey-circle' src = 'https://cdn.borumtech.com/images/Delete.png'></button>
				<button class = 'share-audio'><img class = 'grey-circle' src = 'https://cdn.borumtech.com/images/register.png'></button>
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

function createNewFolder(userApiKey, name="New Folder") {
	const parentId = window.location.href.substring(
		window.location.href.lastIndexOf("/") + 1
	);

	fetch(
		"https://api.audio.borumtech.com/v1/folder",
		{
			method: "post",
			headers: {
				authorization: `Basic ${userApiKey}`,
				"content-type": "application/x-www-form-urlencoded",
			},
			body: `parent_id=${parentId}&name=${name}`,
		}
	)
		.then(response => {
			if (response.ok) return response.json();
		})
		.then(response => {
			if (response.error?.message) {
				window.displayStatus(response.error.message);
			}
			addNewFolder(response.data);
		});
}
