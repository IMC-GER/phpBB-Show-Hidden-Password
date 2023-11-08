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

		this.username = 'username';
		this.inputPwField = inputElement;
		this.inputPwField.insertAdjacentHTML('afterend', '<button id="' + this.inputPwField.id + '_togglebutton" class="imcger-pw-togglebutton" type="button"><i id="fa-eye" class="icon fa-eye fa-fw" aria-hidden="true"></i></button>');
		this.pwToggle = document.getElementById(this.inputPwField.id + '_togglebutton');

		this.inputPaddRight  = window.getComputedStyle(this.inputPwField).getPropertyValue('padding-rigth');
		this.inputPaddLeft	 = window.getComputedStyle(this.inputPwField).getPropertyValue('padding-left');
		this.pwToggleVisible = false;
		this.keydownValue	 = 0;
		this.inputValue		 = 0;

		// ACP SMTP-Passwort
		if (this.inputPwField.id == 'smtp_password') {
			this.username = 'smtp_username'
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

		this.inputPwField.addEventListener('keydown', function () {
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

		document.addEventListener('mousedown', function(e) {
			let target_id = e.target.id;

			if(!(target_id == thisObj.inputPwField.id) && !(target_id == thisObj.inputPwField.nextSibling.id) && !(target_id == 'fa-eye')) {
				thisObj.toggleOnOff('off');
			}
		});
	}

	// Toggle make the password visible
	togglePw(button) {
		let buttonIcon = button;

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
			this.pwToggle.style.display = 'initial';
			this.inputPwField.style.paddingRight = this.inputPaddRight;
		} else {
			this.pwToggleVisible = false;
			this.pwToggle.style.display = 'none';
			this.inputPwField.style.paddingRight = this.inputPaddLeft;

			this.inputPwField.type = 'password';
			this.pwToggle.firstChild.className = 'icon fa-eye fa-fw';
		}
	}

	// Set width of password field
	setWidth() {
		// Do nothing if no username field recognized
		if (document.getElementById(this.username)) {
			let inputFieldWidth = parseInt(document.getElementById(this.username).offsetWidth);

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
