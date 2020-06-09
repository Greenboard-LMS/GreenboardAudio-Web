<?php
	require('../../flytrap_connect.inc.php');
	session_start();

	$q = "INSERT INTO folders (user_id, folder_name) VALUES ({$_SESSION['id']}, 'Unnamed Folder')";
	$r = mysqli_query($dbc, $q);

	if (mysqli_affected_rows($dbc) != 1) {
		echo ["<p class = 'failure'>Error: The folder could not be added. Please try again.</p>"];
	} else {
		$q = "SELECT id FROM folders ORDER BY id DESC LIMIT 1";
		$r = mysqli_query($dbc, $q);
		if (mysqli_num_rows($r) == 1) {
			require('../pages/uniqueid.php');
			$row = mysqli_fetch_array($r, MYSQLI_BOTH);
			$foldername = "folder" . $row[0];
			echo json_encode(["", $row[0], alphaID($row[0], FALSE, 10), $foldername]);
		}

	}
?>
