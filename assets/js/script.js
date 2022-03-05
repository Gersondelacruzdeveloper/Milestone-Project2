
document.addEventListener("DOMContentLoaded", function() {
  let timer = document.getElementById('timer')
  timer.innerHTML = '0 :' + ' ' +  0
  createCard(CardList, Cardcount)
  OpenModal("#welcome-modal")
  lockScreenOpenModal('#welcome-modal', 'welcome-modal-btn')
})

/**
 * Game variables
 */
 let cardContainer = document.getElementById('card-container');
 let flipCardInner = document.getElementsByClassName('flip-card-inner');
 let isTurnOver  = false;
 let lockCard = false
 let firstCard, SecondCard;
 let points = 10;
 //variable for the timer
 let timeLeft = 30
 let timer = document.getElementById('timer')
 //Set amount of cards to be displyed 
 let Cardcount = 8

let interval = null
 
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
  * Start the Game as soon as the main button from the welcome modal is clicked
  */
  function startGame(){
    //shuffleCard()
    countDown()
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
  const shuffleCard = () => {
   for (let i = cardContainer.children.length; i >= 0; i--) {
       cardContainer.appendChild(cardContainer.children[Math.random() * i | 0]);
   }
 }

 
 /**
  * Increment score by 10 every time the user match a card
  */
 function incrementScore(){
   document.getElementById('points').innerText = points;
   points = points + 10;
   congratLevel()
 }

/**
  * Reset score to 0 every time the user start again
  */
 function resetScore(){
  points = 0
  document.getElementById('points').innerText = points;
  points = points + 10;
 }
 
 /**
  * Run modal when the user have lost and turn all cards back
  */
 function GameOver(){
 let points = parseInt(document.getElementById('points').innerText)
   if(points !== 40){
     OpenModal("#GameOverModal")
     lockScreenOpenModal('#GameOverModal', 'restart')
     closeAllcards()
 }
 }
 
 // Open modal
 function OpenModal(modalId) {
   $(modalId).modal('show');
 }

 /**
  * Count dowm timer
  */
  function countDown(){
    interval = setInterval(function(){
      if(timeLeft === 0){
        timer.innerHTML = '0 :' + ' ' +  0
        stopCountDown()
        GameOver()
      }else{
        timer.innerHTML = '0 :' + ' ' +  timeLeft
        timeLeft --;
      }
    }, 1000)
  }

//Call the game over modal  and execute restartGame function
let restart = document.getElementById("restart")
restart.addEventListener('click', restartGame)

/**
 * Restart Game
 */
function restartGame(){
   timeLeft = 30
   countDown()
   resetScore()
   shuffleCard()
   //location.reload()
}


/**
 * flips back all cards with the class of turn-over
 */
function closeAllcards(){
  for(let i=0; i<flipCardInner.length; i++){
    flipCardInner[i].classList.remove('turn-over')
    flipCardInner[i].addEventListener('click', rotateCard)

 }
}

/**
 * Do not allow the user to to skip the modal
 * User have to click the modal in order to play the game,
 * also it allow to go to any links they want in the footer
 * @param {str} modalId - the id that open the modal
 * @param {str} modalBtnId - the id of the modal button / allow access to play
 */
function lockScreenOpenModal(modalId, modalBtnId){
  let lockscreen = true
  let modalBtn = document.getElementById(modalBtnId)
  let footer = document.getElementById('footer')
   document.body.addEventListener('click', function(event){
     let iSmodalBtnClick = modalBtn.contains(event.target);
     let isFooterClick = footer.contains(event.target)
     if(!iSmodalBtnClick && lockscreen === true){
       OpenModal(modalId)
       closeAllcards()
       resetScore()
     }else if(iSmodalBtnClick || isFooterClick){
       document.body.removeEventListener('click', this)
       lockscreen = false
     }
   });

}

/**
 * Open congratulation level 2 modal
 * Stop the the timer
 */
function congratLevel(){
  if(points === 50){
    setTimeout(function(){
      OpenModal("#level2-modal")
      lockScreenOpenModal('#level2-modal', 'level2-modal-btn')
      stopCountDown()
  }, 1000)
  }
}

/**
 * stop the timer
 */
function stopCountDown(){
  clearInterval(interval)
}

/**
 * Reset the the timer
 */
function resetCountDown(){
  stopcountdown()
  document.getElementById('timer').innerText = 0
  countdown()
}
