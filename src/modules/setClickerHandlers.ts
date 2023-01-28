export function setClickHandlers(node: HTMLElement, callback: (e: Event) => any) {
	node.addEventListener('click', callback)
	node.addEventListener('contextmenu', (e) => {
		e.preventDefault()
		callback(e)
	})
}
