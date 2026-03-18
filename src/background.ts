async function ask(question: string) {
	const selector = '[contenteditable="true"] > p'

	const input = await new Promise<HTMLElement>(async (res, rej) => {
		let input: HTMLElement | null = null
		const start = Date.now()

		do {
			input = document.querySelector<HTMLElement>(selector)
			if (Date.now() - start > 20000) {
				// 20 secondes timeout
				return rej(new Error('Timeout: input not found'))
			}
			await new Promise((r) => setTimeout(r, 50))
		} while (input === null)

		res(input!)
	})

	input.focus()
	input.innerText = question
	input.dispatchEvent(new InputEvent('input', {bubbles: true}))

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

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	if (
		changeInfo.status === 'complete' &&
		tab.url &&
		(tab.url.includes('chat.openai.com') || tab.url.includes('chatgpt.com'))
	) {
		const hash = tab.url.split('#')[1]
		if (hash) {
			chrome.scripting
				.executeScript({
					target: {tabId},
					func: ask,
					args: [decodeURIComponent(hash)],
				})
				.catch((err) => console.error('Injection failed:', err))
		}
	}
})
