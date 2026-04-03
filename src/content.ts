import {sendMessage} from './functions.js'

window.addEventListener('prompt', (event: CustomEvent) => {
	const {message} = event.detail
	if (message) {
		sendMessage(message)
	}
})

document.addEventListener('keydown', (e) => {
	if (e.key !== 'Enter') return
	if (e.shiftKey || e.ctrlKey || e.altKey || e.metaKey) return

	e.preventDefault()

	document.querySelector<HTMLElement>('[data-testid="send-button"]')?.click()
})

// waitUntilInputElementIsAvailable().then(() => {
// 	handleHash()
// })
