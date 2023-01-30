import { game } from '../globals/game'
import { setClickHandlers } from '../modules/setClickerHandlers'

const upgradeElems = document.querySelectorAll('.upgrade') as NodeListOf<HTMLDivElement>

export function initUpgrades() {
	upgradeElems.forEach((upgradeElem, index) => {
		const button = upgradeElem.querySelector('.upgrade__button') as HTMLButtonElement
		const level = upgradeElem.querySelector('.upgrade__level') as HTMLDivElement
		const cost = upgradeElem.querySelector('.upgrade__cost') as HTMLDivElement
		const upgrade = game.upgrades[index]

		level.textContent = upgrade.level.toString()
		cost.textContent = upgrade.cost.toString()

		setClickHandlers(button, () => {
			if (game.money >= upgrade.cost) {
				game.money -= upgrade.cost
				upgrade.level++
				upgrade.cost += Math.floor(upgrade.cost * 0.15)

				level.textContent = upgrade.level.toString()
				cost.textContent = upgrade.cost.toString()
			}
		})
	})
}

export function updateUpgrades() {
	upgradeElems.forEach((upgradeElem, index) => {
		const button = upgradeElem.querySelector('.upgrade__button') as HTMLButtonElement
		const upgrade = game.upgrades[index]

		button.disabled = upgrade.cost > game.money
	})
}
