<?php
require('../../flytrap_connect.inc.php');
session_start();

$q = "UPDATE audio_files SET folder_id = {$_POST['new_folder']} WHERE id = {$_POST['file_id']}";
$r = mysqli_query($dbc, $q);
if (mysqli_affected_rows($dbc) == 1) {
	echo "<p class = 'success'>The folder was moved</p>";
} else {
	echo "<p class = 'failure'>The folder was not moved due to a system error. Please try again. </p>";
}

?>
