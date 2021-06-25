let audioContext;
let recorder;

function startUserMedia(stream) {
	const input = audioContext.createMediaStreamSource(stream);
	console.log("Media stream created.");

	// Uncomment if you want the audio to feedback directly
	//input.connect(audioContext.destination);
	//console.log('Input connected to audio context destination.');

	recorder = new Recorder(input);
	console.log("Recorder initialised.");
}

function startRecording(button) {
	recorder && recorder.record();
	button.disabled = true;
	button.nextElementSibling.disabled = false;
	console.log("Recording...");
}

function stopRecording(button) {
	recorder && recorder.stop();
	button.disabled = true;
	button.previousElementSibling.disabled = false;
	console.log("Stopped recording.");

	// create WAV download link using audio data blob
	createDownloadLink();

	recorder.clear();
}

function createDownloadLink() {
	// Change to ajax request to uploadaudio
	const recordingslist = document.getElementById('recordings-list');
	
	recorder &&
		recorder.exportWAV(function (blob) {
			var url = URL.createObjectURL(blob);
			var li = document.createElement("li");
			var au = document.createElement("audio");
			var hf = document.createElement("a");

			au.controls = true;
			au.src = url;
			hf.href = url;
			hf.download = new Date().toISOString() + ".wav";
			hf.innerHTML = hf.download;
			li.appendChild(au);
			li.appendChild(hf);
			recordingslist.appendChild(li);
		});
}

window.onload = function init() {
	try {
		// webkit shim
		window.AudioContext = window.AudioContext || window.webkitAudioContext;
		navigator.mediaDevices.getUserMedia =
			navigator.mediaDevices.getUserMedia || navigator.webkitGetUserMedia;
		window.URL = window.URL || window.webkitURL;

		audioContext = new AudioContext();
		console.log("Audio context set up.");
		console.log(
			"navigator.mediaDevices.getUserMedia " +
				(navigator.mediaDevices.getUserMedia
					? "available."
					: "not present!")
		);
	} catch (e) {
		alert("No web audio support in this browser!");
	}

	navigator.mediaDevices
		.getUserMedia({ audio: true })
		.then(startUserMedia)
		.catch((e) => {
			console.log("No live audio input: " + e);
		});
};
