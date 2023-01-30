import { game } from '../globals/game'

// HTML elements
const moneyElem = document.querySelector('#money') as HTMLDivElement
const zoneElem = document.querySelector('#zone') as HTMLDivElement
const enemiesLeftElem = document.querySelector('#enemies-left') as HTMLDivElement

export function updateStatusBar() {
	moneyElem.textContent = `$${game.money}`
	zoneElem.textContent = (game.zone + 1).toString()
	enemiesLeftElem.textContent = game.enemiesLeft.toString()
}
