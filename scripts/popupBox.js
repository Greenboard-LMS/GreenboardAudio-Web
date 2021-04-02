const showBoxBtnEl = document.querySelector("#new-audio-btn");

handleAllAudioBoxes();
handleAllFolderBoxes();

function handleAllAudioBoxes() {
	handleActionBox("share", "audio");
	handleActionBox("delete", "audio");
	handleActionBox("rename", "audio", (actionBoxEl, item) => {
		actionBoxEl.querySelector('input').value = item.parentElement.parentElement.querySelector('p').textContent;
	});
}

function handleAllFolderBoxes() {
	handleActionBox("share", "folder");
	handleActionBox("delete", "folder");
	handleActionBox("rename", "folder");
}

function handleActionBox(
	actionName,
	mediaType,
	additional = actionBoxEl => {}
) {
	const actionBoxEl = document.getElementsByClassName(
		actionName + "-container"
	)[mediaType == "audio" ? 0 : 1];
	const showBoxBtnEls = document.querySelectorAll(
		"button." + actionName + "-" + mediaType
	);
	showBoxBtnEls.forEach((item, i) => {
		item.onclick = () => {
			actionBoxEl.style.display = "block";
			actionBoxEl.id =
				actionName +
				"-" +
				mediaType +
				"-box-" +
				item.parentElement.parentElement.id.substring(
					mediaType == "audio" ? 5 : 7
				);
			additional(actionBoxEl, item);
		};
	});
}

const fileBoxEl = document.querySelector(".new-file-box-container");
function handleNewFileBox() {
	let isDisabled = false;
	const isVisible = elem =>
		!!elem &&
		!!(
			elem.offsetWidth ||
			elem.offsetHeight ||
			elem.getClientRects().length
		); // source (2018-03-11): https://github.com/jquery/jquery/blob/master/src/css/hiddenVisibleSelectors.js

	showBoxBtnEl.addEventListener("click", showBox);

	function showBox(event) {
		if (!isDisabled) {
			event.preventDefault();
			event.stopPropagation();
			toggleDisplay("block", 0.5);
			toggleDisabled(true);
			document.addEventListener("click", outsideClickListener);
			setTimeout(animateUploadArrow, 500);
		}
	}

	function outsideClickListener(event) {
		if (!fileBoxEl.contains(event.target) && isVisible(fileBoxEl)) {
			// or use: event.target.closest(selector) === null
			toggleDisplay("none", 1);
			toggleDisabled(false);
			document.removeEventListener("click", outsideClickListener);
			document.getElementById("upload-file-progress-bar").style.display =
				"none";
		}
	}

	function animateUploadArrow() {
		const imgEl = document.getElementById("upload-file-arrow");
		imgEl.className = "bounce";
	}
}

function toggleDisplay(display, opacity) {
	document
		.querySelectorAll(".grid > div:not(.new-file-box-container)")
		.forEach((item, i) => {
			item.style.opacity = opacity;
		});
	fileBoxEl.style.display = display;
}

function toggleDisabled(bool) {
	showBoxBtnEl.attributes.disabled = bool;
	isDisabled = bool;
}
