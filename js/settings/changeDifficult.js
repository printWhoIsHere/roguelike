import settings from './settings.js'

const btnChangeDifficult = document.getElementById('difficultGame')
btnChangeDifficult.addEventListener('click', () => {
  const modal = document.querySelector('#infoModal')
  modal.innerHTML = `
		<div class="modal-dialog">
			<div class="modal-content">
					<div class="modal-header">
							<h5 class="modal-title" id="infoModalLabel">Выбор сложности</h5>
							<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
					</div>
					<div class="modal-body">
						<p class="d-flex justify-content-between">Количество комнат: <input type="number" value='${settings.map.numRooms}'></input></p>
						<p class="d-flex justify-content-between">Количество врагов: <input type="number" value='${settings.enemy.quantity}'></input></p>
					</div>
					<div class="modal-footer">
							<button type="button" class="btn btn-dark" data-bs-dismiss="modal">Вернуться</button>
					</div>
			</div>
	</div>
	`
})
