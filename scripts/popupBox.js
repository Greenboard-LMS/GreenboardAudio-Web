handleShareBox();
handleDeleteBox();
handleNewFileBox();

function handleActionBox(boxEl, btnEl) {
  btnEl.forEach((item, i) => {
    item.onclick = () => {
      boxEl.style.display = "block";
    };
  });
}

function handleDeleteBox() {
	const deleteBoxEl = document.querySelector('.delete-container');
	const showBoxBtnEls = document.querySelectorAll('button.delete-audio');
	showBoxBtnEls.forEach((item, i) => {
		item.onclick = () => {
		  deleteBoxEl.style.display = "block";
      deleteBoxEl.id = item.parentElement.parentElement.id;
		};
	});
}

function handleShareBox() {
  const shareBoxEl = document.querySelector('.share-container');
  const showBoxBtnEl = document.querySelectorAll('button.share-audio');
  showBoxBtnEl.forEach((item, i) => {
  	item.onclick = () => {
  		shareBoxEl.style.display = "block";
  	};
  });
}

function handleNewFileBox() {
  const fileBoxEl = document.querySelector('.new-file-box-container');
  const showBoxBtnEl = document.querySelector('#new-audio-btn');

  let isDisabled = false;
  const isVisible = elem => !!elem && !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length); // source (2018-03-11): https://github.com/jquery/jquery/blob/master/src/css/hiddenVisibleSelectors.js

  showBoxBtnEl.addEventListener('click', showBox);
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
      setTimeout(animateUploadArrow, 500);
    }
  }

  function outsideClickListener(event) {
    if (!fileBoxEl.contains(event.target) && isVisible(fileBoxEl)) { // or use: event.target.closest(selector) === null
      toggleDisplay("none", 1);
      toggleDisabled(false);
      document.removeEventListener('click', outsideClickListener)
    }
  }

  function animateUploadArrow() {
    const imgEl = document.getElementById('upload-file-arrow');
    imgEl.className = "bounce";
  }

}
