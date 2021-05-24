const FILTER_STATE = {
	OWNED: "Owned",
	SHARED: "Shared",
	ALL: "All",
};

Object.freeze(FILTER_STATE);

const flexViewEls = document.querySelectorAll(".file-list-container ul");

const clearNodeChildren = node => {
	while (node.firstChild) {
  		node.removeChild(node.lastChild);
	}
}

function filterAudio(filterState) {
	clearNodeChildren(document.querySelector('.files.flexbox'));

	for (file of Datastore.audio.data) {
		console.log(file);
		if (file.source === filterState.toLowerCase() || filterState === FILTER_STATE.ALL) {
			addNewFile(file);
		}
	}
}

function filterFolder(filterState) {
	clearNodeChildren(document.querySelector('.folders.flexbox'));

	for (folder of Datastore.folder.data) {
		console.log(folder);
		if (folder.source === filterState.toLowerCase() || filterState === FILTER_STATE.ALL)
			addNewFolder(folder);
	}
}

(function displayFilterSVGs() {
	function createSVG(i) {
		svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		svg.setAttribute("width", 90);
		svg.setAttribute("height", 40);
		filters = Object.values(FILTER_STATE);

		pentagon = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"polygon"
		);
		// <polygon points="230,50 250,30 300,30 300,70 250,70" style="fill:lime;stroke:purple;stroke-width:1" />
		pentagon.setAttribute("points", "10,20 20,0 90,0 90,40 20,40");
		pentagon.setAttribute("fill", "lightblue");
		pentagon.setAttribute("stroke-width", 1);

		purpose = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"text"
		);
		purpose.textContent = filters[i];
		purpose.setAttribute("x", "50%");
		purpose.setAttribute("y", "50%");
		purpose.setAttribute("text-anchor", "middle");

		svg.appendChild(pentagon);
		svg.appendChild(purpose);
		return svg;
	}
	const filterContainerEl = document.querySelector(".filter-container");
	const childContainers =
		filterContainerEl.querySelectorAll(".files, .folders");
	childContainers.forEach((item, i) => {
		for (let j = 0; j < 3; j++) {
			let mySVG = createSVG(j);
			item.appendChild(mySVG);
			mySVG.onclick = e => {
				mySVG
					.querySelector("polygon")
					.setAttribute("points", "0,20, 20,0, 90,0 90,40 20,40");
				item.querySelectorAll(
					"svg:not(:nth-child(" + (j + 1) + ")) > polygon"
				).forEach((item, i) => {
					item.setAttribute("points", "10,20 20,0 90,0 90,40 20,40");
				});

				let fileOrFolder = i == 1 ? "Audio" : "Folder";
				fileOrFolder = "filter" + fileOrFolder;

				// Dynamically call filterAudio or filterFolder with correct FILTER_STATE as parameter
				window[fileOrFolder](mySVG.querySelector("text").textContent);
			};
		}
	});
})();
