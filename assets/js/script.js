//variables
let harryAnimation = document.getElementById('flying-animation')
let home = document.getElementById('home')
let header = document.getElementById('header')
let card = document.getElementById('card')

/**
 * this fuction start the Game 
 */
 function startGame(){
    toggleVisibility()
}



/**
 * This funtion display header element
 * and display none the main content from index.html
 */

function toggleVisibility(){
    home.style.display = "none"
    harryAnimation.style.display = "none"
    header.style.display = "block"
    card.style.display = "block"
}

