import {
	clickSendButton,
	getInputMessage,
	getSendButton,
	sendMessage,
	writeMessage,
} from './functions.js'
import './features/copy-first-visible-code.js'
import './features/smaller-scroll-on-page-up-and-down.js'

window.addEventListener('prompt', async (event: CustomEvent) => {
	const {message, mode} = event.detail
	if (message) {
		if (mode === 1) {
			let currentMessage = await getInputMessage()
			if (currentMessage && currentMessage[currentMessage.length - 1] !== ' ') {
				currentMessage += ' '
			}
			currentMessage += message + ' '
			writeMessage(currentMessage)
		} else if (mode === 0) {
			sendMessage(message)
		}
	}
})

window.addEventListener(
	'keydown',
	(e) => {
		if (e.key !== 'Enter') return
		if (e.shiftKey || e.ctrlKey || e.altKey || e.metaKey) return

		const el = e.target as HTMLElement | null
		const isInput =
			el instanceof HTMLInputElement ||
			el instanceof HTMLTextAreaElement ||
			el?.isContentEditable

		if (!isInput || !e.isTrusted) return

		e.preventDefault()

		clickSendButton()
	},
	{capture: true},
)

setInterval(() => {
	// const span = sendButton.parentElement
	// span.parentElement.appendChild(sendButton)
	// span.remove()
	getSendButton()?.removeAttribute('disabled')
}, 300)

// waitUntilInputElementIsAvailable().then(() => {
// 	handleHash()
// })
