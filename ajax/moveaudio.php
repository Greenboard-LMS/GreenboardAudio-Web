<?php
require('../../flytrap_connect.inc.php');
session_start();

$newloc = $_POST['new_folder'];

$fileid = $_POST['file_id'];
if (isset($_POST['convert'])) {
	require('../pages/uniqueid.php');
	switch ($_POST['convert']) {
		case '1':
			$fileid = @alphaID($_POST['file_id'], true, 10);
			break;
		case '2':
			$fileid = @alphaID($_POST['file_id'], true, 10);
			$newloc = @alphaID($newloc, true, 10);
			break;
		case '3':
			$newloc = @alphaID($newloc, true, 10);
			break;
		default:
			$newloc = $_POST['new_folder'] != 0 ? $newloc : "NULL"; // If the query parameter is 0, it indicates going to the root directory
	}
}

$q = "SELECT user_id FROM audio_files WHERE id = $fileid";
$r = mysqli_query($dbc, $q);
$row = mysqli_fetch_array($r, MYSQLI_BOTH);

if (mysqli_num_rows($r) == 1) {
	if ($row['user_id'] == $_SESSION['id']) {
		$q = "UPDATE audio_files SET folder_id = $newloc WHERE id = $fileid";
		$r = mysqli_query($dbc, $q);
	} else {
		$q = "SELECT id, receiver_id FROM file_sharing";
		$r = mysqli_query($dbc, $q);
	}
} else {
	echo "<p class = 'failure'>That is not a valid ID.</p>";
	exit();
}

if (mysqli_affected_rows($dbc) == 1) {
	echo "<p class = 'success'>The audio file was moved</p>";
} else {
	echo "<p class = 'failure'>The audio file was not moved due to a system error. Please try again. </p>";
}

?>
