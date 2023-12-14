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

  randomPlace() {
    let randomX, randomY
    do {
      randomX = Math.floor(Math.random() * this.map.width)
      randomY = Math.floor(Math.random() * this.map.height)
    } while (this.map.tiles[randomY][randomX] !== 'floor')

    this.x = randomX
    this.y = randomY
  }

  drawCharacter(ctx, tileSize) {
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
