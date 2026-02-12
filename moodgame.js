alert("Welcome! Enjoy the game!")

/*-------------------------------- Constants --------------------------------*/
const MEMORIZE_TIME = 3000

/*---------------------------- Variables (state) ----------------------------*/
let board = []
let firstCard = null
let secondCard = null
let lockBoard = false
let matchedCards = []
let score = 0
let gameStarted = false
let isMemorizing = false

/*------------------------ Cached Element References ------------------------*/
const cardEls = document.querySelectorAll(".rectangular")
const messageEl = document.querySelector("#message")
const scoreEl = document.querySelector("#scoreDisplay")
const startBtn = document.querySelector("#start")
const resetBtn = document.querySelector("#reset")
const countdownOverlay = document.querySelector("#countdown-overlay")
const countdownNumber = document.querySelector("#countdown-number")
const countdownText = document.querySelector("#countdown-text")

/*---------------------------- Game Data ----------------------------*/

const MOOD_DATA = [
  { image: "./assets/mood1.png", name: "mood1" },
  { image: "./assets/mood2.png", name: "mood2" },
  { image: "./assets/mood3.png", name: "mood3" },
  { image: "./assets/mood4.png", name: "mood4" },
  { image: "./assets/mood5.png", name: "mood5" },
  { image: "./assets/mood6.png", name: "mood6" },
  { image: "./assets/mood7.png", name: "mood7" },
  { image: "./assets/mood8.png", name: "mood8" },
]
/*-------------------------------- Functions --------------------------------*/

// const LEVEL_TWO_MOODS = [
//   { image: "./assets/mood1.png", name: "mood1" },
//   { image: "./assets/mood2.png", name: "mood2" },
//   { image: "./assets/mood3.png", name: "mood3" },
//   { image: "./assets/mood4.png", name: "mood4" },
//   { image: "./assets/mood5.png", name: "mood5" },
//   { image: "./assets/mood6.png", name: "mood6" },
//   { image: "./assets/mood7.png", name: "mood7" },
//   { image: "./assets/mood8.png", name: "mood8" },
// ]

// let MOOD_DATA = [...LEVEL_ONE_MOODS]
/*-------------------------------- Functions
--------------------------------*/

function init() {
  clearInterval(timerInterval)
  card.dataset.name = board[index].name
  //reset game state
  scoreDisplay = 0
  // liveDisplay = 30
  // currentLevel = 1
  matchedCards = []
  lockBoard = true
  firstCard = null
  secondCard = null
  // timeLeft = 90
  gameStarted = false
  //set level 1 moods
  // MOOD_DATA = [...LEVEL_ONE_MOODS]
  //update the display//
  updateScore()
  messageEl.textContent = "Click START to begin!"
  // reset the cards//
  // resetCards()

  //hide overlays for now //
  countdownOverlay.style.display = "none"
  document.getElementById("game-popup").style.display = "none"
  //hide the leaderboard button until they win we will update it//

  // if (leaderboardBtn) leaderboardBtn.style.display = "none"

  // scoreEl.textContent = `Score: ${scoreDisplay}`
  // livesEl.textContent = `Lives: ${liveDisplay}`
  // timeEl.textContent = `Time: 15`
  // pairs and shuffle//
}

function resetCards() {
  const moodPairs = [...MOOD_DATA, ...MOOD_DATA]
  board = moodPairs.sort(() => Math.random() - 0.5)

  //reset all cards to show the pattern//
  cardEls.forEach((card, index) => {
    card.classList.remove("flipped")
    card.innerHTML = ""
    card.style.pointerEvents = "auto"
    // we will set data attributes//
    if (id < board.length) {
      card.dataset.name = board[cardId].name
    }
  })
  // messageEl.textContent = "Find the matches!" // to clear any images//
}
//render takes the code and turn it into something the user see it also update the data and keep things in sync //

function updateDisplays() {
  scoreEl.textContent = `Score: ${scoreDisplay}`
  livesEl.textContent = `Lives: ${liveDisplay}`
  timeEl.textContent = `Time: ${timeLeft}s`

  if (levelEl) {
    levelEl.textContent = `Level: ${currentLevel}`
  }
  // cardEls.forEach((card, index) => {
  //   if (board[index])
  //     card.innerHTML = `<img src ="${board[index].image}" alt = "${board[index].name}">`
  // })
}

function startGame() {
  if (gameStarted) return
  gameStarted = true
  lockBoard = true
  startMemorizationPhase()
}

startGame()

function startMemorizationPhase() {
  isMemorizing = true
  messageEl.textContent = "Get ready to memorize!"
}

// to make it work //
// init()
// this will prevent us from clicking if the board is locked //
// showing all cards now//

function flipCardsFunction() {
  cardEls.forEach((card, index) => {
    if (index < board.length) {
      card.classList.add("flipped")
      card.innerHTML = `<img src="${board[cardId].image}" alt="${board[cardId].name}">`
    }
    card.addEventListener("click", flipCard)
  })
}

function flipBack() {
  cardEls.forEach((card, index) => {
    if (index < board.length) {
      card.classList.remove("flipped")
      card.innerHTML = ""
    }
    card.addEventListener("click", flipBack)
  })
}

// function unflipCardsFunction() {
//   if (gameStarted) {
//     cardEls.forEach((card) => {
//       card.classList.remove("flipped")
//     })
//   }
// }

// setInterval(unflipCardsFunction, 6000)

// showing the countdown overlay so -- is deducting a life//
countdownOverlay.style.display = "flex"
countdownText.textContent = "Memorize the cards"
let countdown = 3
countdownNumber.textContent = countdown
const countdownInterval = setInterval(() => {
  countdown--
  if (countdown > 0) {
    countdownNumber.textContent = countdown
  } else {
    clearInterval(countdownInterval)
    endMemorizationPhase()
  }
}, 1000)

function endMemorizationPhase() {
  isMemorizing = false
  countdownOverlay.style.display = "none"

  //  we can now hide all cards after showing them for 3 seconds//
  messageEl.textContent = "Find the matches"
  lockBoard = false
  // startTimer()
}

// function startTimer() {
//   clearInterval(timerInterval)
//   timeLeft = 90
//   updateDisplays()

timerInterval = setInterval(() => {
  timeLeft--
  updateDisplays()
  if (timeLeft <= 0) {
    clearInterval(timerInterval)
    messageEl.textContent = "Time's up Game Over"
    lockBoard = true
    endGame(false)
  }
}, 1000)

// this thing won't allow the same matches to be clicked twice or the same card to be clicked twice//
function flipCard(event) {
  console.log("FLIPPING")
  if (lockBoard) return
  const clickedCard = event.currentTarget
  console.log(clickedCard)

  const cardId = parseInt(clickedCard.id)
  console.log(cardId)
  if (cardId >= board.length) return
  clickedCard.classList.add("flipped")
  clickedCard.innerHTML = `<img src="${board[cardId].image}" alt="${board[cardId].name}">`

  if (!firstCard) {
    firstCard = clickedCard
    firstCard.dataset.name = board[cardId].name
  } else {
    secondCard = clickedCard
    secondCard.dataset.name = board[cardId].name
    checkForMatch()
  }
}
//the contain = checking if the html has this item inside another //
//get the card index (the parseint) it will literally translate the string to a number
//now we flip the card//
// we called the card by the image and name what we did last time was add index which it did not have //
// function showCard(event) {
//   if (event.target.id) {
//     console.log(event.target.id)
//     event.target.innerHTML = `<img src ="${board[0].image}" alt = "${board[0].name}">`
//   }
// }
// what we are doing no wis storing the clicked card the first pair and for the second else is the second pair and check if they match true or false//
// we call the match function//
function checkForMatch() {
  // match found then we check if they won the game//
  if (firstCard.dataset.name === secondCard.dataset.name) {
    scoreDisplay += 10
    matchedCards.push(firstCard, secondCard)
    // if (matchedCards.length === cardEls.length) {
    messageEl.textContent = "Matched +10 points"
  } else {
    messageEl.textContent = "No match try again"
    setTimeout(() => {
      firstCard.classList.remove("flipped")
      secondCard.classList.remove("flipped")
      firstCard.innerHTML = ""
      secondCard.innerHTML = ""
      firstCard = null
      secondCard = null
    })
  }
}
// if (currentLevel === 1 && scoreDisplay >= LEVEL_ONE_SCORE) {
//   setTimeout(levelUp, 500)
// } else if (matchedCards.length === MOOD_DATA.length * 2) {
//   if (currentLevel === 1) {
//     setTimeout(levelUp, 500)
//   } else {
//     clearInterval(timerInterval)
//     setTimeout(() => endGame(true), 500)
//   }
// }
// firstCard.innerHTML = ""
// secondCard.innerHTML = ""
// updateDisplays()
// flipCard()
firstCard = null
secondCard = null
// } else {
//   messageEl.textContent = "No match try again"
//   setTimeout(() => {
//     firstCard.classList.remove("flipped")
//     secondCard.classList.remove("flipped")
//     firstCard.innerHTML = ""
//     secondCard.innerHTML = ""
//     firstCard = null
//     secondCard = null
//     // Optionally, reset turn here if needed
//   })}

function endGame(isWin) {
  lockBoard = true
  clearInterval(timerInterval)
  const finalScore = document.getElementById("final-score")
}
//     liveDisplay--
//     if (liveDisplay <= 0) {
//       clearInterval(timerInterval)
//       setTimeout(() => endGame(false), 1000)
//     }
//     updateDisplays()
//   }
// }

// } else {
// messageEl.textContent = "Matched!"

// function levelUp() {
//   clearInterval(timerInterval)
//   currentLevel = 2
//   messageEl.textContent = "Level Up"
//   updateDisplays()
//   setTimeout(() => {
//     resetCards()
//     startMemorizationPhase()
//   }, 2000)
// }

function resetTurn() {
  ;[firstCard, secondCard] = [null, null]
  lockBoard = false
}

// and if there is no match then reset the turn and say try again//
// } else {
//   lockBoard = true
//   messageEl.textContent = "Try again"

// flip the cards if there is a delay//
// setTimeout(() => {
//   firstCard.classList.remove("flipped")
//   secondCard.classList.remove("flipped")
//   firstCard.innerHTML = ""
//   secondCard.innerHTML = ""
// reset turn will flip the cards over if they did not match + clear variables to null (first+second cards) also it let the player click again on board//

//   resetTurn()
// }, 1000)

// now we will make the live display deduct one life if not matched// also the thing we used is different than += or == now it's <= which means it's less than or equal zero = so to sum it up if your lives are 0 then display will pop a message saying no lives left // the thing after the livesDisplay mean -- to take the number and subtract 1//
//   liveDisplay--
//   if (liveDisplay <= 0) {
//     messageEl.textContent = " No Lives Left "
//     lockBoard = true
//   }
// }

//   render()
// }

// function resetTurn() {
//   ;[firstCard, secondCard] = [null, null]
//   lockBoard = false
// }

// function handleMatch(event)

// function handleClick(event) {
//   if (lockBoard) return
//   const card = event.target
//   if (card === mood1) return
// }
// function handleClick(event) {}

startBtn.addEventListener("click", () => {
  setTimeout(flipCardsFunction, 1000)
  setTimeout(flipBack, 5000)
})
resetBtn.addEventListener("click", init)
cardEls.forEach((card) => {
  function flipCard(event) {
    if (lockBoard) return
    const clickedCard = event.currentTarget
  }
  card.addEventListener("click", flipCard)
})
