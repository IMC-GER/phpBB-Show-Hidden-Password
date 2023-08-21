<?php
/**
 * Show Hidden Password
 * An extension for the phpBB Forum Software package.
 *
 * @copyright (c) 2023, Thorsten Ahlers
 * @license GNU General Public License, version 2 (GPL-2.0)
 *
 */

namespace imcger\showhiddenpassword\event;

/**
 * @ignore
 */
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

/**
 * listener
 */
class main_listener implements EventSubscriberInterface
{
	/** @var \phpbb\language\language */
	protected $language;

	public function __construct
	(
		\phpbb\language\language $language
	)
	{
		$this->language = $language;
	}

	public static function getSubscribedEvents()
	{
		return array(
			'core.page_header' => 'add_language',
		);
	}

	public function add_language()
	{
		// Add language file
		$this->language->add_lang('common','imcger/showhiddenpassword');
	}
}
