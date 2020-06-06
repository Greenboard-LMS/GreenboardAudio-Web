<?php
require('../../flytrap_connect.inc.php');
session_start();
if (isset($_SESSION['id'])) {
	$q = "SELECT id FROM firstborumdatabase.users WHERE email = \"{$_REQUEST['new_name']}\" LIMIT 1";
	$r = mysqli_query($dbc, $q);
	if (mysqli_num_rows($r) == 1) {
		$shareid = mysqli_fetch_array($r, MYSQLI_BOTH)[0];
		$q = "INSERT INTO folder_sharing (sharer_id, folder_id, receiver_id) VALUES ({$_REQUEST['user_id']}, {$_REQUEST['folder_id']}, $shareid)";
		$r = mysqli_query($dbc, $q);
		if (mysqli_affected_rows($dbc) == 1) {
			echo "<p class = 'success'>The folder was shared</p>";
		} else {
			echo "<p class = 'failure'>The folder was not shared due to a system error.</p>";
		}
	} else {
		echo "<p class = 'failure'>That email doesn't exist.</p>";
	}

} else {
	echo "<p class = 'failure'>Your session is nonexistent.</p>";
}
?>
