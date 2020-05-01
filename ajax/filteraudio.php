<?php

require('../../flytrap_connect.inc.php');
session_start();

$filter = $_GET['val'];
switch ($filter) {
	case "owned":
		$q = "SELECT id, file_name, time_created, user_id FROM audio_files WHERE user_id = {$_SESSION['id']} AND folder_id IS NULL";
		break;
	case "shared":
		$q = "SELECT file_sharing.id, audio_files.file_name FROM file_sharing JOIN audio_files ON audio_files.id = file_sharing.file_id WHERE file_sharing.receiver_id = {$_SESSION['id']} ";
		break;
	case "all":
		$q = "SELECT id, file_name FROM audio_files WHERE user_id = {$_SESSION['id']} AND folder_id IS NULL";
		$q .= " UNION SELECT file_sharing.id, audio_files.file_name FROM file_sharing JOIN audio_files ON file_sharing.file_id = audio_files.id WHERE receiver_id = {$_SESSION['id']}";
		break;
}

$r = mysqli_query($dbc, $q);
$encoded = [];
while ($row = mysqli_fetch_array($r, MYSQLI_BOTH)) {
    array_push($encoded, $row);
}
echo json_encode($encoded);

?>
