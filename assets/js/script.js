/**
 * Game variables to display and hide screen, 
 */
let harryAnimation = document.getElementById('flying-animation');
let home = document.getElementById('home');
let header = document.getElementById('header');
let cardSection = document.getElementById('section-card');
let cardContainer = document.getElementById('card-container');
let flipCardInner = document.getElementsByClassName('flip-card-inner');
//Set amount of cards to be displyed 
let Cardcount = 8

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

/**
 * Start the Game as soon as the main button from index.html is clicked
 */
 function startGame(){
   toggleScreen()
   createCard(CardList, Cardcount)
}

 /**
 * Display header, card section and hide the main content from index.html 
 * including harry Animation
 */
  function toggleScreen(){
    home.style.display = "none"
    harryAnimation.style.display = "none"
    header.style.display = "block"
    cardSection.style.display = "block"
}

/**
 * Create cards base on the CardList imformation
 * @param {List} CardList - the card list imformation
 * @param {integer} Cardcount - Provide the amount of card that need to be display
 */
function createCard(CardList, Cardcount){
  for (let i = 0; i< CardList.length - Cardcount; i++){
     let html = `
     <div class="flip-card">
         <div class="flip-card-inner" data-name="${CardList[i].name}">
           <div class="flip-card-front">
             <img src="./assets/images/cards/${CardList[i].image}" alt="image of ${CardList[i].name}">
           </div>
           <div class="flip-card-back">
           <img src="./assets/images/cards/back-of-cards.png" alt="Avatar">
           </div>
         </div>
       </div>
     `
     cardContainer.innerHTML += html
     // Add a duplicate cards
     cardContainer.innerHTML += html
  }

  //Add event listener to all cards
  for(let i=0; i<flipCardInner.length; i++){
    flipCardInner[i].addEventListener('click', rotateCard)
 }

}


function rotateCard(){
console.log('click')
}
