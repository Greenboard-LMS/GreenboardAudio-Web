function actionAudioFile(action, user_id, audio_id, new_name = '', callback = function(response) {}) {
	fetch(`/ajax/${action}audio.php?user_id=${user_id}&audio_id=${audio_id}&new_name=${new_name}`, {method: 'get'}).then(response => {
		if (response.status >= 200 && response.status < 300) {
			return response.text();
		}
	}).then(response => {
		document.querySelector('.' + action + '-container').style.display = 'none';
		window.displayStatus(response);
		callback(response);
	});
}

function actionFolder(action, user_id, folder_id, new_name = '', callback = function(response) {}) {
	fetch(`/ajax/${action}folder.php?user_id=${user_id}&folder_id=${folder_id}&new_name=${new_name}`, {method: 'get'}).then(response => {
		if (response.status >= 200 && response.status < 300) {
			return response.text();
		}
	}).then(response => {
		document.getElementsByClassName(action + '-container')[1].style.display = 'none';
		window.displayStatus(response);
		callback(response);
	});
}

function deleteFolder(user_id, folder_id) {
	actionFolder('delete', user_id, folder_id);
}

function shareFolder() {
	actionFolder('share', user_id, folder_id);
}

function renameFolder(user_id, folder_id) {
	const new_name = document.querySelector('#' + folder_id + ' input[type="text"]').value;
	const id = folder_id.substring(20);
	actionFolder('rename', user_id, id, new_name, function() {
		document.querySelector('#folder-' + id + ' a').innerHTML = new_name;
	});
}

function deleteAudioFile(user_id, audio_id) {
	actionAudioFile('delete', user_id, audio_id);
}

function shareAudioFile(user_id, audio_id, share_id) {
	actionAudioFile('share', user_id, audio_id);
}
function renameAudioFile(user_id, audio_id) {
	const new_name = document.querySelector('#' + audio_id + ' input[type="text"]').value;
	const id = audio_id.substring(17);
	actionAudioFile('rename', user_id, id, new_name, function() {
		document.querySelector('#file-' + id + ' p').innerHTML = new_name;
	});
}
