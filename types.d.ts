interface PromptEventDetail {
	message: string
}
declare global {
	interface WindowEventMap {
		prompt: CustomEvent<PromptEventDetail>
	}
}

export {}
