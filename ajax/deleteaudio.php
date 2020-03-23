<?php
require('../../flytrap_connect.inc.php');
session_start();
if (isset($_SESSION['id']) && $_SESSION['id'] == $_REQUEST['user_id']) {
	$q = "DELETE FROM audio_files WHERE user_id = {$_REQUEST['user_id']} AND id = {$_REQUEST['audio_id']}";
	$r = mysqli_query($dbc, $q);
	if (mysqli_affected_rows($dbc) == 1) {
		echo "The audio file was deleted";
	}
}
?>
