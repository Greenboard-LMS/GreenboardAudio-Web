<?php

$page_title = "Search your Flytrap";
require('brand_header.html');
require('search.html');

include('../../flytrap_connect.inc.php');

$sq = $_GET['q'];
$q = "SELECT id, file_name, time_created, user_id FROM audio_files WHERE file_name LIKE '%$sq%' AND user_id = {$_SESSION['id']} AND folder_id IS NULL";
$r = mysqli_query($dbc, $q);
