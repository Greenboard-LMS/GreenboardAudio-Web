<?php
session_start();

require('../../flytrap_connect.inc.php');

$page_title = "Flytrap";
$css = "<link href = '/css/usercontent.css' rel = 'stylesheet' type = 'text/css'>";

require('brand_header.html');
$totype = "Folder";
require('search.html');
?>
<div class = "nav-container">
	<div id = 'filter-view'>
		<svg height="12" width="12">
			<line x1="0" y1="1" x2="12" y2="1" style="stroke:rgb(0,0,0);stroke-width:2" />
			<line x1="0" y1="6" x2="12" y2="6" style="stroke:rgb(0,0,0);stroke-width:2" />
			<line x1="0" y1="11" x2="12" y2="11" style="stroke:rgb(0,0,0);stroke-width:2" />
			Sorry, your browser does not support inline SVG.
		</svg>
		<svg height="12" width="12">
			<line x1="1" y1="0" x2="1" y2="12" style="stroke:rgb(0,0,0);stroke-width:2" />
			<line x1="6" y1="0" x2="6" y2="12" style="stroke:rgb(0,0,0);stroke-width:2" />
			<line x1="11" y1="0" x2="11" y2="12" style="stroke:rgb(0,0,0);stroke-width:2" />
			Sorry, your browser does not support inline SVG.
		</svg>
		<div class = "slider" style = "<?php echo isset($_GET['sortby']) ? 'left: 0px' : 'left: 18px'; ?>"></div>
	</div>

	<button class = "new-button" id = 'new-audio-btn'>
		<img id = 'new-audio-icon' src = '/images/NewAudio.png'>
		<span>New Audio</span>
	</button>
	<button class = "new-button" id = 'new-folder-btn' onclick = "showNameFolderPopupBox()">
		<img id = 'new-folder-icon' src = "/images/NewFolder.png">
		<span>New Folder</span>
	</button>
</div>
<!-- <div class = "metadata-container">

<?php

//echo "<h1>" . $row['folder_name'] . "</h1>";

?>
</div> -->
<div class = "map-container">
	<a href = "<?php echo $row['parent_id'] != 0 ? @alphaID($row['parent_id'], false, 10) : '/'; ?>">Go to Parent Folder</a>
	<figure class = 'move-to-parent-folder'>
		<li id = "folder-<?php echo $row['parent_id']; ?>">
			<figcaption>Move up a folder</figcaption>
			<img ondragover = "moveDragOver(event)" ondrop = "moveDrop(event)" src = "/images/closedbox.png" height = "100">
		</li>
	</figure>
	<figure class = 'move-to-root-folder'>
		<li id = "folder-0">
			<figcaption>Move to root folder</figcaption>
			<img ondragover = "moveDragOver(event)" ondrop = "moveDrop(event)" src = "/images/closedbox.png" height = "100">
		</li>
	</figure>
	<button class = "advanced-btn">Advanced >></button>
</div>
<div class = "file-list-container">
	<ul class = "folders flexbox"></ul>
	<ul class = "files flexbox"></ul>
</div>
<div class = "plus-container">
	<a id = "add-audio">+</a>
	<div id = 'plus-between' style="
    width: 40px;
    height: 50px;
		background: none;
		display: none;
    position: absolute;
		"></div>
</div>
<div style = "display: none" class = "new-file-box-container">
	<!-- Record audio -->
	<div>
		<button class = "audio-option" onclick = "recordDirectly()">Record directly</button><br>
		<button class = "stop-recording">Stop Recording</button>
		<video style = "display:none" autoplay></video>
		<input id = 'volume' type = 'range' min = '1' max = '10'>
	</div>
	<!-- Vertical line -->
	<span class = "vertical-line"></span>
	<!-- Upload file -->
	<form id = 'upload-form' action = '' enctype = 'multipart/form-data'>
		<label class="audio-option custom-file-upload">
	    <input multiple id = "audio-files" name = "file" type="file"/>
    	Upload mp3, wav, m4a
		</label>
		<img height = "200" id = 'upload-file-arrow' src = "/images/UploadFileArrow.png">
		<progress style = 'display:none' value = "0" max = "100" id = 'upload-file-progress-bar'></progress>
	</form>
</div>
<div class="filter-container">
	<div class="folders">
	</div>
	<div class="files">
	</div>
</div>
<div style = "display: none" class = "action-container rename-container">
	<img src = "/images/Exit.png">
	<input type = "text" value = "">
	<input type = "button" value = "Rename" onclick = "renameAudioFile(<?php echo $_SESSION['id']; ?>, this.parentElement.id)">
</div>
<div style = "display: none" class = "action-container share-container">
	<img src = "/images/Exit.png">
	<input id = 'share-file-email' type = "text" placeholder = "Insert recipient's email">
	<input onclick = "shareAudioFile(<?php echo $_SESSION['id']; ?>, this.parentElement.id)" type = "button" value = "Share">
</div>
<div style = "display: none" class = "action-container delete-container">
	<p>Are you sure you want to <strong>permanently</strong> delete this file? You will not be able to get it back.</p>
	<input type = "button" value = "Cancel" onclick = "this.parentElement.style.display = 'none';">
	<input type = "button" value = "Delete" onclick = "deleteAudioFile(<?php echo $_SESSION['id']; ?>, this.parentElement.id.substring(17))">
</div>
<div style = "display: none" class = "action-container rename-container">
	<img src = "/images/Exit.png">
	<input type = "text" value = "">
	<input type = "button" value = "Rename" onclick = "renameFolder(<?php echo $_SESSION['id']; ?>, this.parentElement.id)">
</div>
<div style = "display: none" class = "action-container create-container">
	<img src = "/images/Exit.png" />
	<label>File Name</label>
	<input name="filename" value="New Audio" focus />
	<button>Cancel</button>
	<button onclick = "createNewFile(<?php echo $_SESSION['userApiKey']; ?>, this.previousElementSibling.value)">Create</button>
</div>
<div style = "display: none" class = "action-container create-container">
	<img src = "/images/Exit.png" />
	<label>Folder Name</label>
	<input name="foldername" value="New Folder" focus />
	<button>Cancel</button>
	<button onclick = "createNewFolder('<?php echo $_SESSION['userApiKey']; ?>', this.parentElement.querySelector(`input[name='foldername']`).value)">Create</button>
</div>
<div style = "display: none" class = "action-container share-container">
	<img src = "/images/Exit.png">
	<input type = "text" id = "share-folder-email" placeholder = "Insert recipient's email">
	<input onclick = "shareFolder(<?php echo $_SESSION['id']; ?>, this.parentElement.id)" type = "button" value = "Share">
</div>
<div style = "display: none" class = "action-container delete-container">
	<p>Are you sure you want to <strong>permanently</strong> delete this folder? You will not be able to get it back.</p>
	<input type = "button" value = "Cancel" onclick = "this.parentElement.style.display = 'none';">
	<input type = "button" value = "Delete" onclick = "deleteFolder(<?php echo $_SESSION['id']; ?>, this.parentElement.id.substring(18))">
</div>
<div style = "display: none" class = "change-id-container">
		<div class = "file-list-container" style = "overflow: auto">
			<ul class = "folders flexbox"></ul>
			<ul class = "files flexbox"></ul>
		</div>
		<p>Enter the id of the parent folder to which you would like the file or folder you would like to move. Leave it blank for root directory.</p>
		<input type = "text" size = "50" value = "https://audio.borumtech.com/folders/">
		<input type = "button" value = "Move" onclick = "moveAdvancedItem()">
</div>
<div class = "new-media-btn-container"></div>
<div class = "status-container" style = "display: none"></div>
<script src = "../scripts/script.js"></script>
<script src = "../scripts/popupBox.js"></script>
<script src = "../scripts/filters.js"></script>
<script src = "../scripts/media.js"></script>
<script src = "../scripts/inPopups.js"></script>
<script src = "../scripts/microphoneinput.js"></script>
<script src = "../scripts/requests.js"></script>

<?php 
echo "<script>
getAndDisplayFolderElements('" . $_SESSION["userApiKey"] . "', '" . $_GET['id'] . "');
</script>"

?>
</body>
</html>
