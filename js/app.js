import { Map } from './game/map.js'
import { Hero } from './game/player.js'
import { Enemy } from './game/enemy.js'
import { handleInput } from './game/input.js'
import { updateGameInfo } from './modals/infoModal.js'
import settings from './settings/settings.js'
import { updateDifficult } from './modals/difficultyModal.js'

const canvas = document.getElementById('gameCanvas')
const ctx = canvas.getContext('2d')

const { width, height, tileSize } = settings.global

canvas.width = width * tileSize
canvas.height = height * tileSize

const map = new Map(width, height)
const playerCharacter = new Hero('Герой', 100, 20, map)

const enemies = []
for (let i = 0; i < settings.enemy.quantity; i++) {
  const enemy = new Enemy(
    `Монстр-${i + 1}`,
    settings.enemy.health,
    settings.enemy.attack,
    map
  )
  enemies.push(enemy)
}

function render() {
  map.drawMap(ctx, tileSize)
  playerCharacter.drawPlayer(ctx, tileSize)
  enemies.forEach((enemy) => enemy.drawEnemy(ctx, tileSize))
  enemies.forEach((enemy) => enemy.update(playerCharacter.x, playerCharacter.y))
  updateGameInfo(playerCharacter, enemies)
}

render()

handleInput(playerCharacter, tileSize, width, height, render, map)
