import settings from '../settings/settings.js'

const modalBody = document.querySelector('#modalGameDifficult .modal-body')

function updateDifficult() {
  modalBody.innerHTML = `
    <div class="row"><p>Количество комнат:</p> <input id="numRoomsInput" value="${settings.map.numRooms}" max="20"></div>
    <div class="row"><p>Количество монстров:</p> <input id="numMonstersInput" value="${settings.enemy.quantity}" max="5"></div>
  `

  const numRoomsInput = document.getElementById('numRoomsInput')
  const numMonstersInput = document.getElementById('numMonstersInput')

  numRoomsInput.addEventListener('input', (event) => {
    settings.map.numRooms = parseInt(event.target.value)
  })

  numMonstersInput.addEventListener('input', (event) => {
    settings.enemy.quantity = parseInt(event.target.value)
  })
}

export { updateDifficult }
