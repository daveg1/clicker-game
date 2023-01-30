import { game } from './globals/game'
import { updateBlockHp, spawnBlock, initBlock } from './modules/block'
import { setClickHandlers } from './modules/setClickerHandlers'
import { updateStatusBar } from './modules/status-bar'
import './style.css'

// todo: store list of zones

// Upgrades
const upgradeElems = document.querySelectorAll('.upgrade') as NodeListOf<HTMLDivElement>

// Game loop
function update() {
	requestAnimationFrame(update)

	// Calculate current damage per second
	const curr_dps = game.upgrades.reduce<number>((total: number, upgrade: any) => {
		total += upgrade.base_dps * upgrade.level * 0.025
		return total
	}, 0)

	// Apply damage to enemy health
	game.currentEnemy.hp -= curr_dps

	// Check enemy
	if (game.currentEnemy.hp <= 0) {
		game.money += 100
		game.stage++
		game.enemiesLeft--

		// Advance to next zone if all enemies killed
		if (game.enemiesLeft === 0) {
			game.zone++
			game.enemiesLeft = 25
		}

		spawnBlock()
	}

	upgradeElems.forEach((upgradeElem, index) => {
		const button = upgradeElem.querySelector('.upgrade__button') as HTMLButtonElement
		const upgrade = game.upgrades[index]

		button.disabled = upgrade.cost > game.money
	})

	updateStatusBar()
	updateBlockHp()
}

window.onload = () => {
	initBlock()

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

	spawnBlock()
	update()
}
