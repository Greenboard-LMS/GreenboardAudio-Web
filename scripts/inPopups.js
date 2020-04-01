function deleteAudioFile(user_id, audio_id) {
	fetch(`/ajax/deleteaudio.php?user_id=${user_id}&audio_id=${audio_id}`, {method: 'get'}).then(response => {
		if (response.status >= 200 && response.status < 300) {
			return response.text();
		}
	}).then(response => {
		document.querySelector('.delete-container').style.display = 'none';
		window.displayStatus(response);
	});
}

function shareAudioFile(user_id, audio_id, share_id) {
	fetch(`/ajax/shareaudio.php?user_id=${user_id}&audio_id=${audio_id}`, {method: 'get'}).then(response => {
		if (response.status >= 200 && response.status < 300) {
			return response.text();
		}
	}).then(response => {
		document.querySelector('.share-container').style.display = 'none';
		window.displayStatus(response);
	});
}
function renameAudioFile(user_id, audio_id) {
	const new_name = document.querySelector('#rename-box-' + audio_id + ' input[type="text"]').value;

	fetch(`/ajax/renameaudio.php?user_id=${user_id}&audio_id=${audio_id}&new_name=${new_name}`, {method: 'get'}).then(response => {
		if (response.status >= 200 && response.status < 300) {
			return response.text();
		}
	}).then(response => {
		window.displayStatus(response);
		document.querySelector('#rename-box-' + audio_id).style.display = "none";
		document.querySelector('#file-' + audio_id + ' p').innerHTML = new_name;
	})

}
