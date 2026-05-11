// import '@webcomponents/webcomponentsjs/webcomponents-bundle.js'
import {getElement, querySelector} from 'html-vision'
// import toast from 'toastit'

export async function getInputMessage() {
	const input = await waitUntilInputElementIsAvailable()
	if (input) {
		return input.innerText
	}
	return ''
}
export async function writeMessage(message: string) {
	const input = await waitUntilInputElementIsAvailable()
	if (input) {
		input.innerText = message
		return true
	}
	return false
}
export async function sendMessage(message: string) {
	if (await writeMessage(message)) {
		await new Promise((r) => setTimeout(r, 1010))
		clickSendButton()
	}
}

export function handleHash() {
	const hash = window.location.hash.substring(1)
	if (hash) {
		sendMessage(decodeURIComponent(hash))
		// window.dispatchEvent(
		// 	new CustomEvent('prompt', {detail: {message: decodeURIComponent(hash)}}),
		// );
	}
}

export const INPUT_SELECTOR = '[contenteditable="true"] > p'

export function getInputElement() {
	return querySelector(INPUT_SELECTOR)
}

export function waitUntilInputElementIsAvailable() {
	return new Promise<HTMLElement>(async (res, rej) => {
		try {
			const element = await getElement(INPUT_SELECTOR, {timeoutMs: 10 * 1000})
			res(element)
		} catch (err) {
			console.log(err)
			rej()
		}
	})
}

// async function clickSendButton() {
// 	const button = querySelector(
// 		'[aria-label="Send prompt"][data-testid="send-button"]',
// 	)
// 	if (button) {
// 		button.click()
// 	}
// }

export async function pressEnter() {
	// const input = document.querySelector('textarea')
	const input = getInputElement()

	if (!input) return

	input.focus()
	input.dispatchEvent(
		new InputEvent('input', {
			bubbles: true,
		}),
	)

	setTimeout(() => {
		input.dispatchEvent(
			new KeyboardEvent('keydown', {
				key: 'Enter',
				code: 'Enter',
				keyCode: 13,
				which: 13,
				bubbles: true,
			}),
		)
	}, 50)
}

export function getSendButton() {
	return document.querySelector(
		'[id="composer-submit-button"],[data-testid="send-button"]',
	) as HTMLElement | null
}
export function clickSendButton() {
	getSendButton()?.click()
}

/**
 * This is probably implemented by default.
 */
// window.addEventListener('keydown', (event: KeyboardEvent) => {
// 	switch (event.key) {
// 		case 'Escape':
// 			const stopButton = document.querySelector<HTMLElement>(
// 				'[aria-label="Stop streaming"]',
// 			)
// 			stopButton?.click()
// 			break
// 		case 'c':
// 			if (event.altKey) {
// 				const copyButtons = [
// 					...document.querySelectorAll<HTMLElement>('[aria-label="Copy"]'),
// 				].filter((c) => c.textContent === 'Copy code')
// 				const lastButton = copyButtons.pop()
// 				if (lastButton) {
// 					lastButton.click()
// 					toast('Copied!')
// 				}
// 			}
// 			break
// 	}
// })
