const SCROLL_AMOUNT = 100 // px

// const scrollRoot = window
const scrollRoot = document.querySelector(
	'[data-scroll-root]',
) as HTMLElement | null

window.addEventListener('keydown', (e) => {
	if (e.key !== 'PageDown' && e.key !== 'PageUp') return
	if (e.shiftKey || e.ctrlKey || e.altKey || e.metaKey) return

	if (e.key === 'PageDown') {
		e.preventDefault()
		// window.scrollBy({top: SCROLL_AMOUNT, behavior: 'smooth'})
		scrollRoot?.scrollBy({top: SCROLL_AMOUNT, behavior: 'instant'})
	}

	if (e.key === 'PageUp') {
		e.preventDefault()
		// window.scrollBy({top: -SCROLL_AMOUNT, behavior: 'smooth'})
		scrollRoot?.scrollBy({top: -SCROLL_AMOUNT, behavior: 'instant'})
	}
})
