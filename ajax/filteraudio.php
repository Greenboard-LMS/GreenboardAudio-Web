<?php

require('../../flytrap_connect.inc.php');
session_start();
require_once('../pages/uniqueid.php');

$filter = $_GET['val'];
$folderid = isset($_GET['folder_id']) ? "= " . @alphaid($_GET['folder_id'], true, 10) : "IS NULL";

switch ($filter) {
	case "owned":
		$q = "SELECT id AS afid, file_name, time_created, user_id FROM audio_files WHERE user_id = {$_SESSION['id']} AND folder_id $folderid";
		break;
	case "shared":
		$q = "SELECT file_sharing.id, audio_files.file_name, audio_files.id AS afid, audio_files.time_created FROM file_sharing JOIN audio_files ON audio_files.id = file_sharing.file_id WHERE file_sharing.receiver_id = {$_SESSION['id']} AND file_sharing.folder_id $folderid";
		break;
	case "all":
		$q = "SELECT id, file_name, audio_files.id AS afid, audio_files.time_created FROM audio_files WHERE user_id = {$_SESSION['id']} AND folder_id $folderid";
		$q .= " UNION SELECT file_sharing.id, audio_files.file_name, audio_files.id AS afid, audio_files.time_created FROM file_sharing JOIN audio_files ON file_sharing.file_id = audio_files.id WHERE receiver_id = {$_SESSION['id']} AND file_sharing.folder_id $folderid";
		break;
}

$r = mysqli_query($dbc, $q);
$encoded = [];
while ($row = mysqli_fetch_array($r, MYSQLI_BOTH)) {
	$row['afid'] = @alphaid($row['afid'], false, 10);
    array_push($encoded, $row);
}
echo json_encode($encoded);

?>
