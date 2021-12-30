<?php

$page_title = "Search your Flytrap";
require('brand_header.html');
require('search.html');

include('../../flytrap_connect.inc.php');
$searchquery = mysqli_real_escape_string($dbc, trim($_GET['q']))
?>
<div class = "nav-container">
	<div id = 'filter-view'>
		<svg height="12" width="12">
			<line x1="0" y1="1" x2="12" y2="1" style="stroke:rgb(0,0,0);stroke-width:2" />
			<line x1="0" y1="6" x2="12" y2="6" style="stroke:rgb(0,0,0);stroke-width:2" />
			<line x1="0" y1="11" x2="12" y2="11" style="stroke:rgb(0,0,0);stroke-width:2" />
			Sorry, your browser does not support inline SVG.
		</svg>
		<svg height="12" width="12">
			<line x1="1" y1="0" x2="1" y2="12" style="stroke:rgb(0,0,0);stroke-width:2" />
			<line x1="6" y1="0" x2="6" y2="12" style="stroke:rgb(0,0,0);stroke-width:2" />
			<line x1="11" y1="0" x2="11" y2="12" style="stroke:rgb(0,0,0);stroke-width:2" />
			Sorry, your browser does not support inline SVG.
		</svg>
		<div class = "slider"></div>
	</div>
</div>
<div class = "file-list-container">
	<ul class = "folders flexbox">
		<?php
		# Retrieve files for this user
		if (isset($searchquery)) {
			$q = "SELECT id, folder_name, time_created, user_id FROM folders WHERE folder_name LIKE '%$searchquery%' AND user_id = {$_COOKIE['id']} AND parent_id = 0";
			$r = mysqli_query($dbc, $q);
			$encoded = [];
			while ($row = mysqli_fetch_array($r, MYSQLI_BOTH)) {
			    array_push($encoded, $row);
			}
			$data = json_encode($encoded);
			echo "<script>
			window.addEventListener('DOMContentLoaded', function() {
				let x = $data;
				console.log(x);
				for (item in x) {
					addNewFolder(x[item]);
					console.log(item);
				}
			});
			</script>";
		}
		?>
	</ul>
	<ul class = "files flexbox">
		<?php
		# Retrieve files for this user
		if (isset($searchquery)) {
			$q = "SELECT id, file_name, time_created, user_id FROM audio_files WHERE file_name LIKE '%$searchquery%' AND user_id = {$_COOKIE['id']} AND folder_id IS NULL";
			$r = mysqli_query($dbc, $q);
			$encoded = [];
			while ($row = mysqli_fetch_array($r, MYSQLI_BOTH)) {
			    array_push($encoded, $row);
			}
			$data = json_encode($encoded);
			echo "<script>
			window.addEventListener('DOMContentLoaded', function() {
				let x = $data;
				console.log(x);
				for (item in x) {
					addNewFile(x[item]);
					console.log(item);
				}
			});
			</script>";
		}
			?>
	</ul>
	<table style = "display:none" class = "folders">
		<thead>
			<tr>
				<th>Name</th>
				<th>Date Created</th>
		</thead>
		<tbody>
			<?php
			# Retrieve files for this user
			$q = "SELECT id, folder_name, time_created FROM folders WHERE user_id = {$_COOKIE['id']}";
			$r = mysqli_query($dbc, $q);
			while ($row = mysqli_fetch_array($r, MYSQLI_BOTH)) {
				echo "
				<tr>
					<td>{$row['folder_name']}</td>
					<td>{$row['time_created']}</td>
				</tr>";
			}
			?>
		</tbody>
	</table>
	<table class = "files" style = "display: none">
		<thead>
			<tr>
				<th>Name</th>
				<th>Date Created</th>
			</tr>
		</thead>
		<tbody>
			<?php
			# Retrieve files for this user
			$q = "SELECT id, file_name, time_created FROM audio_files WHERE user_id = {$_COOKIE['id']} AND folder_id IS NULL";
			$r = mysqli_query($dbc, $q);
			while ($row = mysqli_fetch_array($r, MYSQLI_BOTH)) {
				echo "
				<tr>
					<td>{$row['file_name']}</td>
					<td>{$row['time_created']}</td>
				</tr>";
			}
			?>
		</tbody>
	</table>
</div>
<div style = "display: none" class = "new-file-box-container">
	<!-- Record audio -->
	<div>
		<button class = "audio-option">Record directly</button>
	</div>
	<!-- Vertical line -->
	<span class = "vertical-line"></span>
	<!-- Upload file -->
	<form id = 'upload-form' action = '' enctype = 'multipart/form-data'>
		<label class="audio-option custom-file-upload">
	    <input multiple id = "audio-files" name = "file" type="file"/>
    	Upload mp3, wav, m4a
		</label>
		<img height = "200" id = 'upload-file-arrow' src = "images/UploadFileArrow.png">
		<progress style = 'display:none' value = "0" max = "100" id = 'upload-file-progress-bar'></progress>
	</form>
</div>
<?php require('footer.html'); ?>
</div>
<script src = "scripts/script.js"></script>
<script src = "scripts/popupBox.js"></script>
<script>document.getElementById('search-bar').value = '<?php echo isset($searchquery) ? $searchquery : ''; ?>'</script>
