function deleteAudioFile(user_i, audio_id) {
	fetch(`/ajax/deleteaudio.php?user_id=${user_id}&audio_id=${audio_id}`, {method: 'get'}).then(response => {
		if (response.status >= 200 && response.status < 300) {
			return response.text();
		}
	}).then(response => {
		document.getElementById('delete-topic-btn').style.display = 'none';
		document.getElementById('delete-confirmation').innerHTML = response;
		console.log(response);
	}).then(response => {
		setTimeout(function() {
			console.log("Redirection timer on");
			window.location.href = '/Topics';
		}, 1000);
	});
}

function shareAudioFile(user_id, audio_id, share_id) {
	function deleteAudioFile(user_id, audio_id) {
		fetch(`/ajax/shareaudio.php?user_id=${user_id}&audio_id=${audio_id}`, {method: 'get'}).then(response => {
			if (response.status >= 200 && response.status < 300) {
				return response.text();
			}
		}).then(response => {
			document.querySelector('.share-container').style.display = 'none';
		});
	}
}
