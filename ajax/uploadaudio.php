<?php
	require('../../flytrap_connect.inc.php');
	session_start();

	foreach ($_FILES as $file) {
		if (!saveFile($file))
			identifyError($file);

		// Delete the temporary file if it still exists
		if (file_exists($file['tmp_name']) && is_file($file['tmp_name']))
			unlink($file['tmp_name']);
	}

	function saveAudio($file, $id) {
		require('../pages/uniqueid.php');
		if(move_uploaded_file($file['tmp_name'], "../../audio_uploads/" . $id)) {
				echo "<p class = 'success'>The file {$file['name']} uploaded successfully. </p>";
				return true;
		} else { // File not saved to the directory
			echo "<p class = 'failure'>System failure: The file was not stored. We apologize for the inconvenience.</p>";
		}
	}

	function enterFile($file) {
		if (saveAudio($file, $_GET['file_alpha_id'])) {
			return true;
		}
	}

	function identifyError($file) {
		if (isset($file['error']) && $file['error'] > 0) {
				echo "<p class = 'failure'>The file could not be uploaded because ";

				// Print a message based upon the error
				switch ($file['error']) {
					case 1:
						print "the file exceeds the max file size";
						break;
					case 2:
						print "the file exceeds the max file size";
						break;
					case 3:
						print "the file was only partially uploaded";
						break;
					case 4:
						print "no file was uploaded";
						break;
					case 6:
						print "no temporary folder was available";
						break;
					case 7:
						print "unable to write to the disk";
						break;
					case 8:
						print "file upload stopped";
						break;
					default:
						print "of an unknown error";
						break;
				}
				echo "</p>";
		} else {
			echo "<p class = 'failure'>An unknown error occured.</p>";
		}
	}

	function saveFile($file) {
		$allowed = ['audio/wav', 'audio/x-wav', 'audio/mp3', 'audio/mpeg'];
		if (in_array($file['type'], $allowed)) {
			if(enterFile($file)) {
				return true;
			}
		} else {
			echo "<p class = 'failure'>System error: That file type is not allowed. Please try again.</p>";
		}
	}
?>
