document.addEventListener("DOMContentLoaded", function () {
  let timer = document.getElementById('timer')
  timer.innerHTML = '0 :' + ' ' + 0;
  openModal("#welcome-modal")
  lockScreenOpenModal('#welcome-modal', 'welcome-modal-btn')
  createCard(CardList, Cardcount)
})

/**
 * Game variables
 */
let cardContainer = document.getElementById('card-container');
let flipCardInner = document.getElementsByClassName('flip-card-inner');
let isTurnOver = false;
let lockCard = false
let firstCard, SecondCard;
//variable for the timer
let timeLeft = 30;
let interval = null
let timer = document.getElementById('timer')
//Set amount of cards to be displyed 
let Cardcount;
let points = 0;
cardsQuantity()

//Audios variables
let mute = false
const flipAudio = new Audio('./assets/audio/card-flip.mp3')
const unFlipAudio = new Audio('./assets/audio/unflip.mp3');
const cardsMatchAudio = new Audio("./assets/audio/cards-match.mp3");
const levelCompleteAudio = new Audio("./assets/audio/level-complete.mp3");
const gameOverAudio = new Audio("./assets/audio/game-over.mp3");
const congratsAudio = new Audio("./assets/audio/winner.mp3");

/**
 * Play the saunds when the cards are flips
 */
function flipSound() {
  if (mute == false) {
    flipAudio.play();
  }
}

/**
 * Play the saunds when the cards are flip back
 */
function unFlipSound() {
  if (mute == false) {
    unFlipAudio.play();
  }
}

/**
 * Play the saunds when the cards are matched
 */
function cardsMatchSound() {
  if (mute == false) {
    cardsMatchAudio.play();
  }
}

/**
 * Play the saunds when level one and 2 have been completed
 */
function levelCompleteSound() {
  if (mute == false) {
    levelCompleteAudio.play();
  }
}


/**
 * Play the saunds when the game is over
 */
function gameOverSound() {
  if (mute == false) {
    gameOverAudio.play();
  }
}

/**
 * Play the saunds when the game is finished and the user has won 
 */
function congratsSound() {
  if (mute == false) {
    congratsAudio.play();
  }
}

/**
 * Mute all sounds 
 */
function muted() {
  mute = true;
}

/**
 * Unmute all sounds
 */
function unmuted() {
  mute = false;
}

//Add event listener to the id
let toggleBtn = document.getElementById('toggleBtn')
toggleBtn.addEventListener('click', toggleMainSounds)

/**
 * Toggle the sound icon
 */

function toggleMainSounds() {
  if (mute === false) {
    toggleBtn.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`
    muted()
  } else if (mute === true) {
    toggleBtn.innerHTML = `<i class="fa-solid fa-volume-high"></i>`
    unmuted()
  }
}

/**
 * Show instrunction modal when the instruction icon is clicked
 */
function showInstructions() {
  openModal("#instruction-modal")
}



// Card list Information, include name and images
const CardList = [{
    name: "bellatrix",
    image: "bellatrix.png"
  },
  {
    name: "bumbledore",
    image: "bumbledore.png"
  },
  {
    name: "hagrid",
    image: "hagrid.png"
  },
  {
    name: "harry",
    image: "harry.png"
  },
  {
    name: "hermione",
    image: "hermione.png"
  },
  {
    name: "luna",
    image: "luna.png"
  },
  {
    name: "malfoy",
    image: "malfoy.png"
  },
  {
    name: "mcGonagall",
    image: "mcGonagall.png"
  },
  {
    name: "neville",
    image: "neville.png"
  },
  {
    name: "ron",
    image: "ron.png"
  },
  {
    name: "snape",
    image: "snape.png"
  },
  {
    name: "voldermore",
    image: "voldermore.png"
  },
];
/**
 * Start the Game as soon as the main button from the welcome modal is clicked
 */
function startGame() {
  shuffleCard()
  countDown()
  unmuted()
}

/**
 * Create cards base on the CardList imformation
 * @param {List} CardList - the card list imformation
 * @param {integer} Cardcount - Provide the amount of card that need to be display
 */
function createCard(CardList, Cardcount) {
  for (let i = 0; i < CardList.length - Cardcount; i++) {
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
  for (let i = 0; i < flipCardInner.length; i++) {
    flipCardInner[i].addEventListener('click', rotateCard)
  }
}

/**
 * Rotate card when card is click
 * get the first card and second card
 */
function rotateCard() {
  if (lockCard) return;
  if (this === firstCard) return;
  this.classList.add('turn-over')
  flipSound()
  if (!isTurnOver) {
    isTurnOver = true;
    firstCard = this
  } else {
    isTurnOver = false;
    secondCard = this
    matchCard()
  }

  /**
   * Match first and second card and keep it revealed
   */
  function matchCard() {
    if (firstCard.getAttribute("data-name") ===
      secondCard.getAttribute("data-name")) {
      removeListener()
      cardsMatchSound()
      incrementScore()
    } else {
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
function removeListener() {
  firstCard.removeEventListener('click', rotateCard);
  secondCard.removeEventListener('click', rotateCard);
}


/**
 * Remove turn over class from cards 
 */
function removeClass() {
  setTimeout(function () {
    firstCard.classList.remove('turn-over')
    secondCard.classList.remove('turn-over')
    lockCard = false
    unFlipSound()
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
function incrementScore() {
  points = points + 10;
  document.getElementById('points').innerText = points;
  congratLevel()
  positionPoints()
  positPointsPhones()
}

/**
 * Reset score to 0 every time the user start again
 */
function resetScore() {
  points = 0;
  document.getElementById('points').innerText = points;
}

/**
 * Run modal when the user have lost and turn all cards back
 */
function gameOver() {
  points = parseInt(document.getElementById('points').innerText)
  if (points != 40 || points != 120 || points != 240) {
    gameOverSound()
    openModal("#GameOverModal")
    lockScreenOpenModal('#GameOverModal', 'restart')
    closeAllcards()
    cardsQuantity()
    cardContainer.innerHTML = ''
    createCard(CardList, Cardcount)
  }
}

// Open modal
function openModal(modalId) {
  $(modalId).modal('show');
}

/**
 * Count dowm timer
 */
function countDown() {
  interval = setInterval(function () {
    if (timeLeft === 0) {
      timer.innerHTML = '0 :' + ' ' + 0
      stopCountDown()
      gameOver()
    } else {
      timer.innerHTML = '0 :' + ' ' + timeLeft
      timeLeft--;
    }
  }, 1000)
}


/**
 * Restart Game
 */
function restartGame() {
  points = 0
  timeLeft = 30
  countDown()
  resetScore()
  cardsQuantity()
  cardContainer.innerHTML = ''
  createCard(CardList, Cardcount)
  positionPoints()
  positPointsPhones()
  makeFooterFixed()
  shuffleCard()
}

/**
 * Flips back all cards with the class of turn-over
 */
function closeAllcards() {
  for (let i = 0; i < flipCardInner.length; i++) {
    flipCardInner[i].classList.remove('turn-over')
  }
}

/**
 * Do not allow the user to to skip the modal
 * User have to click the modal in order to play the game,
 * also it allow to go to any links they want in the footer
 * @param {str} modalId - the id that open the modal
 * @param {str} modalBtnId - the id of the modal button / allow access to play
 */
function lockScreenOpenModal(modalId, modalBtnId) {
  let lockscreen = true
  let modalBtn = document.getElementById(modalBtnId)
  let footer = document.getElementById('footer')
  document.body.addEventListener('click', function (event) {
    let iSmodalBtnClick = modalBtn.contains(event.target);
    let isFooterClick = footer.contains(event.target)
    if (!iSmodalBtnClick && lockscreen === true) {
      openModal(modalId)
      closeAllcards()
      resetScore()
      muted()
    } else if (iSmodalBtnClick || isFooterClick) {
      document.body.removeEventListener('click', this)
      lockscreen = false
    }
  });

}

/**
 * Open congratulation level 2 modal
 * Stop the the timer
 */
function congratLevel() {
  if (points === 40) {
    setTimeout(function () {
      levelCompleteSound()
      openModal("#level2-modal")
      lockScreenOpenModal('#level2-modal', 'level2-modal-btn')
      stopCountDown()
    }, 1000)
  } else if (points === 120) {
    setTimeout(function () {
      levelCompleteSound()
      openModal("#level3-modal")
      lockScreenOpenModal('#level3-modal', 'level3-modal-btn')
      stopCountDown()
    }, 1000)
  } else if (points === 240) {
    setTimeout(function () {
      congratsSound()
      openModal("#congrat-modal")
      lockScreenOpenModal('#congrat-modal', 'congrat-modal-btn')
      stopCountDown()
    }, 1000)
  }
}

/**
 * stop the timer
 */
function stopCountDown() {
  clearInterval(interval)
}

/**
 * Reset the the timer
 */
function resetCountDown() {
  setTimeleft()
  stopCountDown()
  timer.innerHTML = '0 :' + ' ' + 0
  countDown()
}

/**
 * Check what level user is and select the right amount of cards 
 * for each level
 */
function cardsQuantity() {
  if (points === 0) {
    Cardcount = 8
  } else if (points === 40) {
    Cardcount = 4
  } else if (points === 120) {
    Cardcount = 0
  }
  return Cardcount
}

/**
 * Advence  to level 2
 */
function level2Game() {
  points = 40
  document.getElementById('points').innerText = points
  resetCountDown()
  cardsQuantity()
  cardContainer.innerHTML = ''
  createCard(CardList, Cardcount)
  makeFooterStatic()
  shuffleCard()
}

/**
 * Advence  to level 3
 */
function level3Game() {
  points = 120
  document.getElementById('points').innerText = points
  resetCountDown()
  cardsQuantity()
  cardContainer.innerHTML = ''
  createCard(CardList, Cardcount)
  shuffleCard()
  makeFooterStatic()
}


/**
 * Help the resetCountDown funtion to update the time for every level
 */
function setTimeleft() {
  if (points === 0) {
    timeLeft = 30;
  } else if (points === 40) {
    timeLeft = 50;
  } else if (points === 120) {
    timeLeft = 60;
  }
  return timeLeft;
}


/**
 * Centralize the position points on the image in tablet, compueter etc
 */

function positionPoints() {
  if (window.innerWidth > '768') {
    if (points > 0 && points < 100) {
      document.getElementById('points').style.right = "65px";
    } else if (points >= 100) {
      document.getElementById('points').style.right = "50px";
    } else {
      document.getElementById('points').style.right = "70px"
    }
  }
}


/**
 * Trantralize the position points when the window width is 768px down
 */
function positPointsPhones() {
  if (window.innerWidth <= '768') {
    if (points > 0 && points < 100) {
      document.getElementById('points').style.right = "43px";
      console.log(points)
    } else if (points >= 100) {
      document.getElementById('points').style.right = "35px";
    } else {
      document.getElementById('points').style.right = "50px"
    }
  }
}

/**
 * Make footer static
 */
function makeFooterStatic() {
  if (window.innerWidth <= '768') {
    if (points > 40) {
      document.getElementsByTagName('footer')[0].style.position = 'static';
    }
  } else {
    if (points === 40) {
      document.getElementsByTagName('footer')[0].style.position = 'static';
    }

  }

}

/**
 * Make footer fixed
 */
function makeFooterFixed() {
  if (points === 0) {
    document.getElementsByTagName('footer')[0].style.position = 'fixed'
  }
}