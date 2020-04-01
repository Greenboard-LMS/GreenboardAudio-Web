<?php

require('../../flytrap_connect.inc.php');
session_start();

$q = "UPDATE audio_files SET file_name = \"{$_REQUEST['new_name']}\" WHERE id = {$_REQUEST['audio_id']}";
$r = mysqli_query($dbc, $q);
if (mysqli_affected_rows($dbc) == 1) {
	echo "<p class = 'success'>The file name was updated</p>";
} else {
	echo "<p class = 'failure'>A system error occured. The file was not updated.</p>";
}

?>
