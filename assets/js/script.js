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

// Card list Information, include name and images
const CardList = [
  {name:"bellatrix", image:"bellatrix.png"},
  {name:"bumbledore", image:"bumbledore.png"},
  {name:"hagrid", image:"hagrid.png"},
  {name:"harry", image:"harry.png"},
  {name:"hermione", image:"hermione.png"},
  {name:"luna", image:"luna.png"},
  {name:"malfoy", image:"malfoy.png"},
  {name:"mcGonagall", image:"mcGonagall.png"},
  {name:"neville", image:"neville.png"},
  {name:"ron", image:"ron.png"},
  {name:"snape", image:"snape.png"},
  {name:"voldermore", image:"voldermore.png"},
];