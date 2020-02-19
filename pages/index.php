<?php
require('header.html');
require('brand_header.html');
?>
<div class = "nav-container">
	<select id = 'filter-audio'>
		<option value = "owned">My Audios</option>
		<option value = "shared">Shared Audios</option>
		<option value = "all">All Audios</option>
	</select>
	<button id = 'new-folder-btn'>New Folder</button>
	<button id = 'new-audio-btn'>New Audio</button>
</div>
<div class = "file-list-container">
	<div class = "flexbox">
		<?php
		?>
		<a href = ""><img src = "https://static.makeuseof.com/wp-content/uploads/2013/05/dropbox3.png"><br><p>Audio A</p></a>
		<a href = ""><img src = "https://static.makeuseof.com/wp-content/uploads/2013/05/dropbox3.png"><br><p>Audio B</p></a>
		<a href = ""><img src = "https://static.makeuseof.com/wp-content/uploads/2013/05/dropbox3.png"><br><p>Audio C</p></a>
		<a href = ""><img src = "https://static.makeuseof.com/wp-content/uploads/2013/05/dropbox3.png"><br><p>Audio D</p></a>

	</div>
</div>
<div class = "plus-container">
	<a id = "add-audio" href = "add">+</a>
</div>
</div>
<script src = "scripts/script.js"></script>
</body>
</html>
