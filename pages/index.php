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
		<img src="http://cdn.bforborum.com/images/search-bar-icon.png" id = "search-bar-icon-img">
	</button>
	<input id="search-bar" onkeydown="" type="text" placeholder="Search your Flytrap">
</div>
<div class = "nav-container">
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
	<div class = "folders flexbox">
		<?php
		# Retrieve folders for this user
		require('../../flytrap_connect.inc.php');
		$q = "SELECT id, folder_name, time_created FROM folders WHERE user_id = {$_SESSION['id']}";
		$r = mysqli_query($dbc, $q);
		while ($row = mysqli_fetch_array($r, MYSQLI_BOTH)) {
			echo "<a href = ''>{$row['folder_name']}</a>";
		}
		?>
	</div>
	<div class = "files flexbox">
		<?php
		# Retrieve files for this user
		$q = "SELECT id, file_name FROM audio_files WHERE user_id = {$_SESSION['id']} AND folder_id IS NULL";
		$r = mysqli_query($dbc, $q);
		while ($row = mysqli_fetch_array($r, MYSQLI_BOTH)) {
			echo "<a href = ''><img src = 'images/microphone.png'><p>{$row['file_name']}</p></a>";
		}
		?>
	</div>
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
<div class = "new-media-btn-container"></div>
</div>
<script src = "scripts/script.js"></script>
</body>
</html>
