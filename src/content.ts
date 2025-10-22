import '@webcomponents/webcomponentsjs/webcomponents-bundle.js'
import toast from 'toastit'
import {getElement, querySelector} from 'html-vision'

function handleHash() {
	const hash = window.location.hash.substring(1)
	if (hash) {
		sendMessage(decodeURIComponent(hash))
		// window.dispatchEvent(
		// 	new CustomEvent('prompt', {detail: {message: decodeURIComponent(hash)}}),
		// );
	}
}

const INPUT_SELECTOR = '[contenteditable="true"] > p'

function getInputElement() {
	return querySelector(INPUT_SELECTOR)
}

function waitUntilInputElementIsAvailable() {
	return new Promise(async (res, rej) => {
		try {
			const element = await getElement(INPUT_SELECTOR, {timeoutMs: 10 * 1000})
			res(element)
		} catch {
			rej()
		}
	})
}

async function sendMessage(message: string) {
	const input = getInputElement()
	if (input) {
		input.innerText = message
		await new Promise((r) => setTimeout(r, 500))
		clickSendButton()
	}
}

async function clickSendButton() {
	const button = querySelector(
		'[aria-label="Send prompt"][data-testid="send-button"]',
	)
	if (button) {
		button.click()
	}
}

interface PromptEventDetail {
	message: string
}
declare global {
	interface WindowEventMap {
		prompt: CustomEvent<PromptEventDetail>
	}
}

window.addEventListener('prompt', (event: CustomEvent) => {
	const {message} = event.detail
	if (message) {
		sendMessage(message)
	}
})

waitUntilInputElementIsAvailable().then(() => {
	handleHash()
})

window.addEventListener('keydown', (event: KeyboardEvent) => {
	console.log(event)
	switch (event.key) {
		case 'Escape':
			const stopButton = document.querySelector<HTMLElement>(
				'[aria-label="Stop streaming"]',
			)
			stopButton?.click()
			break
		case 'c':
			if (event.altKey) {
				const copyButtons = [
					...document.querySelectorAll<HTMLElement>('[aria-label="Copy"]'),
				].filter((c) => c.textContent === 'Copy code')
				const lastButton = copyButtons.pop()
				if (lastButton) {
					lastButton.click()
					toast('Copied!')
				}
			}
			break
	}
})
