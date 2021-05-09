/**
	* handles events for plus sign on desktops
	* Takes four parameters
		* mouseEvent - the name of the event, String
		* addAudioClass - the class given to #add-audio
		* nmbtnStyle - the display value for the new media button container
		* plusBetweenStyle - the display value for #plus-between
*/
function handlePlusMouseEvents(mouseEvent, addAudioClass, nmbtnStyle, plusBetweenStyle) {
	document.querySelectorAll('.plus-container *, .new-media-btn-container').forEach((item, i) => {
		item.addEventListener(mouseEvent, function(e) {
			if (window.matchMedia('(min-width: 1025px)').matches) {
				document.getElementById('add-audio').className = addAudioClass;
				document.querySelector('.new-media-btn-container').style.display = nmbtnStyle;
				document.getElementById('plus-between').style.display = plusBetweenStyle;
			}
		});
	})
}

handlePlusMouseEvents('mouseover', 'rotate', 'block', 'block');
handlePlusMouseEvents('mouseout', 'rotate-back', 'none', 'none');

function handleMatch() {
	const filterEl = document.getElementById('filter-audio');
	if (window.matchMedia("(max-width: 460px)").matches) {
		const container = document.querySelector('.new-media-btn-container');
		container.style.display = "block";
	}

	const newButtonEls = document.querySelectorAll(".new-button");
	if (window.matchMedia("(min-width: 1025px)").matches) {
		const container = document.querySelector('.new-media-btn-container');
		for (let i = 0; i < newButtonEls.length; i++) {
			container.appendChild(newButtonEls[i]);
		}
	} else if (window.matchMedia("(min-width: 768px) and (max-width: 1024px)").matches) {
		const container = document.querySelector('.nav-container');
		for (let i = 0; i < newButtonEls.length; i++) {
			container.appendChild(newButtonEls[i]);
		}
	} else if (window.matchMedia("(max-width: 767px)").matches) {
		const container = document.querySelector('.plus-container');
		for (let i = 0; i < newButtonEls.length; i++) {
			container.appendChild(newButtonEls[i]);
		}
	}
}

window.addEventListener('resize', handleMatch);
window.addEventListener('load', handleMatch);
// document.querySelector('.search-bar-icon').addEventListener('click', function() {
// 	if (window.matchMedia("(max-width: )"))
// });
