<?php
session_start();
include('../../mysqli_connect.inc.php');
$q = "SELECT id FROM users WHERE email = \"{$_GET['email']}\" AND pass = \"{$_GET['password']}\"";
$r = mysqli_query($dbc, $q);
$row = mysqli_fetch_array($r, MYSQLI_ASSOC);
if (mysqli_num_rows($r) == 1) {
	$_SESSION['id'] = $row['id'];
	echo "OK";
}
?>
