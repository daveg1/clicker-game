import { setClickHandlers } from './modules/setClickerHandlers'
import './style.css'

const game = {
	money: 0,
	enemy: {
		hp: 200,
		meta_hp: 200,
	},
	upgrades: [
		{
			name: 'Wooden Pickaxe',
			level: 0,
			cost: 100,
			base_dps: 5,
		},
		{
			name: 'Stone Pickaxe',
			level: 0,
			cost: 1000,
			base_dps: 50,
		},
	],
}

const blockElem = document.querySelector('#block') as HTMLDivElement
const moneyElem = document.querySelector('#money') as HTMLDivElement
const hpElem = document.querySelector('#hp') as HTMLDivElement
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
	game.enemy.hp -= curr_dps

	// Check enemy
	if (game.enemy.hp <= 0) {
		game.money += 100
		// todo: spawnEnemy() method
		game.enemy.hp = game.enemy.meta_hp
	}

	moneyElem.textContent = `$${game.money}`
	hpElem.style.width = `${(game.enemy.hp / game.enemy.meta_hp) * 100}%`
}

window.onload = () => {
	setClickHandlers(blockElem, () => {
		game.enemy.hp -= 10
	})

	upgradeElems.forEach((upgradeElem, index) => {
		const button = upgradeElem.querySelector('.upgrade__button') as HTMLDivElement
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

	update()
}
