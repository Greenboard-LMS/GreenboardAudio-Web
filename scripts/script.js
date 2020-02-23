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
