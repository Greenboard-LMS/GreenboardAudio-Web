document.querySelectorAll('.plus-container *, .new-media-btn-container').forEach((item, i) => {
	item.addEventListener('mouseover', function(e) {
		document.getElementById('add-audio').className = 'rotate';
		document.querySelector('.new-media-btn-container').style.display = "block";
		document.getElementById('plus-between').style.display = "block";
	});
});

document.querySelectorAll('.plus-container, .new-media-btn-container').forEach((item, i) => {
	item.addEventListener('mouseout', function(e) {
		document.getElementById('add-audio').className = 'rotate-back';
		document.querySelector('.new-media-btn-container').style.display = "none";
		document.getElementById('plus-between').style.display = "none";
	});
});

const newButtonEls = document.querySelectorAll(".new-button");

function handleMatch(e) {
	if (e.matches) {
		const container = document.querySelector('.new-media-btn-container');
		for (let i = 0; i < newButtonEls.length; i++) {
			container.appendChild(newButtonEls[i]);
		}
	} else if (window.matchMedia("(min-width: 768px) and (max-width: 1024px)").matches) {
		const container = document.querySelector('.nav-container');
		for (let i = 0; i < newButtonEls.length; i++) {
			container.appendChild(newButtonEls[i]);
		}
	} else if (window.matchMedia("(min-width: 500px) and (max-width: 767px)").matches) {

	}
}
const ml = window.matchMedia("(min-width: 1025px)");
handleMatch(ml);
ml.addListener(handleMatch);
