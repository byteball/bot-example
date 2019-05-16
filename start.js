/*jslint node: true */
'use strict';
const eventBus = require('ocore/event_bus');
const headlessWallet = require('headless-obyte');


function onReady() {
	headlessWallet.setupChatEventHandlers();

	/**
	 * user pairs his device with the bot
	 */
	eventBus.on('paired', (from_address, pairing_secret) => {
		// send a geeting message
		const device = require('ocore/device.js');
		device.sendMessageToDevice(from_address, 'text', "Welcome to my new shiny bot!");
	});

	/**
	 * user sends message to the bot
	 */
	eventBus.on('text', (from_address, text) => {
		// analyze the text and respond
		text = text.trim();

		const device = require('ocore/device.js');
		if (!text.match(/^You said/))
			device.sendMessageToDevice(from_address, 'text', "You said: " + text);
	});
	
	/**
	 * user pays to the bot
	 */
	eventBus.on('new_my_transactions', (arrUnits) => {
		// handle new unconfirmed payments
		// and notify user

	//	const device = require('ocore/device.js');
	//	device.sendMessageToDevice(device_address_determined_by_analyzing_the_payment, 'text', "Received your payment");
	});

	/**
	 * payment is confirmed
	 */
	eventBus.on('my_transactions_became_stable', (arrUnits) => {
		// handle payments becoming confirmed
		// and notify user

	//	const device = require('ocore/device.js');
	//	device.sendMessageToDevice(device_address_determined_by_analyzing_the_payment, 'text', "Your payment is confirmed");
	});
});
eventBus.once('headless_wallet_ready', onReady);

process.on('unhandledRejection', up => { throw up; });
