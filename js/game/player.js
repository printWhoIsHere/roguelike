const sidebar = document.querySelector('.sidebar')

class Hero {
  constructor(name, health, attack, map) {
    this.name = name
    this.health = health
    this.attack = attack
    this.map = map
    this.imgHero = new Image()
    this.imgHero.src = 'images/hero.png'

    this.randomPlace()
  }

  attackEnemy(enemy) {
    const damageToEnemy = this.attack
    if (damageToEnemy > 0) {
      enemy.health -= damageToEnemy
      sidebar.insertAdjacentHTML(
        'afterbegin',
        `<p>${this.name} атакует ${enemy.name} и наносит ${damageToEnemy} урона!</p>`
      )

      const dx = enemy.x - this.x
      const dy = enemy.y - this.y

      const directionX = dx > 0 ? 1 : dx < 0 ? -1 : 0
      const directionY = dy > 0 ? 1 : dy < 0 ? -1 : 0

      const newX = enemy.x + directionX
      const newY = enemy.y + directionY

      if (enemy.map.tiles[newY][newX] === 'floor') {
        enemy.x = newX
        enemy.y = newY
      }

      if (enemy.health <= 0) {
        sidebar.insertAdjacentHTML(
          'afterbegin',
          `<p>${enemy.name} погибает!</p>`
        )
        enemy.x = -1
        enemy.y = -1
      } else {
        enemy.attackHero(this)
        enemy.x -= directionX
        enemy.y -= directionY
      }
    } else {
      sidebar.insertAdjacentHTML(
        'afterbegin',
        `<p>${this.name} не наносит урона ${enemy.name}!</p>`
      )
    }
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

  drawPlayer(ctx, tileSize) {
    const characterX = this.x * tileSize
    const characterY = this.y * tileSize
    // this.imgHero.onload = () => {
    //   ctx.drawImage(this.imgHero, characterX, characterY, tileSize, tileSize)
    // }
    ctx.fillStyle = 'blue'
    ctx.fillRect(characterX, characterY, tileSize, tileSize)
  }
}

export { Hero }
