alert: "welcome to the game enjoy! @zelda38"

/*-------------------------------- Constants --------------------------------*/
const MOODS = 0
/*---------------------------- Variables (state) ----------------------------*/

let rectangular = []
let board = []
let flippedCards = []
let scoreDisplay = 0
let liveDisplay = 0
let MOOD_BOARD = document.querySelector("#board")
let MOOD_DATA

/*------------------------ Cached Element References ------------------------*/
const cardEls = document.querySelectorAll(".rectangular")
const messageEl = document.querySelector("#message")
const scoreEl = document.querySelector("#scoreDisplay")
const livesEl = document.querySelector(".livesDisplay")
const timeEl = document.querySelector(".timeDisplay")
const startBtn = document.querySelector("#start")
const resetBtn = document.querySelector("#reset")

console.log(cardEls)
console.log(messageEl)
console.log(scoreEl)
console.log(livesEl)
console.log(timeEl)

MOOD_DATA = [
  { image: "../Mood-card-game/assets/mood1.png", name: "mood1" },
  { image: "../Mood-card-game/assets/mood2.png", name: "mood2" },
  { image: "../Mood-card-game/assets/mood3.png", name: "mood3" },
  { image: "../Mood-card-game/assets/mood4.png", name: "mood4" },
  { image: "../Mood-card-game/assets/mood5.png", name: "mood5" },
  { image: "../Mood-card-game/assets/mood6.png", name: "mood6" },
  { image: "../Mood-card-game/assets/mood7.png", name: "mood7" },
  { image: "../Mood-card-game/assets/mood8.png", name: "mood8" },
]

/*-------------------------------- Functions
--------------------------------*/

function init() {
  scoreDisplay = 0
  liveDisplay = 3
  flippedCards = []
  const moodPairs = [...MOOD_DATA, ...MOOD_DATA]
  board = moodPairs.sort(() => Math.random() - 0.5)
  cardEls.forEach((card) => {
    card.classList.add("flipped")
  })
  render()
}

function render() {
  cardEls.forEach((card, index) => {
    if (board[index])
      card.innerHTML = `<img src ="${board[index].image}" alt = "${board[index].name}">`
  })
}
console.log(render)
init()

function handleClick(event) {
  if (event.target.id === board) return
}
/*----------------------------- Event Listeners -----------------------------*/
startBtn.addEventListener("click", init)
