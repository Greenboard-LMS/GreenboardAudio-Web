function exitPopup(e) {
	e.target.parentElement.style.display = "none";
}
document.querySelectorAll('.action-container img').forEach((item, i) => {
	item.onclick = exitPopup;
	item.onkeydown = e => {
		console.log(e);
		if (e.key == 'Escape') {
			exitPopup(e);
		}
	};
});
