<?php

$page_title = "Search your Flytrap";
require('brand_header.html');
require('search.html');

include('../../flytrap_connect.inc.php');

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
		<div class = "slider"></div>
	</div>
	<select id = 'filter-audio'>
		<option value = "owned">My Audios</option>
		<option value = "shared">Shared Audios</option>
		<option value = "all">All Audios</option>
	</select>
	<button class = "new-button" id = 'new-audio-btn'>
		<img id = 'new-audio-icon' src = 'images/NewAudio.png'>
		<span>New Audio</span>
	</button>
	<button class = "new-button" id = 'new-folder-btn'>
		<img id = 'new-folder-icon' src = "images/NewFolder.png">
		<span>New Folder</span>
	</button>
</div>
<div class = "file-list-container">
	<ul class = "folders flexbox">
		<?php
		# Retrieve folders for this user
		$q = "SELECT id, folder_name, time_created FROM folders WHERE user_id = {$_SESSION['id']}";
		$r = mysqli_query($dbc, $q);
		while ($row = mysqli_fetch_array($r, MYSQLI_BOTH)) {
			echo "<li><a href = ''>{$row['folder_name']}</a></li>";
		}
		?>
	</ul>
	<ul class = "files flexbox">
		<?php
		# Retrieve files for this user
		if (isset($_GET['q'])) {
			$sq = $_GET['q'];
			$q = "SELECT id, file_name, time_created, user_id FROM audio_files WHERE file_name LIKE '%$sq%' AND user_id = {$_SESSION['id']} AND folder_id IS NULL";
			$r = mysqli_query($dbc, $q);
			$encoded = [];
			while ($row = mysqli_fetch_array($r, MYSQLI_BOTH)) {
			    array_push($encoded, $row);
			}
			$data = json_encode($encoded);
			echo "<script>
			window.addEventListener('DOMContentLoaded', function() {
				let x = $data;
				console.log(x);
				for (item in x) {
					addNewFile(x[item]);
					console.log(item);
				}
			});
			</script>";
		}
			?>
	</ul>
	<table style = "display:none" class = "folders">
		<thead>
			<tr>
				<th>Name</th>
				<th>Date Created</th>
		</thead>
		<tbody>
			<?php
			# Retrieve files for this user
			$q = "SELECT id, folder_name, time_created FROM folders WHERE user_id = {$_SESSION['id']}";
			$r = mysqli_query($dbc, $q);
			while ($row = mysqli_fetch_array($r, MYSQLI_BOTH)) {
				echo "
				<tr>
					<td>{$row['folder_name']}</td>
					<td>{$row['time_created']}</td>
				</tr>";
			}
			?>
		</tbody>
	</table>
	<table class = "files" style = "display: none">
		<thead>
			<tr>
				<th>Name</th>
				<th>Date Created</th>
			</tr>
		</thead>
		<tbody>
			<?php
			# Retrieve files for this user
			$q = "SELECT id, file_name, time_created FROM audio_files WHERE user_id = {$_SESSION['id']} AND folder_id IS NULL";
			$r = mysqli_query($dbc, $q);
			while ($row = mysqli_fetch_array($r, MYSQLI_BOTH)) {
				echo "
				<tr>
					<td>{$row['file_name']}</td>
					<td>{$row['time_created']}</td>
				</tr>";
			}
			?>
		</tbody>
	</table>
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
		<button class = "audio-option">Record directly</button>
	</div>
	<!-- Vertical line -->
	<span class = "vertical-line"></span>
	<!-- Upload file -->
	<form id = 'upload-form' action = '' enctype = 'multipart/form-data'>
		<label class="audio-option custom-file-upload">
	    <input multiple id = "audio-files" name = "file" type="file"/>
    	Upload mp3, wav, m4a
		</label>
		<img height = "200" id = 'upload-file-arrow' src = "images/UploadFileArrow.png">
		<progress style = 'display:none' value = "0" max = "100" id = 'upload-file-progress-bar'></progress>
	</form>
</div>
<div style = "display: none" class = "action-container rename-container">
	<img src = "images/Exit.png">
	<input type = "text" value = "">
	<input type = "button" value = "Rename" onclick = "renameAudioFile(<?php echo $_SESSION['id']; ?>, this.parentElement.id.substring(11))">
</div>
<div style = "display: none" class = "action-container share-container">
	<img src = "images/Exit.png">
	<input type = "text" placeholder = "Insert recipient's email">
	<input onclick = "shareAudioFile()" type = "button" value = "Share">
</div>
<div style = "display: none" class = "action-container delete-container">
	<p>Are you sure you want to <strong>permanently</strong> delete this file? You will not be able to get it back.</p>
	<input type = "button" value = "Cancel" onclick = "this.parentElement.style.display = 'none';">
	<input type = "button" value = "Delete" onclick = "deleteAudioFile(<?php echo $_SESSION['id']; ?>, this.parentElement.id.substring(11))">
</div>
<div class = "new-media-btn-container"></div>
<div class = "status-container" style = "display: none"></div>
</div>
<script src = "scripts/script.js"></script>
<script src = "scripts/popupBox.js"></script>
<script src = "scripts/filters.js"></script>
<script src = "scripts/media.js"></script>
<script src = "scripts/inPopups.js"></script>
<script>document.getElementById('search-bar').value = '<?php echo isset($_GET['q']) ? $_GET['q'] : ''; ?>'</script>
