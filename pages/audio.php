<?php
session_start();

require('../../flytrap_connect.inc.php');
require('uniqueid.php');

$alphaid = $_GET['id'];
$numid = @alphaid($_GET['id'], true, 10);

$q = "SELECT id, file_name FROM audio_files WHERE id = $numid";
$r = mysqli_query($dbc, $q);
$row = mysqli_fetch_array($r, MYSQLI_ASSOC);

$page_title = "{$row['file_name']} | Flytrap";
$css = "<link href = '/css/usercontent.css' rel = 'stylesheet' type = 'text/css'>";

require('brand_header.html');
?>
<div class = "metadata-container">

<?php

echo "<h1>" . $row['file_name'] . "</h1>";

?>
</div>
<div class = "audio-file-container">
	<audio controls>
		<source src="/hear_audio?audio=<?php echo $row['file_name']; ?>.mp3" type="audio/mpeg">
		Your browser does not support the audio tag.
	</audio>
</div>
</body>
</html>
