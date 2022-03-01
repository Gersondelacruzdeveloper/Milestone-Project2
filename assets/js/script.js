/**
 * Game variables to display hide and screen
 */
let harryAnimation = document.getElementById('flying-animation');
let home = document.getElementById('home');
let header = document.getElementById('header');
let card = document.getElementById('section-card');

/**
 * Start the Game as soon as the main button from index.html is clicked
 */
 function startGame(){
   toggleScreen()
}

 /**
 * Display header, cards and hide the main content from index.html 
 * including harry Animation
 */
  function toggleScreen(){
    home.style.display = "none"
    harryAnimation.style.display = "none"
    header.style.display = "block"
    card.style.display = "block"
}
