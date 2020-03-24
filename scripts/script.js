onRenameFileClick();
function onRenameFileClick() {
	const renameAudioBtnEls = document.querySelectorAll('button.rename-audio');
	renameAudioBtnEls.forEach((item, i) => {
		item.onclick = (e) => {
			const id = item.parentElement.parentElement.id;
			const nameEl = document.querySelector("#" + id + " a p");
			nameEl.parentElement.removeAttribute("href");
			nameEl.outerHTML = "<textarea>" + nameEl.innerHTML + "</textarea>";
		};
	});
}
