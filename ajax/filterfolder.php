<?php

require('../../flytrap_connect.inc.php');
session_start();

require_once('../pages/uniqueid.php');
$filter = $_GET['val'];
$parentid = isset($_GET['parent_id']) ? @alphaid($_GET['parent_id'], true, 10) : 0;

switch ($filter) {
	case "owned":
		$q = "SELECT id AS afid, folder_name, time_created, user_id FROM folders WHERE user_id = {$_SESSION['id']} AND parent_id = $parentid";
		break;
	case "shared":
		$q = "SELECT folder_sharing.id, folders.folder_name, folders.id AS afid FROM folder_sharing JOIN folders ON folders.id = folder_sharing.folder_id WHERE folder_sharing.receiver_id = {$_SESSION['id']} AND folder_sharing.parent_id = $parentid";
		break;
	case "all":
		$q = "SELECT id, folder_name, folders.id AS afid FROM folders WHERE user_id = {$_SESSION['id']} AND parent_id = $parentid";
		$q .= " UNION SELECT folder_sharing.id, folders.folder_name, folders.id AS afid FROM folder_sharing JOIN folders ON folder_sharing.folder_id = folders.id WHERE receiver_id = {$_SESSION['id']} AND folder_sharing.parent_id = $parentid";
		break;
}

$r = mysqli_query($dbc, $q);
$encoded = [];
while ($row = mysqli_fetch_array($r, MYSQLI_BOTH)) {
		$row['afid'] = alphaid($row['afid'], false, 10);
    array_push($encoded, $row);
}
echo json_encode($encoded);

?>
