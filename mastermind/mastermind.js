/* 
-> Générer combinaison secrète (4 couleurs) OK
-> Pouvoir proposer une combinaison
-> Gérer début et fin de partie
-> Ajouter d'autres éléments....
*/
import { Utils } from "../juste prix/lib/utils.js"
import { confetti } from "../juste prix/lib/confetti.js"

const colors = ["red", "blue", "yellow", "pink"]
const allSelectDiv = document.getElementById("allSelect")
let colorTabToFind = null
const nbColorToFind = 4
document.getElementById("start").addEventListener("click", () => {
  launchGame()
})



function launchGame(){
  setAleaColorTab()
  allSelectDiv.innerHTML = ""
  generateLigneSelect()
  // console.log(colorTabToFind)
}

function checkProposition(){
  let allSelect = allSelectDiv.querySelectorAll("select")
  let propal = Array.from(allSelect, select => select.value).slice(-4)
  console.log(propal)

  let cptGoodPlace = 0
  let cptBadPlace = 0
// parcours le tableau de proposition
  for (let i = 0; i < propal.length; i++) {
    // on compare les couleur
    if(propal[i] == colorTabToFind[i]){
      // la proposition est bonne (bonne couleur au bon endroit)
      cptGoodPlace++
    }
    
  }

// ajout de la ligne de message de points
  let lineResponse = document.createElement("div")
  lineResponse.innerText = "Couleur(s) bien placées" + cptGoodPlace
  allSelectDiv.appendChild(lineResponse)

  // si on a autant de bonne réponse que de case dans tableau = win
  if(cptGoodPlace == colorTabToFind.length){
    confetti.launchAnimationConfetti();
    let audio = new Audio("../juste prix/audio/oui.mp3");
    audio.play();
    setTimeout(() => {
      confetti.stopAnimationConfeti();
    }, 5000)
  }

  // on génère des nouveaux select
  generateLigneSelect()
}

function generateLigneSelect(){
  let line = document.createElement("div")
  for (let index = 0; index < nbColorToFind; index++){
    generateSelect(line)
  }
  // Générer un btn ok pour validé
  let btn = document.createElement("button")
  btn.innerText = "OK"
  line.appendChild(btn)
  btn.addEventListener("click", () => {
    checkProposition()
  })
  allSelectDiv.appendChild(line)
}


function generateSelect(target){
  // création élément select
  let mySelect = document.createElement("select")
  colors.forEach(color => {
    // création élément option
    let colorOption = document.createElement("option")
    colorOption.innerHTML = color
    colorOption.value = color
    colorOption.style.backgroundColor = color
    mySelect.appendChild(colorOption)
  });
  target.appendChild(mySelect)
}

function setAleaColorTab(size = 4){
  colorTabToFind = []
  for (let index = 0; index < size; index ++)
    colorTabToFind.push(getAleaColors())
}

function getAleaColors(){
  let aleaIndex = Utils.getRandomInt(colors.length)
  let aleaColors = colors[aleaIndex]
  return aleaColors
}






// reste 34:41 min séance 8



// REFACTO AVEC UTILS CLASS