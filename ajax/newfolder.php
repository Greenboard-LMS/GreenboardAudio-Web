<?php
	require('../../flytrap_connect.inc.php');
	session_start();

	$q = "SELECT COUNT(*) FROM folders";
	$r = mysqli_query($dbc, $q);
	$row = mysqli_fetch_array($r, MYSQLI_NUM);
	$count = $row[0];
	$foldername = 'folder' . ($count + 1);

	$q = "INSERT INTO folders (user_id, folder_name) VALUES ({$_SESSION['id']}, '$foldername')";
	$r = mysqli_query($dbc, $q);

	if (mysqli_affected_rows($dbc) != 1) {
		echo ["<p class = 'failure'>Error: The folder could not be added. Please try again.</p>"];
	} else {
		require('../pages/uniqueid.php');
		echo json_encode(["", $count + 1, alphaID($count + 1), $foldername]);
	}
?>
