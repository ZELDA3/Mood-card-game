/*-------------------------------- Constants --------------------------------*/
const MOODS =
  /*---------------------------- Variables (state) ----------------------------*/

let card = [];
let board = [];
let flippedCards = [];
let scoreDsiplay = ;
let liveDisplay = ;

/*------------------------ Cached Element References ------------------------*/
const rectangularEls = document.querySelectorAll(".rectangle")
console.log(rectangularEls)


const MOOD_DATA = [
  { image: "assets/mood1.png", name: "mood1" },
  { image: "assets/mood2.png", name: "mood2" },
  { image: "assets/mood3.png", name: "mood3" },
  { image: "assets/mood4.png", name: "mood4" },
  { image: "assets/mood5.png", name: "mood5" },
  { image: "assets/mood6.png", name: "mood6" },
  { image: "assets/mood7.png", name: "mood7" },
  { image: "assets/mood8.png", name: "mood8" }

  function init () {
    const moodPairs = [...MOOD_DATA, ...MOOD_DATA];
    board = moodPairs.sort(function() {
      return Math.random()
      console.log(board)
    }
  }

/*-------------------------------- Functions --------------------------------*/

/*----------------------------- Event Listeners -----------------------------*/
