let local_game_btn = document.querySelector('.local-game')
let container_btn1 = document.querySelector('.container-button')
let game_container = document.querySelector('.game-container')
let board = document.querySelector('.board')
local_game_btn.addEventListener('click', function(){
    container_btn1.style.display='none'
    game_container.style.display='flex'

})
document.addEventListener('DOMContentLoaded', function(){
    let cells = document.querySelectorAll('.cell')
    let current_player = 'X'
    let game_active = true
    let board_array = Array(9).fill(null)
    
})