/*
 * Show Hidden Password
 * An extension for the phpBB Forum Software package.
 *
 * @copyright (c) 2023, Thorsten Ahlers
 * @license GNU General Public License, version 2 (GPL-2.0)
 *
 */
const imcgerPwInput	= document.getElementById('password'),
	  imcgerPwCode	= '<button id="imcger-pw-togglebutton" type="button" onclick="imcgerTogglePw(this)"><i id="fa-eye" class="icon fa-eye fa-fw" aria-hidden="true"></i></button>';


var	imcgerPwInputPaddRight,
	imcgerPwInputPaddLeft,
	imcgerPwToggle,
	imcgerPwToggleVisible = false,
	imcgerPwForgetActive,
	imcgerKeydownValue = 0,
	imcgerInputValue = 0;

// Initialize the form
if (imcgerPwInput) {
	imcgerPwInput.insertAdjacentHTML('afterend', imcgerPwCode);

	imcgerPwInputPaddRight = window.getComputedStyle(imcgerPwInput).getPropertyValue('padding-rigth');
	imcgerPwInputPaddLeft  = window.getComputedStyle(imcgerPwInput).getPropertyValue('padding-left');
	imcgerPwToggle		   = imcgerPwInput.nextElementSibling;

	imcgerSetPwWidth();
	imcgerPwToggleOnOff('off');

	window.addEventListener('resize', function () {
		imcgerSetPwWidth();
	});

	imcgerPwInput.addEventListener('keydown', function () {
		imcgerKeydownValue = imcgerPwInput.value.length;

		if (!imcgerPwInput.value.length) {
			imcgerPwToggleVisible = true;
		}
	});

	imcgerPwInput.addEventListener('input', function () {
		imcgerInputValue = imcgerPwInput.value.length;
	});

	imcgerPwInput.addEventListener('keyup', function () {
		imcgerPwToggleVisible = imcgerPwToggleVisible && (Math.abs(imcgerKeydownValue-imcgerInputValue) == 1) ? true : false;

		if (imcgerPwInput.value.length && imcgerPwToggleVisible) {
			imcgerPwToggleOnOff('on');
		} else if (!imcgerPwInput.value.length) {
			imcgerPwToggleOnOff('off');
		}
	});

	imcgerPwInput.addEventListener('paste', function () {
		if (imcgerPwToggleVisible) {
			imcgerPwToggleOnOff('on');
		}
	});

	document.addEventListener('mousedown', function(e) {
		let target_id = e.target.id;

		if(!(target_id == 'password') && !(target_id == 'imcger-pw-togglebutton') && !(target_id == 'fa-eye')) {
			imcgerPwToggleOnOff('off');
		}
	});
}

// Toggle make the password visible
function imcgerTogglePw(button) {
	let buttonIcon = button.children[0];

	if (imcgerPwInput.type  == 'password') {
		imcgerPwInput.type	 = 'text';
		buttonIcon.className = 'icon fa-eye-slash fa-fw';
	} else {
		imcgerPwInput.type	 = 'password';
		buttonIcon.className = 'icon fa-eye fa-fw';
	}
}

// Hide or Display the eye
function imcgerPwToggleOnOff(toggleOn = 'off') {

	if (toggleOn == 'on') {
		imcgerPwToggle.style.display	 = 'initial';
		imcgerPwInput.style.paddingRight = imcgerPwInputPaddRight;
		imcgerPwToggleVisible			 = true;
	} else {
		imcgerPwToggle.style.display	 = 'none';
		imcgerPwInput.style.paddingRight = imcgerPwInputPaddLeft;
		imcgerPwToggleVisible			 = false;
	}

	imcgerPwInput.type = 'password';
	imcgerPwToggle.firstChild.className = 'icon fa-eye fa-fw';
}

// Set width of password field
function imcgerSetPwWidth() {
	let inputFieldWidth = parseFloat(document.getElementById('username').offsetWidth);

	if (inputFieldWidth) {
		imcgerPwInput.classList.remove('autowidth');
		imcgerPwInput.style.width = inputFieldWidth + 'px';
	}
}
