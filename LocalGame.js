let local_game_btn = document.querySelector('.local-game')
let game_container = document.querySelector('.game-container')
let board = document.querySelector('.board')
local_game_btn.addEventListener('click', function(){
    game_container.style.display='flex'

})
//document.addEventListener('DOMContentLoaded', function(){
    let cells = document.querySelectorAll('.cell')
    let current_player = 'X'
    let game_active = true
    let board_array = Array(9).fill(null)
    
    function check_user(){
        let win_con = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]
        for (let i of win_con){
            let [a, b, c] = i
            if (board_array[a] && board_array[a] === board_array[b] && board_array[c] === board_array[b]){
                game_active = false
                setTimeout(() => {alert(`${current_player} победил!`)}, 100)
                return true
            }
        }
        

        if (!board_array.includes(null)){
            game_active = false
            setTimeout(() => {alert(`Ничья!`)}, 100)
            return true
        }
        return false
    }

        function click_response(event){
            let index = event.target.dataset.index
            if (!game_active || board_array[index]) {
                return
            }
            board_array[index] = current_player
            event.target.textContent = current_player

            if (!check_user()){
                current_player = current_player === 'X' ? '0' : 'X'
            }
        }
        Array.from(cells).forEach(cell => cell.addEventListener('click', click_response))
    

//})

