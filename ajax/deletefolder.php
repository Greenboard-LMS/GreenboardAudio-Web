<?php
require('../../flytrap_connect.inc.php');
session_start();
if (isset($_SESSION['id'])) {
	if($_SESSION['id'] == $_REQUEST['user_id']) {
		if ($_REQUEST['folder_id']) {
			$q = "DELETE FROM folders WHERE user_id = {$_REQUEST['user_id']} AND id = {$_REQUEST['folder_id']}";
			$r = mysqli_query($dbc, $q);
			if (mysqli_affected_rows($dbc) == 1) {
				echo "<p class = 'success'>The folder was deleted</p>";
			} else {
				echo "<p class = 'failure'>A system error occured and the folder was not found</p>";
			}
		} else {
			echo "<p class = 'failure'>A system error occured and the folder could not be found.</p>";
		}
	} else {
		echo "<p class = 'failure'>You are trying to delete another user's folder. Deletion failed.</p>";
	}
} else {
	echo "<p class = 'failure'>Your session is nonexistent. Deletion cancelled.</p>";
}
?>
