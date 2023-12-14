import { Map } from './classes/map.js'
import { Hero } from './classes/player.js'
import { handleInput } from './classes/input.js'

const canvas = document.getElementById('gameCanvas')
const ctx = canvas.getContext('2d')

const tileSize = 20
const width = 60
const height = 30

canvas.width = width * tileSize
canvas.height = height * tileSize

const map = new Map(width, height)
const playerCharacter = new Hero('Герой', 100, 20, map)

function updateGameInfo() {
  const modalBody = document.querySelector('#infoModal .modal-body')
  modalBody.innerHTML = `
    <h2>Характеристики героя</h2>
    <p>Имя: ${playerCharacter.name}</p>
    <p>Здоровье: ${playerCharacter.health}</p>
    <p>Атака: ${playerCharacter.attack}</p>
  `
}

function render() {
  map.drawMap(ctx, tileSize)
  playerCharacter.drawCharacter(ctx, tileSize)
  updateGameInfo()
}

render()

handleInput(playerCharacter, tileSize, width, height, render, map)
