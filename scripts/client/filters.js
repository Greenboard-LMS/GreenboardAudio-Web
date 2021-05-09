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
	const folderid = window.location.href.includes("folder") ? "&folder_id=" + window.location.href.substring(window.location.href.length - 10) : "";
	fetch('/ajax/filteraudio.php?val=' + val + folderid).then(response => {
		if (response.status >= 200 && response.status < 300) {
			return response.text();
		}
	}).then(response => {
		return JSON.parse(response);
	}).then(response => {
		document.querySelector('.files.flexbox').innerHTML = "";
		document.querySelector('table.files tbody').innerHTML = "";
		window.filterResponse = response;
		for (item in response) {
			addNewFile(response[item]);
		}
	});
};

function filterFolder(val) {
	const parentid = window.location.href.includes("folder") ? "&parent_id=" + window.location.href.substring(window.location.href.length - 10) : "";
	fetch('/ajax/filterfolder.php?val=' + val + parentid).then(response => {
		if (response.status >= 200 && response.status < 300) {
			return response.text();
		}
	}).then(response => {
		return JSON.parse(response);
	}).then(response => {
		document.querySelector('.folders.flexbox').innerHTML = "";
		document.querySelector('table.folders tbody').innerHTML = "";
		window.filterResponse = response;
		for (item in response) {
			addNewFolder(response[item]);
		}
	});
}

(function displayFilterSVGs() {
	 function createSVG(i) {
		 svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
		 svg.setAttribute('width', 90);
		 svg.setAttribute('height', 40);
		 filters = ['Mine', 'Shared', 'All'];
		 pentagon = document.createElementNS("http://www.w3.org/2000/svg", 'polygon');
		 // <polygon points="230,50 250,30 300,30 300,70 250,70" style="fill:lime;stroke:purple;stroke-width:1" />
		 pentagon.setAttribute('points', '10,20 20,0 90,0 90,40 20,40');
		 pentagon.setAttribute('fill', 'lightblue');
		 pentagon.setAttribute('stroke-width', 1);

		 purpose = document.createElementNS("http://www.w3.org/2000/svg", 'text');
		 purpose.textContent = filters[i];
		 purpose.setAttribute('x', '50%');
		 purpose.setAttribute('y', '50%');
		 purpose.setAttribute('text-anchor', 'middle')

		 svg.appendChild(pentagon);
		 svg.appendChild(purpose);
		 return svg;
	 }
	 const filterContainerEl = document.querySelector('.filter-container');
	 const childContainers = filterContainerEl.querySelectorAll('.files, .folders')
	 childContainers.forEach((item, i) => {
	 		for (let j = 0; j < 3; j++) {
				let mySVG = createSVG(j);
				item.appendChild(mySVG);
				mySVG.onclick = e => {
					mySVG.querySelector('polygon').setAttribute('points', '0,20, 20,0, 90,0 90,40 20,40');
					item.querySelectorAll("svg:not(:nth-child(" + (j + 1) + ")) > polygon").forEach((item, i) => {
						item.setAttribute('points', '10,20 20,0 90,0 90,40 20,40');
					});

					let fileOrFolder = i == 1 ? "Audio" : "Folder";
					fileOrFolder = "filter" + fileOrFolder;
					switch(mySVG.querySelector('text').textContent) {
						case "Mine":
							window[fileOrFolder]('owned');
							break;
						case "Shared":
							window[fileOrFolder]('shared');
							break;
						case "All":
							window[fileOrFolder]('all');
							break;
					}
				};
			}
	 });
})();
