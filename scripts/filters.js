const listViewBtnEl = document.querySelector('#filter-view svg:nth-of-type(1)');
const flexViewBtnEl = document.querySelector('#filter-view svg:nth-of-type(2)');
const sliderEl = document.querySelector('#filter-view .slider');
listViewBtnEl.onclick = event => {
	sliderEl.classList.toggle('slide-right', false);
	sliderEl.classList.toggle('slide-left', true);
};

flexViewBtnEl.onclick = event => {
	sliderEl.classList.toggle('slide-left', false);
	sliderEl.classList.toggle('slide-right', true);
};
