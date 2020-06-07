<?php

require('../../flytrap_connect.inc.php');
session_start();

$filter = $_GET['val'];
switch ($filter) {
	case "owned":
		$q = "SELECT id AS afid, folder_name, time_created, user_id FROM folders WHERE user_id = {$_SESSION['id']} AND parent_id = 0";
		break;
	case "shared":
		$q = "SELECT folder_sharing.id, folders.folder_name, folders.id AS afid FROM folder_sharing JOIN folders ON folders.id = folder_sharing.folder_id WHERE folder_sharing.receiver_id = {$_SESSION['id']} ";
		break;
	case "all":
		$q = "SELECT id, folder_name, folders.id AS afid FROM folders WHERE user_id = {$_SESSION['id']} AND parent_id = 0";
		$q .= " UNION SELECT folder_sharing.id, folders.folder_name, folders.id AS afid FROM folder_sharing JOIN folders ON folder_sharing.folder_id = folders.id WHERE receiver_id = {$_SESSION['id']}";
		break;
}

$r = mysqli_query($dbc, $q);
$encoded = [];
while ($row = mysqli_fetch_array($r, MYSQLI_BOTH)) {
		require_once('../pages/uniqueid.php');
		$row['afid'] = alphaid($row['afid'], false, 10);
    array_push($encoded, $row);
}
echo json_encode($encoded);

?>
