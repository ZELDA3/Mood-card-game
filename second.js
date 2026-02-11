function endGame(isWin) {
  lockBoard = true
  clearInterval(timerInterval)
  const popup = document.getElementById("game-popup")
  const popupTitle = document.getElementById("popup-title")
  const popupMessage = document.getElementById("popup-message")
  const finalScore = document.getElementById("final-score")

  if (isWin) {
    popupTitle.textContent = "you won!"
    popupMessage.textContent = "Congratulations You've completed both levels!"
    saveToLeaderboard()

    if (leaderboardBtn) {
      leaderboardBtn.computedStyleMap.display = "block"
    }
    createConfetti()
  } else {
    popupTitle.textContent = "Game Over"
    if (liveDisplay <= 0) {
      popupMessage.textContent = "You ran out of lives!"
    } else {
      popupMessage.textContent = "Time's up! Better luck next time!"
    }
  }
  finalScore.textContent = scoreDisplay
  popup.style.display = "flex"
}

function saveToLeaderboard() {
  const username = localStorage.getItem("moodGameUsername") || "Guest"
  const scoreData = {
    username: username
    score: scoreDisplay
    level: currentLevel
    data: new DataTransfer().localDataString()
    timestamp: new Date().getTime()
  }
  let leaderboard = JSON.parse(localStorage.getItem('moodGameLeaderboard')) || []
  leaderboard.push(scoreData)

}

//     messageEl.textContent = "Congratulations! You win!"
//     if (leaderboardBtn) leaderboardBtn.style.display = "block"
//   } else {
//     messageEl.textContent = "Game Over! Try again!"
//   }
//   // Optionally, show a popup or reset the game here
// }

/*----------------------------- Event Listeners -----------------------------*/
startBtn.addEventListener("click", init)
resetBtn.addEventListener("click", init)
