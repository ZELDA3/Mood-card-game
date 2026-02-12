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

function init() {
  score = 0
  matchedCards = []
  lockBoard = true
  firstCard = null
  secondCard = null
  gameStarted = false
  isMemorizing = false

  updateScore()
  messageEl.textContent = "Click START to begin!"

  const moodPairs = [...MOOD_DATA, ...MOOD_DATA]
  board = moodPairs.sort(() => Math.random() - 0.5)

  cardEls.forEach((card, index) => {
    card.classList.remove("flipped")
    card.innerHTML = ""
    card.style.pointerEvents = "auto"

    if (index < board.length) {
      card.dataset.name = board[index].name
    }
  })

  if (countdownOverlay) countdownOverlay.style.display = "none"
}

function updateScore() {
  scoreEl.textContent = `Score: ${score}`
}

function startGame() {
  if (gameStarted) return

  gameStarted = true
  lockBoard = true
  isMemorizing = true

  messageEl.textContent = "Memorize the cards!"

  cardEls.forEach((card, index) => {
    if (index < board.length) {
      card.classList.add("flipped")
      card.innerHTML = `<img src="${board[index].image}" alt="${board[index].name}">`
    }
  })

  countdownOverlay.style.display = "flex"
  countdownText.textContent = "Memorize the cards"

  let count = 3
  countdownNumber.textContent = count

  const countInterval = setInterval(() => {
    count--
    countdownNumber.textContent = count

    if (count === 0) {
      clearInterval(countInterval)
      endMemorization()
    }
  }, 1000)
}

function endMemorization() {
  isMemorizing = false
  countdownOverlay.style.display = "none"

  cardEls.forEach((card) => {
    card.classList.remove("flipped")
    card.innerHTML = ""
  })

  messageEl.textContent = "Find the matches!"
  lockBoard = false
}

function flipCard(event) {
  if (!gameStarted) {
    messageEl.textContent = "Click START first!"
    return
  }

  if (lockBoard || isMemorizing) return

  const clickedCard = event.currentTarget

  if (clickedCard === firstCard || clickedCard.classList.contains("flipped")) {
    return
  }

  const cardId = parseInt(clickedCard.id)
  if (cardId >= board.length) return

  clickedCard.classList.add("flipped")
  clickedCard.innerHTML = `<img src="${board[cardId].image}" alt="${board[cardId].name}">`

  if (firstCard === null) {
    firstCard = clickedCard
  } else {
    secondCard = clickedCard
    lockBoard = true
    checkForMatch()
  }
}

function checkForMatch() {
  const isMatch = firstCard.dataset.name === secondCard.dataset.name

  if (isMatch) {
    score += 10
    matchedCards.push(firstCard, secondCard)

    messageEl.textContent = "MATCHED! +10 points"
    updateScore()

    if (matchedCards.length === board.length) {
      messageEl.textContent = " YOU WON! "
      endGame(true)
    }

    setTimeout(() => {
      resetTurn()
    }, 500)
  } else {
    messageEl.textContent = "No match, try again"

    setTimeout(() => {
      firstCard.classList.remove("flipped")
      secondCard.classList.remove("flipped")
      firstCard.innerHTML = ""
      secondCard.innerHTML = ""
      resetTurn()
    }, 1000)
  }
}

function resetTurn() {
  firstCard = null
  secondCard = null
  lockBoard = false
}

function endGame(win) {
  lockBoard = true

  if (win) {
    const popup = document.getElementById("game-popup")
    const popupTitle = document.getElementById("popup-title")
    const popupMessage = document.getElementById("popup-message")
    const finalScore = document.getElementById("final-score")

    popupTitle.textContent = " YOU WON! "
    popupMessage.textContent = "Congratulations! You matched all cards!"
    finalScore.textContent = score
    popup.style.display = "flex"
  }
}

function resetGame() {
  init()
}

/*----------------------------- Event Listeners -----------------------------*/
startBtn.addEventListener("click", startGame)
resetBtn.addEventListener("click", resetGame)

cardEls.forEach((card) => {
  card.addEventListener("click", flipCard)
})

init()
