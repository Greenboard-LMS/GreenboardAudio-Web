<?php
$page_title = "Login - Flytrap";
$css = "<link href = 'css/login.css' rel = 'stylesheet' type = 'text/css'>";
require('brand_header.html');
?>
<div class = "login account-form-container">
	<button onclick = "connectToBorum()"><img height="20" src = "https://cdn.borumtech.com/images/icon.png" style = "margin-right: 10px">Login with Borum</button>
	<a target = "_blank" style = "text-decoration: none; color: black; margin-top: 5px; font-size: 1em; display: block; text-align: center" href = "https://accounts.borumtech.com">Don't have an account? Register today</a>
</div>
<script src = "scripts/minified/login.min.js"></script>
