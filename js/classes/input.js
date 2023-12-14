function handleInput(
  playerCharacter,
  tileSize,
  mapWidth,
  mapHeight,
  render,
  map
) {
  window.addEventListener('keydown', (event) => {
    let nextX = playerCharacter.x
    let nextY = playerCharacter.y

    switch (event.key) {
      case 'ArrowUp':
        nextY = Math.max(0, playerCharacter.y - 1)
        break
      case 'ArrowDown':
        nextY = Math.min(mapHeight - 1, playerCharacter.y + 1)
        break
      case 'ArrowLeft':
        nextX = Math.max(0, playerCharacter.x - 1)
        break
      case 'ArrowRight':
        nextX = Math.min(mapWidth - 1, playerCharacter.x + 1)
        break
      default:
        break
    }

    if (map.tiles[nextY][nextX] === 'floor') {
      playerCharacter.x = nextX
      playerCharacter.y = nextY
      render()
    }
  })
}

export { handleInput }
