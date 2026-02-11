alert("welcome! enjoy the game")

/*-------------------------------- Constants --------------------------------*/
const MOODS = 0
const LEVEL_ONE_SCORE = 30
const LEVEL_TWO_SCORE = 60
const MEMORIZE_TIME = 3000
/*---------------------------- Variables (state) ----------------------------*/

let rectangular = []
let board = []
let flippedCards = []
let scoreDisplay = 0
let liveDisplay = 0
let MOOD_BOARD = document.querySelector("#board")
let firstCard = null
let secondCard = null
let lockBoard = false
let matchedCards = []
let currentLevel = 1
let timerInterval
let timeLeft = 15
let gameStarted = false
let isMemorizing = false

/*------------------------ Cached Element References ------------------------*/
const cardEls = document.querySelectorAll(".rectangular")
const messageEl = document.querySelector("#message")
const scoreEl = document.querySelector("#scoreDisplay")
const livesEl = document.querySelector(".livesDisplay")
const timeEl = document.querySelector(".timeDisplay")
const startBtn = document.querySelector("#start")
const resetBtn = document.querySelector("#reset")
const musicBtn = document.querySelector("#music")
const levelEl = document.querySelector("#levelDisplay")
const leaderboardBtn = document.querySelector("#leaderboard")
const countdownOverlay = document.querySelector("#countdown-overlay")
const countdownNumber = document.querySelector("#countdown-number")
const countdownText = document.querySelector("#countdown-text")

const LEVEL_ONE_MOODS = [
  { image: "./assets/mood1.png", name: "mood1" },
  { image: "./assets/mood2.png", name: "mood2" },
  { image: "./assets/mood3.png", name: "mood3" },
  { image: "./assets/mood4.png", name: "mood4" },
  { image: "./assets/mood5.png", name: "mood5" },
  { image: "./assets/mood6.png", name: "mood6" },
  { image: "./assets/mood7.png", name: "mood7" },
  { image: "./assets/mood8.png", name: "mood8" },
]
let MOOD_DATA = [...LEVEL_ONE_MOODS]

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
  //reset game state
  scoreDisplay = 0
  liveDisplay = 3
  currentLevel = 1
  matchedCards = []
  lockBoard = true
  firstCard = null
  secondCard = null
  timeLeft = 15
  gameStarted = false
  //set level 1 moods
  MOOD_DATA = [...LEVEL_ONE_MOODS]
  //update the display//
  updateDisplays()
  messageEl.textContent = "Click START to begin!"
  // resret the cards//
  resetCards()

  //hide overlays for now //
  countdownOverlay.computedStyleMap.display = "none"
  document.getElementById("game-popup").style.display = "none"
  //hide the leaderboard button until they win we will update it//

  if (leaderboardBtn) leaderboardBtn.style.display = "none"

  // scoreEl.textContent = `Score: ${scoreDisplay}`
  // livesEl.textContent = `Lives: ${liveDisplay}`
  // timeEl.textContent = `Time: 15`
  // pairs and shuffle//

  function resetCards() {
    const moodPairs = [...MOOD_DATA, ...MOOD_DATA]
    board = moodPairs.sort(() => Math.random() - 0.5)
  }

  //reset all cards to show the pattern//
  cardEls.forEach((card, index) => {
    card.classList.remove("flipped")
    card.innerHTML = ""
    card.style.pointerEvents = "auto"
    // we will set data attributes//
    if (index < board.length) {
      card.dataset.name = board[index].name
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
  startMemorizationphase()
}
function startMemorizationphase() {
  isMemorizing = true
  messageEl.textContent = "Get ready to memorize!"
}

// to make it work //
// init()
// this will prevent us from clicking if the board is locked //
// showing all cards now//
cardEls.forEach((card, index) => {
  if (index < board.length) {
    card.classList.add("flipped")
    card.innerHTML = `<img src="${board[index].image}" alt="${board[index].name}">`
  }
  // card.addEventListener("click", flipCard)
})
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
  startTimer()
}

function startTimer() {
  clearInterval(timerInterval)
  timeLeft = 15
  updateDisplays()

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
}

function flipCard(event) {
  if (!gameStarted) {
    messageEl.textContent = " Click START button first!"
    return
  }
  if (lockBoard || isMemorizing) return
  const clickedCard = event.currentTarget
  if (clickedCard === firstCard || clickedCard.classList.contains("flipped"))
    return
}
// this thing won't allow the same matches to be clicked twice or the same card to be clicked twice//
// function flipCard(event) {
//   if (lockBoard) return
//   const clickedCard = event.currentTarget

const cardId = parseInt(clickedCard.id)
if (cardId >= board.length) return
clickedCard.classList.add("flipped")
clickedCard.innerHTML = `<img src="${board[cardId].image}" alt="${board[cardId].name}">`

if (!firstCard) {
  firstCard = clickedCard
  // firstCard.dataset.name = board[cardId].name
} else {
  secondCard = clickedCard
  // secondCard.dataset.name = board[cardId].name
  lockBoard = true
  checkForMatch()
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
  const isMatch = firstCard.dataset.name === secondCard.dataset.name
  // match found then we check if they won the game//
  if (isMatch) {
    scoreDisplay += 10
    matchedCards.push(firstCard, secondCard)
    // if (matchedCards.length === cardEls.length) {
      messageEl.textContent = "Matched +10 points"
      if (currentLevel === 1 && scoreDisplay >= LEVEL_ONE_SCORE) {
        setTimeout(levelUp, 500)
      }
      else if (matchedCards.length === (MOOD_DATA.length * 2)) {
        if (currentLevel === 1) {
          setTimeout(levelUp, 500)
        } else {
          clearInterval(timerInterval)
          setTimeout(() => endGame(true), 500)
        }
      }
      resetTurn(
      } else {
        messageEl.textContent ="No match try again"
      setTimeout(() => {
      firstCard.classList.remove("flipped")
      secondCard.classList.remove("flipped")
      }
      )
    // } else {
      // messageEl.textContent = "Matched!"
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

      resetTurn()
    }, 1000)

    // now we will make the live display deduct one life if not matched// also the thing we used is different than += or == now it's <= which means it's less than or equal zero = so to sum it up if your lives are 0 then display will pop a message saying no lives left // the thing after the livesDisplay mean -- to take the number and subtract 1//
    liveDisplay--
    if (liveDisplay <= 0) {
      messageEl.textContent = " No Lives Left "
      lockBoard = true
    }
  }

  render()
}

function resetTurn() {
  ;[firstCard, secondCard] = [null, null]
  lockBoard = false
}

// function handleMatch(event)

// function handleClick(event) {
//   if (lockBoard) return
//   const card = event.target
//   if (card === mood1) return
// }
// function handleClick(event) {}

/*----------------------------- Event Listeners -----------------------------*/
startBtn.addEventListener("click", init)
resetBtn.addEventListener("click", init)
