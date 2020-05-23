<?php

require('../../flytrap_connect.inc.php');
session_start();
$new_name = urlencode($_REQUEST['new_name']);
$q = "UPDATE folders SET folder_name = \"{$_REQUEST['new_name']}\" WHERE id = {$_REQUEST['folder_id']}";
echo $q;
$r = mysqli_query($dbc, $q);
if (mysqli_affected_rows($dbc) == 1) {
	echo "<p class = 'success'>The folder name was updated</p>";
} else {
	echo "<p class = 'failure'>Error: the file was not updated</p>";
}

?>
