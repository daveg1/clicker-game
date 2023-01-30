import { game } from '../globals/game'

export function showDamageOnClick(x: number, y: number) {
	const elem = document.createElement('div')
	elem.className = 'damage-indicator'
	elem.textContent = game.clickDamage.toString()

	document.body.prepend(elem)

	const left = x - elem.offsetWidth + Math.random() * elem.offsetWidth
	const top = y - elem.offsetHeight / 2 + Math.random() * 10

	elem.style.left = `${left}px`
	elem.style.top = `${top}px`

	setTimeout(() => {
		elem.remove()
	}, 1600)
}
