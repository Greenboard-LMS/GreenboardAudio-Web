<?php

require('../../flytrap_connect.inc.php');
session_start();

$q = "UPDATE folders SET folder_name = \"{$_REQUEST['new_name']}\" WHERE id = {$_REQUEST['folder_id']}";
$r = mysqli_query($dbc, $q);
if (mysqli_affected_rows($dbc) == 1) {
	echo "<p class = 'success'>The folder name was updated</p>";
} else {
	echo "<p class = 'failure'>Error: the file was not updated</p>";
}

?>
