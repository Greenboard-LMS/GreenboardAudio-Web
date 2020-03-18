const fileBoxEl = document.querySelector('.new-file-box-container');
const showBoxBtnEl = document.querySelector('#new-audio-btn');
showBoxBtnEl.addEventListener('click', showBox);

let isDisabled = false;
const isVisible = elem => !!elem && !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length); // source (2018-03-11): https://github.com/jquery/jquery/blob/master/src/css/hiddenVisibleSelectors.js

function toggleDisabled(bool) {
    showBoxBtnEl.attributes.disabled = bool;
    isDisabled = bool;
}

function toggleDisplay(display, opacity) {
    document.querySelectorAll('.grid > div:not(.new-file-box-container)').forEach((item, i) => {
      item.style.opacity = opacity;
    });
    fileBoxEl.style.display = display;
}

function showBox(event) {
  if (!isDisabled) {
    event.preventDefault();
    event.stopPropagation();
    toggleDisplay("block", 0.5);
    toggleDisabled(true);
    document.addEventListener('click', outsideClickListener);
  }
}

function outsideClickListener(event) {
  if (!fileBoxEl.contains(event.target) && isVisible(fileBoxEl)) { // or use: event.target.closest(selector) === null
    toggleDisplay("none", 1);
    toggleDisabled(false);
    document.removeEventListener('click', outsideClickListener)
  }
}
