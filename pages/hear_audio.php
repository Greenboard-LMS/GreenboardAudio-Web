<?php
$audioname = $_GET['audio'];
require('../../flytrap_connect.inc.php');
require('uniqueid.php');
$audioname = substr($audioname, 0, strlen($audioname) - 4);
$q = "SELECT id FROM audio_files WHERE file_name = '$audioname'";
$r = mysqli_query($dbc, $q);
$row = mysqli_fetch_array($r, MYSQLI_ASSOC);
$filename = @alphaid($row['id'], false, 10);
$path = "../../audio_uploads/" . $filename . substr($_GET['audio'], -4);
echo $path;
if(file_exists($path)) {
	$fs = filesize($path);

	header("Content-Type: audio/mpeg\n");
	header("Content-Disposition: inline; filename=\"{$_GET['audio']}\"\n");
	header("Content-Length: $fs\n");
  readfile($path);
} else {
  header("HTTP/1.0 404 Not Found");
}
