<?php
session_start();
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
	<div class = "flexbox">
		<?php
		?>
		<a href = ""><img src = "https://static.makeuseof.com/wp-content/uploads/2013/05/dropbox3.png"><br><p>Audio A</p></a>
		<a href = ""><img src = "https://static.makeuseof.com/wp-content/uploads/2013/05/dropbox3.png"><br><p>Audio B</p></a>
		<a href = ""><img src = "https://static.makeuseof.com/wp-content/uploads/2013/05/dropbox3.png"><br><p>Audio C</p></a>
		<a href = ""><img src = "https://static.makeuseof.com/wp-content/uploads/2013/05/dropbox3.png"><br><p>Audio D</p></a>
		<a href = ""><img src = "https://static.makeuseof.com/wp-content/uploads/2013/05/dropbox3.png"><br><p>Audio E</p></a>
		<a href = ""><img src = "https://static.makeuseof.com/wp-content/uploads/2013/05/dropbox3.png"><br><p>Audio F</p></a>
		<a href = ""><img src = "https://static.makeuseof.com/wp-content/uploads/2013/05/dropbox3.png"><br><p>Audio G</p></a>
		<a href = ""><img src = "https://static.makeuseof.com/wp-content/uploads/2013/05/dropbox3.png"><br><p>Audio H</p></a>

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
