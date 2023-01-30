import { game } from './globals/game'
import { updateBlockHp, spawnBlock, initBlock } from './components/block'
import { updateStatusBar } from './components/status-bar'
import { initUpgrades, updateUpgrades } from './components/upgrades'
import './style.css'

// todo: store list of zones

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

	updateStatusBar()
	updateBlockHp()
	updateUpgrades()
}

window.onload = () => {
	// Initialise game
	initBlock()
	initUpgrades()

	// Spawn first enemy and begin render loop
	spawnBlock()
	update()
}
