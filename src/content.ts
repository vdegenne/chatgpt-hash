import {getElement} from 'html-vision';

function handleHash() {
	const hash = window.location.hash.substring(1);
	if (hash) {
		sendMessage(decodeURIComponent(hash));
	}
}

async function sendMessage(message: string) {
	const input = await getElement('[contenteditable="true"] > p');
	if (input) {
		input.innerText = message;
		await new Promise((r) => setTimeout(r, 500));
		clickSendButton();
	}
}

async function clickSendButton() {
	const button = await getElement(
		'[aria-label="Send prompt"][data-testid="send-button"]',
	);
	if (button) {
		console.log(button);
		button.click();
	}
}

handleHash();
