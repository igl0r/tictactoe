let explosion_button = document.querySelector('#explosion-button')
let main = document.querySelector('main')
let container_btn = document.querySelector('.container-button')

explosion_button.addEventListener('click', function() {
    setTimeout(() => {
        main.style.display = 'none'
    container_btn.style.display = 'flex'
    }, 1000);
    
})