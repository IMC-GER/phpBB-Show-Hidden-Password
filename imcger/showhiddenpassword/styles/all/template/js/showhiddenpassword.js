/*
 * Show Hidden Password
 * An extension for the phpBB Forum Software package.
 *
 * @copyright (c) 2023, Thorsten Ahlers
 * @license GNU General Public License, version 2 (GPL-2.0)
 *
 */
var imcgerPwInput	= document.getElementById('password'),
	imcgerPwToggel,
	imcgerPwCode	= '<button id="imcger-pw-toggelbutton" type="button" onclick="imcgerToggelPw(this)"><i class="icon fa-eye fa-fw" aria-hidden="true"></i></button>';

// Initialize the form
if (imcgerPwInput) {
	let forgetPw = imcgerPwInput.parentElement.nextElementSibling;

	imcgerPwInput.insertAdjacentHTML('afterend', imcgerPwCode);
	imcgerPwToggel = imcgerPwInput.nextElementSibling;

	if (forgetPw.tagName.toLowerCase() == 'a') {
		forgetPw.style.marginLeft = '20px';
	}

	imcgerSetPwWidth();

	window.addEventListener('resize', imcgerSetPwWidth);
}

// Toggel make the password visible
function imcgerToggelPw(button) {
	let buttonIcon = button.children[0];

	if (imcgerPwInput.type  == 'password') {
		imcgerPwInput.type	 = 'text';
		buttonIcon.className = 'icon fa-eye-slash fa-fw';
	} else {
		imcgerPwInput.type	 = 'password';
		buttonIcon.className = 'icon fa-eye fa-fw';
	}
}

// Set width of password field
function imcgerSetPwWidth() {
	let inputFieldWidth = parseFloat(document.getElementById('username').offsetWidth);

	if (inputFieldWidth) {
		imcgerPwInput.classList.remove('autowidth');
		imcgerPwInput.style.width = inputFieldWidth + 'px';
	}
}
