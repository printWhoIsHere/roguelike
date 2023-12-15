import { updateDifficult } from './difficultyModal.js'

const modal1 = document.getElementById('modalGameInfo')
const modal2 = document.getElementById('modalGameDifficult')
const btnModal1 = document.getElementById('btnGameInfo')
const btnSwitchModal = document.getElementById('switchModal')
const btnSwitchModalBack = document.getElementById('switchModalBack')
const span1 = document.getElementsByClassName('close')[0]
const span2 = document.getElementsByClassName('close')[1]

function openModal1() {
  modal1.style.display = 'flex'
}

function switchToModal2() {
  modal1.style.display = 'none'
  modal2.style.display = 'flex'
  updateDifficult()
}

function switchToModal1() {
  modal2.style.display = 'none'
  modal1.style.display = 'flex'
}

btnModal1.onclick = openModal1
btnSwitchModal.onclick = switchToModal2
btnSwitchModalBack.onclick = switchToModal1

span1.onclick = () => {
  modal1.style.display = 'none'
}

span2.onclick = () => {
  modal2.style.display = 'none'
}

window.onclick = (event) => {
  if (event.target === modal1) {
    modal1.style.display = 'none'
  }
  if (event.target === modal2) {
    modal2.style.display = 'none'
  }
}
