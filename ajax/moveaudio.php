<?php
require('../../flytrap_connect.inc.php');
session_start();

$newloc = $_POST['new_folder'] != 0 ? $_POST['new_folder'] : "NULL"; // If the query parameter is 0, it indicates going to the root directory

$q = "SELECT id, user_id FROM audio_files";
$r = mysqli_query($dbc, $q);
$row = mysqli_fetch_array($r, MYSQLI_BOTH);

if ($row['user_id'] == $_SESSION['id']) {
	$q = "UPDATE audio_files SET folder_id = $newloc WHERE id = {$_POST['file_id']}";
	$r = mysqli_query($dbc, $q);
} else {
	$q = "SELECT id, receiver_id FROM file_sharing";
	$r = mysqli_query($dbc, $q);
}

if (mysqli_affected_rows($dbc) == 1) {
	echo "<p class = 'success'>The audio file was moved</p>";
} else {
	echo "<p class = 'failure'>The audio file was not moved due to a system error. Please try again. </p>";
}

?>
