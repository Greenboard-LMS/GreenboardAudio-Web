handleNewFileBox();
function actionAudioFile(
	action,
	user_id,
	audio_id,
	new_name = "",
	callback = function (response) {}
) {
	fetch(
		`/ajax/${action}audio.php?user_id=${user_id}&audio_id=${audio_id}&new_name=${new_name}`,
		{ method: "get" }
	)
		.then(response => {
			if (response.status >= 200 && response.status < 300) {
				return response.text();
			}
		})
		.then(response => {
			document.querySelector("." + action + "-container").style.display =
				"none";
			window.displayStatus(response);
			callback(response);
		});
}

function actionFolder(
	action,
	user_id,
	folder_id,
	new_name = "",
	callback = function (response) {}
) {
	fetch(
		`/ajax/${action}folder.php?user_id=${user_id}&folder_id=${folder_id}&new_name=${new_name}`,
		{ method: "get" }
	)
		.then(response => {
			if (response.status >= 200 && response.status < 300) {
				return response.text();
			}
		})
		.then(response => {
			document.getElementsByClassName(
				action + "-container"
			)[1].style.display = "none";
			window.displayStatus(response);
			callback(response);
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

function shareFolder(sender_id, folder_id) {
	const emailInput = document.getElementById("share-folder-email");
	const share_id = emailInput.parentElement.id.substring(17);
	folder_id = folder_id.substring("share-folder-box-".length);
	actionFolder("share", sender_id, folder_id, emailInput.value);
}

function renameFolder(userApiKey, folder_id) {
	let new_name = document.querySelector(
		"#" + folder_id + ' input[type="text"]'
	);
	
	new_name = new_name.value;

	const id = folder_id.substring("rename-folder-box-".length);

	FlytrapRequest
		.initialize("folder")
		.put(`id=${id}&name=${encodeURIComponent(new_name)}`)
		.makeRequest()
		.then(response => {
			document.querySelector("#folder-" + id + " a").innerHTML = new_name;
		});
}

function deleteAudioFile(userApiKey, audio_id) {
	FlytrapRequest
		.initialize('audio',  {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				Authorization: `Basic ${userApiKey}`,
			}})
		.delete(`audio_id=${audio_id}`)
		.then(response => response.json()).then(response => {
			document.querySelector(".delete-container").style.display = "none";
			window.displayStatus(response);
		});
}

function shareAudioFile(sender_id, audio_id) {
	const emailInput = document.getElementById("share-file-email");
	const share_id = emailInput.parentElement.id.substring(16);
	audio_id = audio_id.substring("share-audio-box-".length);
	actionAudioFile("share", sender_id, audio_id, emailInput.value);
}

function renameAudioFile(userApiKey, audio_id) {
	const new_name = document.querySelector(
		"#" + audio_id + ' input[type="text"]'
	).value;
	const id = audio_id.substring(17);
	fetch(`https://api.audio.borumtech.com/v1/audio`, {
		method: "put",
		headers: {
			Authorization: `Basic ${userApiKey}`,
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: `audio_id=${audio_id}&new_name=${new_name}`,
	})
		.then(response => {
			if (response.ok) return response.text();
		})
		.then(response => {
			document.querySelector(".rename-container").style.display = "none";
			window.displayStatus(response);
			document.querySelector("#file-" + id + " p").innerHTML = new_name;
		})
		.catch(response => {
			document.querySelector(".rename-container").style.display = "none";
			window.displayStatus("Error: " + response);
		});
}
