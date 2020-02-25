<?php
$page_title = "Login - Flytrap";
$css = "<link href = 'css/login.css' rel = 'stylesheet' type = 'text/css'>";
require('brand_header.html');
?>
<div style = "grid-row: 2; grid-column: 2 / 3;" class = "form-container">
	<form>
		<fieldset>
			<legend>Login</legend>
			<input type = "text" placeholder = "Email" name = "email" id = "email">
			<input type = "text" placeholder = "Password" name = "password" id = "password">
		</fieldset>
	</form>
	<button onclick = "connectToBorum('Register')"><img height="20" src = "http://cdn.bforborum.com/images/icon.png" style = "margin-right: 10px">Sign up with Borum</button>
	<button onclick = "connectToBorum('Login')"><img height="20" src = "http://cdn.bforborum.com/images/icon.png" style = "margin-right: 10px">Login with Borum</button>
</div>
<script src = "scripts/login.js"></script>
