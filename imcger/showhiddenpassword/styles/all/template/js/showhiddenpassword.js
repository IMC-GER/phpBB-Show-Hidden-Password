/*
 * Show Hidden Password
 * An extension for the phpBB Forum Software package.
 *
 * @copyright (c) 2023, Thorsten Ahlers
 * @license GNU General Public License, version 2 (GPL-2.0)
 *
 */
var imcgerPwInput = document.getElementById('password');
var imcgerPwToggel = '<button id="imcger-pw-toggelbutton" type="button" onclick="imcgerToggelPw(this)"><i class="icon fa-eye fa-fw" aria-hidden="true"></i></button>';

if (imcgerPwInput) {
	imcgerPwInput.insertAdjacentHTML('afterend', imcgerPwToggel);
	imcgerInitPw();
}

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

function imcgerInitPw() {
	let inputFieldWidth = parseInt(document.getElementById('username').clientWidth);

	if (inputFieldWidth) {
		imcgerPwInput.classList.remove('autowidth');
		imcgerPwInput.style.width = inputFieldWidth + 'px';
	}
}
