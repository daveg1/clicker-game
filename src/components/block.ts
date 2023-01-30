import { enemyPool } from '../globals/enemyPool'
import { game } from '../globals/game'
import { setClickHandlers } from '../modules/setClickerHandlers'

// HTML elements
const blockAssetElem = document.querySelector('#block-asset') as HTMLDivElement
const blockNameElem = document.querySelector('#block-name') as HTMLDivElement
const blockHpElem = document.querySelector('#block-hp') as HTMLDivElement

export function initBlock() {
	setClickHandlers(blockAssetElem, (e: MouseEvent) => {
		game.currentEnemy.hp -= 10

		// todo: click effect
		console.log(e.clientX, e.clientY)
	})
}

export function spawnBlock() {
	// Get random enemy from pool based on current stage
	// todo: spawn enemy based on weight/chance (e.g. 10% chance for ore to spawn)
	const pool = enemyPool[game.zone]
	const enemy = pool[Math.floor(Math.random() * pool.length)]

	game.currentEnemy.hp = enemy.hp
	game.currentEnemy.meta_hp = enemy.hp

	console.log(enemy.name, blockNameElem)
	blockNameElem.textContent = enemy.name
	blockAssetElem.style.backgroundImage = `url(${enemy.asset})`
}

export function updateBlockHp() {
	blockHpElem.style.width = `${(game.currentEnemy.hp / game.currentEnemy.meta_hp) * 100}%`
}
