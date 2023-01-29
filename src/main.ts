import { setClickHandlers } from './modules/setClickerHandlers'
import './style.css'

const game = {
	money: 0,
	stage: 1,
	zone: 0,
	currentEnemy: {
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

const enemyPool = [
	[
		{
			name: 'Dirt',
			hp: 200,
			asset: 'dirt.png',
		},
		{
			name: 'Sand',
			hp: 200,
			asset: 'sand.png',
		},
		{
			name: 'Gravel',
			hp: 200,
			asset: 'gravel.png',
		},
	],
]

const blockElem = document.querySelector('#block') as HTMLDivElement
const blockNameElem = document.querySelector('#block-name') as HTMLDivElement
const moneyElem = document.querySelector('#money') as HTMLDivElement
const hpElem = document.querySelector('#block-hp') as HTMLDivElement
const upgradeElems = document.querySelectorAll('.upgrade') as NodeListOf<HTMLDivElement>

function spawnEnemy() {
	// Get random enemy from pool based on current stage
	// todo: spawn enemy based on weight/chance (e.g. 10% chance for ore to spawn)
	const pool = enemyPool[game.zone]
	console.log(enemyPool, game.zone)
	const enemy = pool[Math.floor(Math.random() * pool.length)]

	game.currentEnemy.hp = enemy.hp
	game.currentEnemy.meta_hp = enemy.hp

	console.log(enemy.name, blockNameElem)
	blockNameElem.textContent = enemy.name
	blockElem.style.backgroundImage = `url(${enemy.asset})`
}

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
		spawnEnemy()
	}

	moneyElem.textContent = `$${game.money}`
	hpElem.style.width = `${(game.currentEnemy.hp / game.currentEnemy.meta_hp) * 100}%`
}

window.onload = () => {
	setClickHandlers(blockElem, () => {
		game.currentEnemy.hp -= 10
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

	spawnEnemy()
	update()
}
