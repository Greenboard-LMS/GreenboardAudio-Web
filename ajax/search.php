<?php
session_start();
include('../../flytrap_connect.inc.php');

$sq = $_GET['q'];
$q = "SELECT id, file_name, time_created, user_id FROM audio_files WHERE file_name LIKE '%$sq%' AND user_id = {$_SESSION['id']} AND folder_id IS NULL";
$r = mysqli_query($dbc, $q);
echo json_encode(mysqli_fetch_all($r));
?>
