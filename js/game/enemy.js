import settings from '../settings/settings.js'

class Enemy {
  constructor(name, baseHealth, attack, map) {
    this.name = name
    this.health = baseHealth + Math.floor(Math.random() * 31) - 15 // Случайное значение в пределах [-15, 15] от базового здоровья
    this.attack = attack
    this.map = map
    this.imgEnemy = new Image()
    this.imgEnemy.src = 'images/enemy.png'

    this.randomPlace()
  }

  randomPlace() {
    let randomX, randomY
    do {
      randomX = Math.floor(Math.random() * this.map.width)
      randomY = Math.floor(Math.random() * this.map.height)
    } while (this.map.tiles[randomY][randomX] !== 'floor')

    this.x = randomX
    this.y = randomY
  }

  drawEnemy(ctx, tileSize) {
    const enemyX = this.x * tileSize
    const enemyY = this.y * tileSize
    // this.imgEnemy.onload = () => {
    // ctx.drawImage(this.imgEnemy, enemyX, enemyY, tileSize, tileSize)
    // }
    ctx.fillStyle = 'red'
    ctx.fillRect(enemyX, enemyY, tileSize, tileSize)
  }

  moveRandom() {
    const directions = [
      { dx: 0, dy: -1 }, // Up
      { dx: 0, dy: 1 }, // Down
      { dx: -1, dy: 0 }, // Left
      { dx: 1, dy: 0 }, // Right
    ]

    const randomDirection =
      directions[Math.floor(Math.random() * directions.length)]

    const newX = this.x + randomDirection.dx
    const newY = this.y + randomDirection.dy

    if (this.isValidMove(newX, newY)) {
      this.x = newX
      this.y = newY
    }
  }

  isValidMove(x, y) {
    return (
      x >= 0 &&
      x < this.map.width &&
      y >= 0 &&
      y < this.map.height &&
      this.map.tiles[y][x] === 'floor'
    )
  }

  moveTowardsPlayer(playerX, playerY) {
    const dx = playerX - this.x
    const dy = playerY - this.y

    const distance = Math.sqrt(dx * dx + dy * dy)

    if (distance <= settings.enemy.viewingRadius) {
      const directionX = Math.sign(dx)
      const directionY = Math.sign(dy)

      const newX = this.x + directionX
      const newY = this.y + directionY

      if (this.isValidMove(newX, newY)) {
        this.x = newX
        this.y = newY
      }
    }
  }

  update(playerX, playerY) {
    const playerInViewDistance = this.isPlayerInViewDistance(playerX, playerY)
    if (playerInViewDistance) {
      this.moveTowardsPlayer(playerX, playerY)
    } else {
      this.moveRandom()
    }
  }

  isPlayerInViewDistance(playerX, playerY) {
    const dx = playerX - this.x
    const dy = playerY - this.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    return distance <= 5
  }
}

export { Enemy }
