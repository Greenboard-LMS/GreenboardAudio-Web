<?php
require('../../flytrap_connect.inc.php');
session_start();
if (isset($_SESSION['id'])) {
	echo $_SESSION['id'];
	$q = "INSERT INTO file_sharing (user_id, receiver_id, file_id, sharer_id) VALUES ({$_REQUEST['user_id']}, {$_REQUEST['share_id']}, {$_REQUEST['audio_id']}, {$_SESSION['id']})";
	$r = mysqli_query($dbc, $q);
	if (mysqli_affected_rows($dbc) == 1) {
		echo "<p class = 'success'>The audio file was shared</p>";
	}
} else {
	echo "<p class = 'failure'>Your session is nonexistent.</p>";
}
?>
