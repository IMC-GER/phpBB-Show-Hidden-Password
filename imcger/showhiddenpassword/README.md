# phpBB Show Hidden Password

## Description
Displays a button in the password field that allows you to make the hidden password visible.
Important security measures have been built into the behavior of the toggle button to protect the user's password entry.
- The show password button is not available until the user enters text in the password field.
- When the password input field loses focus, the browser removes the password display button.
- The button is not displayed when it is filled by the password manager.
- When the password display button is removed, the user must clear the contents of the password input field to make the password display button appear again.

## Screenshots
- [Login](https://raw.githubusercontent.com/IMC-GER/images/main/screenshots/showhiddenpassword/en/login-forum.png)

## Requirements
- phpBB 3.3.0 or higher

## Installation
Copy the extension to `phpBB3/ext/imcger/showhiddenpassword`.
Go to "ACP" > "Customise" > "Manage extensions" and enable the "Show Hidden Password" extension.

## Update
- Navigate in the ACP to `Customise -> Manage extensions`.
- Click the `Disable` link for "Show Hidden Password".
- Delete the `showhiddenpassword` folder from `phpBB3/ext/imcger/`.
- Copy the extension to `phpBB3/ext/imcger/showhiddenpassword`.
- Go to "ACP" > "Customise" > "Manage extensions" and enable the "Show Hidden Password" extension.

## Changelog

### v0.6.1 (11-11-2023)
- Fixed don't hide password when lesve the field with tab key
- Fixed change style when toggle the password whith space key
- Fixed different length of password input fields

### v0.6.0 (08-11-2023)
- Added support ACP login password
- Added support for SMTP-Passwort in ACP

### v0.5.1 (04-11-2023)
- Minore code change
- Changed don't toggle password when editing

### v0.5.0 (03-11-2023)
- Changed JS code to class
- Added support for password fields at register

### v0.4.0 (21-08-2023)
- Changed JS code to object
- Added tooltip for the toogle button
- Added ext.php to check system requirements

### v0.3.1 (13-08-2023)
- Wrong element alignment with different security settings in ACP
- Script abort when "Forgot Password" disabled

### v0.3.0 (13-08-2023)
- Setting possible for individual styles
- Add important security measures

### v0.2.1 (09-08-2023)
- Alignment of elements optimized

### v0.2.0 (08-08-2023)
- Show toggel button in input field

### v0.1.1 (07-08-2023)
- Hide password reveal button in Edge

### v0.1.0 (07-08-2023)
- Published

## Uninstallation
- Navigate in the ACP to `Customise -> Manage extensions`.
- Click the `Disable` link for "Show Hidden Password".
- To permanently uninstall, click `Delete Data`, then delete the `showhiddenpassword` folder from `phpBB3/ext/imcger/`.

## License
[GPLv2](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)
