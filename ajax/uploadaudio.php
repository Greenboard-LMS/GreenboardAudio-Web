<?php
	foreach ($_FILES as $file) {
		var_dump($file);
		move_uploaded_file($file['tmp_name'], "../../audio_uploads/" . $file['name']);
	}
?>
