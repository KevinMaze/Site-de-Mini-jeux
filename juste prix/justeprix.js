// Générer un chiffre en aléatoire
// L'utilisateur fera des propositions
// Continuer tant qu'il n'a pas la bonne proposition
import { confetti } from "./lib/confetti.js"

let numberToFind = 0;
const resultDiv = document.getElementById("resultDiv");
const rebourDiv = document.getElementById("couldown");
const gamePropalDiv = document.getElementById("gamePropalDiv")
let timeRest = 0;
let countInterval = null;

// Lancer la partie
// Récupérer un chiffre aléatoire
document.getElementById("beginGame").addEventListener("click", () => {
  launchGame();
});

document.getElementById("checkPropalButton").addEventListener("click", () => {
  checkPropal();
});

document.getElementById("userPropalIntput").addEventListener("keyup", function (event){
  if (event.key == "Enter"){
    checkPropal();
  }
});

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
};

function checkPropal(){
  let numberPropal = document.getElementById("userPropalIntput").value;
  if (numberToFind > numberPropal){
    resultDiv.innerHTML = "C'est plus !"
    let audio = new Audio("audio/non.mp3");
    audio.play();
  }
  else if (numberToFind < numberPropal){
    resultDiv.innerHTML = "C'est moins !"
    let audio = new Audio("audio/non.mp3");
    audio.play();
  }
  else if (numberToFind == numberPropal){
    resultDiv.innerHTML = "YOU WIN !!!"
    endGame(true);
  }
}

function launchGame() {
  confetti.stopAnimationConfeti();
  numberToFind = getRandomInt(100);
  timeRest = 30;
  gamePropalDiv.style.display = "block";
  if(countInterval != null) {
    clearInterval(countInterval)
  }
  countInterval = setInterval(() => {
    rebourDiv.innerText = `Il reste ${timeRest} seconde(s)`;
    timeRest--;

    if(timeRest >= 20) {
      rebourDiv.classList.remove("danger")
      rebourDiv.classList.remove("warning")
      rebourDiv.classList.add("cool");
    }
    else if(timeRest > 10) {
      rebourDiv.classList.remove("cool")
      rebourDiv.classList.remove("danger")
      rebourDiv.classList.add("warning")
    }
    else if(timeRest >= 0) {
      rebourDiv.classList.remove("cool")
      rebourDiv.classList.remove("warning")
      rebourDiv.classList.add("danger")
    }
    else if(timeRest < 0) {
      clearInterval(countInterval);
      rebourDiv.innerText = "Time's Up !!"
      // Partie terminer
      endGame(false);
    }
  }, 1000);
}

function endGame(gagner) {
  if(gagner) {
    confetti.launchAnimationConfetti();
    let audio = new Audio("audio/oui.mp3");
    audio.play();
    setTimeout(() => {
      confetti.stopAnimationConfeti();
    }, 5000) 
  }
  else {
    alert("C'est la piquette Jack, tu sais pas jouer Jack, t'es mauvais...")
  }
  gamePropalDiv.style.display = "none"
  clearInterval(countInterval);
}