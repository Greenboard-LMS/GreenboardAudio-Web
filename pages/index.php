<?php
session_start();
$_SESSION['id'] = 74;
if(!isset($_SESSION['id'])) {
	require('notloggedin.html');
	exit();
}
$page_title = "My Flytrap";
require('brand_header.html');
?>
<div class = "search-bar-container">
	<button class = "search-bar-icon">
		<img class = 'grey-circle' src="http://cdn.bforborum.com/images/search-bar-icon.png" id = "search-bar-icon-img">
	</button>
	<input id="search-bar" onkeydown="" type="text" placeholder="Search your Flytrap">
</div>
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
		require('../../flytrap_connect.inc.php');
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
		$q = "SELECT id, file_name FROM audio_files WHERE user_id = {$_SESSION['id']} AND folder_id IS NULL";
		$r = mysqli_query($dbc, $q);
		while ($row = mysqli_fetch_array($r, MYSQLI_BOTH)) {
			echo "
			<li id = \"file-{$row['id']}\">
				<a href = ''>
					<img src = 'images/microphone.png'>
					<p>{$row['file_name']}</p>
				</a>
				<div class = 'customize-btns'>
					<button class = 'rename-audio'><img class = 'grey-circle' src = 'http://cdn.bforborum.com/images/Edit.png'></button>
					<button class = 'delete-audio'><img class = 'grey-circle' src = 'http://cdn.bforborum.com/images/Delete.png'></button>
					<button class = 'share-audio'><img class = 'grey-circle' src = 'http://cdn.bforborum.com/images/register.png'></button>
				</div>
			</li>";
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
	<form>
		<label class="audio-option custom-file-upload">
	    <input type="file"/>
    	Upload mp3, wav, m4a
		</label>
		<img height = "200" id = 'upload-file-arrow' src = "images/UploadFileArrow.png">
	</form>
</div>
<div style = "display: none" class = "share-container">
	<input type = "submit" value = "Share">
</div>
<div style = "display: none" class = "delete-container">
	<input type = "button" value = "Cancel" onclick = "this.parentElement.style.display = 'none';">
	<input type = "button" value = "Delete" onclick = "deleteAudioFile(<?php echo $_SESSION['id']; ?>)">
</div>
<div class = "new-media-btn-container"></div>
</div>
<script src = "scripts/script.js"></script>
<script src = "scripts/popupBox.js"></script>
<script src = "scripts/filters.js"></script>
<script src = "scripts/media.js"></script>
<script src = "scripts/inPopups.js"></script>
</body>
</html>
