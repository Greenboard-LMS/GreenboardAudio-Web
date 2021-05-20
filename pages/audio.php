<?php
session_start();

require('../../flytrap_connect.inc.php');

$page_title = "Flytrap";
$css = "<link href = '/css/usercontent.css' rel = 'stylesheet' type = 'text/css'>";

require('brand_header.html');
?>
<div class = "metadata-container">

<?php

//echo "<h1>" . $row['file_name'] . "</h1>";

?>
</div>
<div class = "audio-file-container">
	<audio controls>
		<source src="/pages/hear_audio.php?audio=<?php echo $_GET["id"]; ?>" type="audio/mpeg">
		Your browser does not support the audio tag.
	</audio>
</div>
</body>
</html>
