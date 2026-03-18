import {
	handleHash,
	sendMessage,
	waitUntilInputElementIsAvailable,
} from './functions.js'

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
