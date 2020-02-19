document.querySelector('.plus-container').addEventListener('mouseover', function(e) {
	document.getElementById('add-audio').className = 'rotate';
});

document.querySelector('.plus-container').addEventListener('mouseout', function(e) {
	document.getElementById('add-audio').className = 'rotate-back';
});
