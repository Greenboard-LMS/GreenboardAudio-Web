<?php
require('../../flytrap_connect.inc.php');
session_start();

$newloc = $_POST['new_folder'] != 0 ? $_POST['new_folder'] : "NULL"; // If the query parameter is 0, it indicates going to the root directory

$q = "UPDATE audio_files SET folder_id = $newloc WHERE id = {$_POST['file_id']}";
$r = mysqli_query($dbc, $q);

if (mysqli_affected_rows($dbc) == 1) {
	echo "<p class = 'success'>The folder was moved</p>";
} else {
	echo "<p class = 'failure'>The folder was not moved due to a system error. Please try again. </p>";
}

?>
