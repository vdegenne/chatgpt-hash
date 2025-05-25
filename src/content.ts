import {getElement} from 'html-vision';

function handleHash() {
	const hash = window.location.hash.substring(1);
	if (hash) {
		// sendMessage(decodeURIComponent(hash));
		window.dispatchEvent(
			new CustomEvent('prompt', {detail: {message: decodeURIComponent(hash)}}),
		);
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
		button.click();
	}
}

interface PromptEventDetail {
	message: string;
}
declare global {
	interface WindowEventMap {
		prompt: CustomEvent<PromptEventDetail>;
	}
}

window.addEventListener('prompt', (event: CustomEvent) => {
	const {message} = event.detail;
	if (message) {
		sendMessage(message);
	}
});

handleHash();
