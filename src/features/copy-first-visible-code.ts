window.addEventListener(
	'keydown',
	(e) => {
		if (!(e.ctrlKey && e.shiftKey && e.code === 'Semicolon')) return

		const isVisible = (el: HTMLElement) => {
			const rect = el.getBoundingClientRect()
			return (
				rect.width > 0 &&
				rect.height > 0 &&
				rect.bottom > 0 &&
				rect.right > 0 &&
				rect.top < window.innerHeight &&
				rect.left < window.innerWidth &&
				getComputedStyle(el).visibility !== 'hidden' &&
				getComputedStyle(el).display !== 'none'
			)
		}

		const elements = Array.from(
			document.querySelectorAll<HTMLElement>('[aria-label="Copy"]'),
		)

		const firstVisible = elements.find(isVisible)

		// e.preventDefault()
		// Instead of preventing default we can let chatgpt native copy behavior
		// The advantage is we get the snackbar.
		// We just wait a bit and click to replace the clipboard content.
		setTimeout(() => {
			firstVisible?.click()
		}, 200)
	},
	// {capture: true},
)
