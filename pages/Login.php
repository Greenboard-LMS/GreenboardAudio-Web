<?php
$page_title = "Login - Flytrap";
$css = "<link href = 'css/login.css' rel = 'stylesheet' type = 'text/css'>";
require('brand_header.html');
?>
<div class = "login account-form-container">
	<form action = "/" method = "post">
		<fieldset>
			<legend>Login</legend>
			<input type = "text" required placeholder = "Email" name = "email" id = "loginemail">
			<input type = "password" required placeholder = "Password" name = "password" id = "loginpassword">
		</fieldset>
		<input type = "submit" value = "Login">
	</form>
	<button onclick = "connectToBorum('Login')"><img height="20" src = "http://cdn.bforborum.com/images/icon.png" style = "margin-right: 10px">Login with Borum</button>
</div>
<div class = "register account-form-container">
	<form action = "/" method = "post">
		<fieldset>
			<legend>Register</legend>
			<input type = "text" placeholder = "Email" name = "email" id = "registeremail">
			<input type = "password" placeholder = "Password" name = "password" id = "registerpassword">
		</fieldset>
		<input type = "submit" value = "Register">
	</form>
	<button onclick = "connectToBorum('Register')"><img height="20" src = "http://cdn.bforborum.com/images/icon.png" style = "margin-right: 10px">Sign up with Borum</button>
</div>
<script src = "scripts/minified/login.min.js"></script>
