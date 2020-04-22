function actionAudioFile(action, user_id, audio_id, new_name = '', callback = function() {}) {
	fetch(`/ajax/${action}audio.php?user_id=${user_id}&audio_id=${audio_id}&new_name=${new_name}`, {method: 'get'}).then(response => {
		if (response.status >= 200 && response.status < 300) {
			return response.text();
		}
	}).then(response => {
		document.querySelector('.' + action + '-container').style.display = 'none';
		window.displayStatus(response);
		callback();
	});
}

function renameFolder(user_id, folder_id) {
	const new_name = document.querySelector('#rename-folder-box-' + folder_id + ' input[type="text"]').value;

	fetch(`/ajax/renamefolder.php?user_id=${user_id}&folder_id=${folder_id}&new_name=${new_name}`, {method: 'get'}).then(response => {
		if (response.status >= 200 && response.status < 300) {
			return response.text();
		}
	}).then(response => {
		window.displayStatus(response);
		document.querySelector('#rename-folder-' + folder_id).style.display = "none";
		document.querySelector('#file-' + folder_id + ' p').innerHTML = new_name;
	})
}

function deleteAudioFile(user_id, audio_id) {
	actionAudioFile('delete', user_id, audio_id, '', function() {

	});
}

function shareAudioFile(user_id, audio_id, share_id) {
	actionAudioFile('share', user_id, audio_id, '', function() {});
}
function renameAudioFile(user_id, audio_id) {
	console.log("Audio Id: " + audio_id);
	const new_name = document.querySelector('#' + audio_id + ' input[type="text"]').value;
	console.log("New Name: " + new_name);
	const id = audio_id.substring(17);
	actionAudioFile('rename', user_id, id, new_name, function() {
		document.querySelector('#file-' + id + ' p').innerHTML = new_name;
	});

}
