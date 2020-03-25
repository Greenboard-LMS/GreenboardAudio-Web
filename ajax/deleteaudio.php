<?php
require('../../flytrap_connect.inc.php');
session_start();
if (isset($_SESSION['id'])) {
	if($_SESSION['id'] == $_REQUEST['user_id']) {
		if ($_REQUEST['audio_id']) {
			$q = "DELETE FROM audio_files WHERE user_id = {$_REQUEST['user_id']} AND id = {$_REQUEST['audio_id']}";
			$r = mysqli_query($dbc, $q);
			if (mysqli_affected_rows($dbc) == 1) {
				echo "The audio file was deleted";
			} else {
				echo "A system error occured and the audio file was not found";
			}
		} else {
			echo "A system error occured and the audio file could not be found.";
		}
	} else {
		echo "You are trying to delete another user's file. Deletion failed.";
	}
} else {
	echo "Your session is nonexistent. ";
}
?>
