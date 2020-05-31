const listViewBtnEl = document.querySelector('#filter-view svg:nth-of-type(1)');
const flexViewBtnEl = document.querySelector('#filter-view svg:nth-of-type(2)');
const listViewEls = document.querySelectorAll('.file-list-container table');
const flexViewEls = document.querySelectorAll('.file-list-container ul');
const sliderEl = document.querySelector('#filter-view .slider');

listViewBtnEl.onclick = event => {
	sliderEl.classList.toggle('slide-right', false);
	sliderEl.classList.toggle('slide-left', true);
	listViewEls.forEach((item, i) => {
		item.style.display = "table";
	});
	flexViewEls.forEach((item, i) => {
		item.style.display = "none";
	});
};

flexViewBtnEl.onclick = event => {
	sliderEl.classList.toggle('slide-left', false);
	sliderEl.classList.toggle('slide-right', true);
	flexViewEls.forEach((item, i) => {
		item.style.display = "flex";
	});
	listViewEls.forEach((item, i) => {
		item.style.display = "none";
	});
};

function filterAudio(val) {
	fetch('/ajax/filteraudio.php?val=' + val).then(response => {
		if (response.status >= 200 && response.status < 300) {
			return response.text();
		}
	}).then(response => {
		return JSON.parse(response);
	}).then(response => {
		document.querySelector('.files.flexbox').innerHTML = "";
		window.filterResponse = response;
		for (item in response) {
			addNewFile(response[item]);
		}
	});
}
