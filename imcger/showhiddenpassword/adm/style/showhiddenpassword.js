/**
 * Show Hidden Password
 * An extension for the phpBB Forum Software package.
 *
 * @copyright (c) 2023, Thorsten Ahlers
 * @license GNU General Public License, version 2 (GPL-2.0)
 *
 */

class imcgerPw {

	// Initialize the form
	constructor(inputElement) {
		var thisObj = this;

		this.userNameField = null
		this.inputPwFieldm = inputElement;
		this.inputPwField.classList.add('imcger-password');
		this.inputPwField.insertAdjacentHTML('afterend', '<button id="' + this.inputPwField.id + '_togglebutton" class="imcger-pw-togglebutton" type="button"><i id="' + this.inputPwField.id + '_eye" class="icon fa-eye fa-fw" aria-hidden="true"></i></button>');
		this.pwToggle = document.getElementById(this.inputPwField.id + '_togglebutton');

		this.inputPaddRight  = window.getComputedStyle(this.inputPwField).getPropertyValue('padding-rigth');
		this.inputPaddLeft	 = window.getComputedStyle(this.inputPwField).getPropertyValue('padding-left');
		this.pwToggleVisible = false;
		this.keydownValue	 = 0;
		this.inputValue		 = 0;

		// Get the username field to determine the field width
		if (document.getElementById('username')) {
			this.userNameField = document.getElementById('username');
		} else if (this.inputPwField.id == 'smtp_password') {
			// For ACP SMTP-Passwort field
			this.userNameField = document.getElementById('smtp_username');
		} else if (document.getElementById('email')) {
			// For password fields in the UCP
			this.userNameField = document.getElementById('email');
		}

		this.setWidth();
		this.toggleOnOff('off');

		if (typeof imcgerPwToolTip != 'undefined') {
			this.pwToggle.setAttribute('title', imcgerPwToolTip.show);
		}

		window.addEventListener('resize', function () {
			thisObj.setWidth();
		});

		this.pwToggle.addEventListener('click', function (e) {
			thisObj.togglePw(e.target);
		});

		this.inputPwField.addEventListener('keydown', function (e) {
			if (e.which == 9) {
				thisObj.toggleOnOff('off');
			}

			thisObj.keydownValue = thisObj.inputPwField.value.length;

			if (!thisObj.inputPwField.value.length) {
				thisObj.pwToggleVisible = true;
			}
		});

		this.inputPwField.addEventListener('input', function () {
			thisObj.inputValue = thisObj.inputPwField.value.length;
		});

		this.inputPwField.addEventListener('keyup', function () {
			thisObj.pwToggleVisible = thisObj.pwToggleVisible && (Math.abs(thisObj.keydownValue - thisObj.inputValue) == 1) ? true : false;

			if (thisObj.inputPwField.value.length && thisObj.pwToggleVisible) {
				thisObj.toggleOnOff('on');
			} else if (!thisObj.inputPwField.value.length) {
				thisObj.toggleOnOff('off');
			}
		});

		this.inputPwField.addEventListener('paste', function () {
			if (thisObj.pwToggleVisible) {
				thisObj.toggleOnOff('on');
			}
		});

		this.inputPwField.addEventListener('focusout', function (e) {
			if (!e.relatedTarget || !e.relatedTarget.id.endsWith('_togglebutton')) {
				thisObj.toggleOnOff('off');
			}
		});

		this.inputPwField.nextSibling.addEventListener('focusout', function (e) {
			if (!e.relatedTarget || e.relatedTarget.id != thisObj.inputPwField.id) {
				thisObj.toggleOnOff('off');
			}
		});
	}

	// Toggle make the password visible
	togglePw(button) {
		let buttonIcon = button.id.endsWith('_togglebutton') ? button.firstChild : button;

		if (this.inputPwField.type == 'password') {
			this.inputPwField.type = 'text';
			buttonIcon.className   = 'icon fa-eye-slash fa-fw';

			if (typeof imcgerPwToolTip != 'undefined') {
				this.pwToggle.setAttribute('title', imcgerPwToolTip.hide);
			}
		} else {
			this.inputPwField.type = 'password';
			buttonIcon.className   = 'icon fa-eye fa-fw';

			if (typeof imcgerPwToolTip != 'undefined') {
				this.pwToggle.setAttribute('title', imcgerPwToolTip.show);
			}
		}
	}

	// Hide or display the eye
	toggleOnOff(toggleOn) {

		if (toggleOn == 'on') {
			this.pwToggleVisible = true;
			this.pwToggle.style.display = 'inline-block';
			this.inputPwField.style.paddingRight = this.inputPaddRight;
		} else {
			this.pwToggleVisible = false;
			this.pwToggle.style.display = 'none';
			this.inputPwField.style.paddingRight = this.inputPaddLeft;

			this.inputPwField.type = 'password';
			this.pwToggle.firstChild.className = 'icon fa-eye fa-fw';
		}
	}

	// Set the width of the password field to the width of the user input field
	setWidth() {
		if (this.userNameField) {
			let inputFieldWidth = parseInt(this.userNameField.offsetWidth);

			if (inputFieldWidth) {
				this.inputPwField.classList.remove('autowidth');
				this.inputPwField.style.width = inputFieldWidth + 'px';
			}
		}
	}
}

// Initialize password input fields
var imcgerPwInputs = document.querySelectorAll('input[type="password"]'),
	imcgerPwInput  = [];

for (i = 0; i < imcgerPwInputs.length; i++) {
	imcgerPwInput[i] = new imcgerPw(imcgerPwInputs[i]);
}
