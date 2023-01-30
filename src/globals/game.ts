export const game = {
	money: 0,
	stage: 1,
	zone: 0,
	enemiesLeft: 10,
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
