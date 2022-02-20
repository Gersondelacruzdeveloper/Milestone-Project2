
let harryAnimation = document.getElementById('flying-animation')
let home = document.getElementById('home')
let header = document.getElementById('header')
let card = document.getElementById('card')

/**
 * This funtion display header element
 * and display none the main content from index.html
 */

 function startGame(){
    toggle()
}

 function toggle(){
    home.style.display = "none"
    harryAnimation.style.display = "none"
    header.style.display = "block"
    card.style.display = "block"
}

