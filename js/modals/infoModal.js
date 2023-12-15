export function updateGameInfo(player, enemies) {
  const modalBody = document.querySelector('#modalGameInfo .modal-body')

  let enemyInfo = ''
  enemies.forEach((enemy, index) => {
    if (enemy.health > 0) {
      enemyInfo += `
      <h2>Характеристики монстра ${index + 1}</h2>
      <p>Имя: ${enemy.name}</p>
      <p>Здоровье: ${enemy.health}</p>
      <p>Атака: ${enemy.attack}</p>
      `
    }
  })

  modalBody.innerHTML = `
    <h2>Характеристики героя</h2>
    <p>Имя: ${player.name}</p>
    <p>Здоровье: ${player.health}</p>
    <p>Атака: ${player.attack}</p>
    
    ${enemyInfo}
  `
}
