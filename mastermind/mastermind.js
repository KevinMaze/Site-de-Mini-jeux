/* 
-> Générer combinaison secrète (4 couleurs) OK
-> Pouvoir proposer une combinaison
-> Gérer début et fin de partie
-> Ajouter d'autres éléments....
*/
import { Utils } from "../lib/utils.js"
import { Confetti } from "../lib/confetti/confetti.js"

const colors = ["red", "blue", "yellow", "pink"]
const allSelectDiv = document.getElementById("allSelect")
let colorTabToFind = null
const nbColorToFind = 4
document.getElementById("start").addEventListener("click", () => {
  launchGame()
})



function launchGame(){
  Confetti.stopAnimationConfeti()
  setAleaColorTab()
  console.log(colorTabToFind)
  allSelectDiv.innerHTML = ""
  generateLigneSelect()
}

function checkProposition(){
  let allSelect = allSelectDiv.querySelectorAll("select")
  let propal = Array.from(allSelect, select => select.value).slice(0-nbColorToFind)


  let cptGoodPlace = 0
  let cptBadPlace = 0
  let colorTabToFindCopy = [...colorTabToFind] // fait une copie du tableau
// parcours le tableau de proposition, pour véritier les propositions bien placés
  for (let i = 0; i < propal.length; i++) {
    // on compare les couleur
    if(propal[i] == colorTabToFindCopy[i]){
      // la proposition est bonne (bonne couleur au bon endroit)
      cptGoodPlace++
      colorTabToFindCopy[i] = "trouvé"
      propal[i] = "trouvéCotéPropal"
    }
  }

// parcours le tableau de proposition, pour vérifier les éléments de la bonne couleur mal placés
  for (let i = 0; i < propal.length; i++) {
    // on compare les couleur dans le tableau masqué, au même endroit
    if(propal[i] != "trouvéCotéPropal"){
      let finded = false
      for (let j = 0; j < colorTabToFindCopy.length; j++) {
        if(!finded){
          if(propal[i] == colorTabToFindCopy[j]){
            cptBadPlace ++
            propal[i] = "trouvéCotéPropal"
            colorTabToFindCopy[j] = "trouvé"
            finded = true
            }
          }
        }
      }
    }
    
  // ajout de la ligne de message de points
  let lineResponse = document.createElement("div")
  lineResponse.innerText = `Bien placé : ${cptGoodPlace} | Mal placé : ${cptBadPlace}` 
  allSelectDiv.appendChild(lineResponse)
  // on génère des nouveaux select
  generateLigneSelect()
    
  // si on a autant de bonne réponse que de case dans tableau = win
  if(cptGoodPlace == colorTabToFind.length){
    Confetti.launchAnimationConfetti();
    let audio = new Audio("../juste prix/audio/oui.mp3");
    audio.play();
    setTimeout(() => {
      Confetti.stopAnimationConfeti();
    }, 5000)
    allSelectDiv.innerHTML ='Vous avez gagné !'
  }
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
    // colorOption.innerHTML = color
    colorOption.value = color
    colorOption.style.backgroundColor = color
    mySelect.appendChild(colorOption)
  });
  mySelect.addEventListener("change", (e) => {
    e.target.style.backgroundColor = e.target.value
  })
  mySelect.style.backgroundColor = mySelect.value
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




// REFACTO AVEC UTILS CLASS