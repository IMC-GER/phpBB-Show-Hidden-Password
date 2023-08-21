/**
 * Show Hidden Password
 * An extension for the phpBB Forum Software package.
 *
 * @copyright (c) 2023, Thorsten Ahlers
 * @license GNU General Public License, version 2 (GPL-2.0)
 *
 */

const imcgerPw = {

	inputPwField: null,
	buttonCode : '<button id="imcger-pw-togglebutton" type="button" onclick="imcgerPw.togglePw(this)"><i id="fa-eye" class="icon fa-eye fa-fw" aria-hidden="true"></i></button>',
	pwToggle: null,
	pwToggleVisible: false,
	inputPaddRight: 0,
	inputPaddLeft: 0,
	keydownValue: 0,
	inputValue: 0,

	// Initialize the form
	init: function (inputElement) {
		this.inputPwField = inputElement;
		this.inputPwField.insertAdjacentHTML('afterend', this.buttonCode);
		this.pwToggle = document.getElementById('imcger-pw-togglebutton');

		this.inputPaddRight = window.getComputedStyle(this.inputPwField).getPropertyValue('padding-rigth');
		this.inputPaddLeft  = window.getComputedStyle(this.inputPwField).getPropertyValue('padding-left');

		this.setWidth();
		this.toggleOnOff('off');
		this.pwToggle.setAttribute('title', imcgerPwToolTip.show);

		window.addEventListener('resize', function () {
			imcgerPw.setWidth();
		});

		this.inputPwField.addEventListener('keydown', function () {
			imcgerPw.keydownValue = imcgerPw.inputPwField.value.length;

			if (!imcgerPw.inputPwField.value.length) {
				imcgerPw.pwToggleVisible = true;
			}
		});

		this.inputPwField.addEventListener('input', function () {
			imcgerPw.inputValue = imcgerPw.inputPwField.value.length;
		});

		this.inputPwField.addEventListener('keyup', function () {
			imcgerPw.pwToggleVisible = imcgerPw.pwToggleVisible && (Math.abs(imcgerPw.keydownValue - imcgerPw.inputValue) == 1) ? true : false;

			if (imcgerPw.inputPwField.value.length && imcgerPw.pwToggleVisible) {
				imcgerPw.toggleOnOff('on');
			} else if (!imcgerPw.inputPwField.value.length) {
				imcgerPw.toggleOnOff('off');
			}
		});

		this.inputPwField.addEventListener('paste', function () {
			if (imcgerPw.pwToggleVisible) {
				imcgerPw.toggleOnOff('on');
			}
		});

		document.addEventListener('mousedown', function(e) {
			let target_id = e.target.id;

			if(!(target_id == 'password') && !(target_id == 'imcger-pw-togglebutton') && !(target_id == 'fa-eye')) {
				imcgerPw.toggleOnOff('off');
			}
		});
	},

	// Toggle make the password visible
	togglePw: function (button) {
		let buttonIcon = button.children[0];

		if (this.inputPwField.type == 'password') {
			this.inputPwField.type = 'text';
			buttonIcon.className   = 'icon fa-eye-slash fa-fw';
			this.pwToggle.setAttribute('title', imcgerPwToolTip.hide);
		} else {
			this.inputPwField.type = 'password';
			buttonIcon.className   = 'icon fa-eye fa-fw';
			this.pwToggle.setAttribute('title', imcgerPwToolTip.show);
		}
	},

	// Hide or display the eye
	toggleOnOff: function (toggleOn) {

		if (toggleOn == 'on') {
			this.pwToggleVisible = true;
			this.pwToggle.style.display = 'initial';
			this.inputPwField.style.paddingRight = this.inputPaddRight;
		} else {
			this.pwToggleVisible = false;
			this.pwToggle.style.display = 'none';
			this.inputPwField.style.paddingRight = this.inputPaddLeft;
		}

		this.inputPwField.type = 'password';
		this.pwToggle.firstChild.className = 'icon fa-eye fa-fw';
	},

	// Set width of password field
	setWidth: function () {
		let inputFieldWidth = parseInt(document.getElementById('username').offsetWidth);

		if (inputFieldWidth) {
			this.inputPwField.classList.remove('autowidth');
			this.inputPwField.style.width = inputFieldWidth + 'px';
		}
	},
}

// If the password input field is available, initialize the form
if (document.getElementById('password')) {
	imcgerPw.init(document.getElementById('password'));
}
