let explosion_button = document.querySelector('#explosion-button')
let main = document.querySelector('main')

explosion_button.addEventListener('click', function() {
    setTimeout(() => {
        main.style.display = 'none'
    }, 1000);
    
})