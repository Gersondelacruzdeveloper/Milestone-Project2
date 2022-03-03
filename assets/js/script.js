/**
 * Game variables to display and hide screen, 
 */
let harryAnimation = document.getElementById('flying-animation');
let home = document.getElementById('home');
let header = document.getElementById('header');
let cardSection = document.getElementById('section-card');
let cardContainer = document.getElementById('card-container');
let flipCardInner = document.getElementsByClassName('flip-card-inner');
let isTurnOver  = false;
let lockCard = false
let firstCard, SecondCard;
let points = 10;

//variable for the timer
let timeLeft = 30
let interval = setInterval(countdown, 1000)
let timer = document.getElementById('timer')

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
   //shuffleCard()
   countdown()
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

/**
 * Rotate card when card is click
 * get the first card and second card
 */
function rotateCard(){
  if(lockCard) return;
  if(this === firstCard) return;
  this.classList.add('turn-over')
  if(!isTurnOver){
      isTurnOver= true;
      firstCard = this
  }else{
      isTurnOver = false;
      secondCard = this
      matchCard()
}

/**
 * Match first and second card and keep it revealed
 */
function matchCard(){
  if(firstCard.getAttribute("data-name") === 
  secondCard.getAttribute("data-name")){
    removeListener()
    incrementScore()
  }else{
    //wait 10 seconds and then remove the turn over class
    // so 
    lockCard = true
    removeClass()
  }
}
}


/**
 * Remove the event listeners of the function rotateCard 
 */
function removeListener(){
  firstCard.removeEventListener('click', rotateCard);
  secondCard.removeEventListener('click', rotateCard);
}


/**
 * Remove turn over class from cards 
 */
function removeClass(){
  setTimeout(function(){
    firstCard.classList.remove('turn-over')
    secondCard.classList.remove('turn-over')
    lockCard = false
}, 1000)
}



/**
 *  Shuffle the cards
 */
/*
 const shuffleCard = () => {
  for (let i = cardContainer.children.length; i >= 0; i--) {
      cardContainer.appendChild(cardContainer.children[Math.random() * i | 0]);
  }
}
*/

/**
 * Count dowm timer
 */
function countdown(){
if(timeLeft === 0){
  clearTimeout(interval)
  GameOver()
}else{
  timer.innerHTML = '0 :' + ' ' +  timeLeft
  timeLeft --;
}
}

/**
 * Increment score by 10 every time the user match a card
 */
function incrementScore(){
  document.getElementById('points').innerText = points;
  points = points + 10;
}


/**
 * Run modal when the user have lost
 */
function GameOver(){
let points = parseInt(document.getElementById('points').innerText)
  if(points !== 40){
    OpenModal("#GameOverModal")
}
}

// Open modal
function OpenModal(modalId) {
  $(modalId).modal('show');
}