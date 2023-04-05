// Générer un chiffre en aléatoire
// L'utilisateur fera des propositions
// Continuer tant qu'il n'a pas la bonne proposition

let numberToFind = 0;
const resultDiv = document.getElementById("resultDiv");

document.getElementById("beginGame").addEventListener("click", () => {
  // Lancer la partie
  // Récupérer un chiffre aléatoire
  numberToFind = getRandomInt(1000);
  alert(numberToFind)
});


document.getElementById("checkPropalButton").addEventListener("click", () => {
  checkPropal();
});

// document.getElementById("userPropalInput").addEventListener("keyup", function(event){
//   if (event.key == "Enter"){
//     checkPropal();
//   }
// });

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
    let audio = new Audio("audio/oui.mp3");
    audio.play();
  }
}