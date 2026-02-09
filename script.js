alert("welcome to the game enjoy! zelda38")

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
let firstCard = null
let secondCard = null
let lockBoard = false

/*------------------------ Cached Element References ------------------------*/
const cardEls = document.querySelectorAll(".rectangular")
const messageEl = document.querySelector("#message")
const scoreEl = document.querySelector("#scoreDisplay")
const livesEl = document.querySelector(".livesDisplay")
const timeEl = document.querySelector(".timeDisplay")
const startBtn = document.querySelector("#start")
const resetBtn = document.querySelector("#reset")


MOOD_DATA = [
  { image: "./assets/mood1.png", name: "mood1" },
  { image: "./assets/mood2.png", name: "mood2" },
  { image: "./assets/mood3.png", name: "mood3" },
  { image: "./assets/mood4.png", name: "mood4" },
  { image: "./assets/mood5.png", name: "mood5" },
  { image: "./assets/mood6.png", name: "mood6" },
  { image: "./assets/mood7.png", name: "mood7" },
  { image: "./assets/mood8.png", name: "mood8" },
]

/*-------------------------------- Functions
--------------------------------*/

function init() {
scoreDisplay = 0
liveDisplay = 3
matchedCards = []
lockBoard = false
firstCard = null
secondCard = null

  scoreEl.textContent = `Score: ${scoreDisplay}`
  livesEl.textContent = `Lives: ${liveDisplay}`
  timeEl.textContent = `Time: 15`
// pairs and shuffle//
  const moodPairs = [...MOOD_DATA, ...MOOD_DATA]
  board = moodPairs.sort(() => Math.random() - 0.5)

//reset all cards to show the pattern//
  cardEls.forEach((card) => {
    card.classList.remove("flipped")
    card.innerHTML = ""
  })
  messageEl.textContent ="Find the matches!" // to clear any images//
}
//render takes the code and turn it into something the user see it also update the data and keep things in sync //

function render() {
  scoreEl.textContent = `Score: ${scoreDisplay}`
  livesEl.textContent = `Lives: ${liveDisplay}`
  // cardEls.forEach((card, index) => {
  //   if (board[index])
  //     card.innerHTML = `<img src ="${board[index].image}" alt = "${board[index].name}">`
  // })
}
// to make it work //
init()
// thi sprevent us from clicking if the board is locked //
cardEls.forEach((card) => {
card.addEventListener("click", flipCard)
})
// this thing won't allow the same matches to be cliked twice or the same card to be clicked twice//
function flipCard(event) {
  if (lockBoard) return
  const clickedCard = event.currentTarget
  if (clickedCard === firstCard || clickedCard.classList.contains("flipped")) return
}
//the contain = checking if the html has this item inside another //

//get the card index (the parseint) it will litlry translate the string to a number
const cardId = parseInt(clickedCard.id)


//now we flip the card//
clickedCard.classList.add("flipped")
clickedCard.innerHTML = `<img src="${board[cardId].image}" alt="${board[cardId].name}">`
// we called the card by the image and name what we did last time was add index which it did not have //

// function showCard(event) {
//   if (event.target.id) {
//     console.log(event.target.id)
//     event.target.innerHTML = `<img src ="${board[0].image}" alt = "${board[0].name}">`
//   }
// }


//
if (!firstCard) {
firstCard = clickedCard
firstCard.dataset.name = board[cardId].name
} else {
  secondCard = clickedCard
  secondCard.dataset.name = board[cardId].name
  checkForMatch()
}

function checkForMatch (){

}
function handleMatch(event)

function handleClick(event) {
  if (lockBoard) return
  const card = event.target
  if (card === mood1) return
}
function handleClick(event) {}
/*----------------------------- Event Listeners -----------------------------*/
startBtn.addEventListener("click", init)
