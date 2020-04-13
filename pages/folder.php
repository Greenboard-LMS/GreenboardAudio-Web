<?php
session_start();

require('../../flytrap_connect.inc.php');
require('uniqueid.php');

$alphaid = $_GET['id'];
$numid = @alphaid($_GET['id'], true, 10);

$q = "SELECT id, folder_name FROM folders WHERE id = $numid";
$r = mysqli_query($dbc, $q);
$row = mysqli_fetch_array($r, MYSQLI_ASSOC);

$page_title = "{$row['folder_name']} | Flytrap";
$css = "<link href = '/css/usercontent.css' rel = 'stylesheet' type = 'text/css'>";

require('brand_header.html');
?>
<div class = "metadata-container">

<?php

echo "<h1>" . $row['folder_name'] . "</h1>";

?>
</div>
<div class = "file-list-container">

	<ul class = "files flexbox">
		<?php
		$q = "SELECT id, file_name FROM audio_files WHERE folder_id = $numid";
		$r = mysqli_query($dbc, $q);
		while ($row = mysqli_fetch_array($r, MYSQLI_BOTH)) {

			$alphaid = alphaid($row['id'], false, 10);
			echo "
			<li id = \"file-{$row['id']}\">
				<a href = 'audio/$alphaid'>
					<img src = '/images/microphone.png'>
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
	<ul class = "folders flexbox">
		<?php
		$q = "SELECT id, folder_name, time_created FROM folders WHERE parent_id = $numid";
		$r = mysqli_query($dbc, $q);
		while ($row = mysqli_fetch_array($r, MYSQLI_BOTH)) {
			$alphaid = alphaid($row['id'], false, 10);
			echo "<li><a href = 'folders/$alphaid'>{$row['folder_name']}</a></li>";
		}
		?>
	</ul>
</div>
