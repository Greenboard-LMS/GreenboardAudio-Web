const CryptoJS = require('crypto-js');

var encryptedAES = CryptoJS.AES.encrypt("Larry Ullman is a great teacher", "bell prompt doll");
var decryptedBytes = CryptoJS.AES.decrypt(encryptedAES, "bell prompt doll");
var plaintext = decryptedBytes.toString(CryptoJS.enc.Utf8);
// console.log(encryptedAES);
// console.log(decryptedBytes);
// console.log(plaintext);
fetch('/ajax/getaeskey.php').then(response => {
	if (response.status >= 200 && response.status < 300)
		return response.text();
}).then(response => {
	console.log(response);
	x = CryptoJS.AES.encrypt("Hello world", response).toString();
	console.log(x);
})
