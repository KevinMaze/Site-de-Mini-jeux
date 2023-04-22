/* 
-> Générer combinaison secrète (4 couleurs) OK
-> Pouvoir proposer une combinaison
-> Gérer début et fin de partie
-> Ajouter d'autres éléments....
*/
import { Utils } from "../juste prix/lib/utils.js"


const colors = ["red", "blue", "yellow", "pink"]
let colorTabToFind = null
const nbColorToFind = 4
document.getElementById("start").addEventListener("click", () => {
  launchGame()
})



function launchGame(){
  setAleaColorTab()
  document.getElementById("allS")
  for (let index = 0; index < nbColorToFind; index++){
    generateSelect("allSelect")
  }
}

function generateSelect(idCible){
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
  document.getElementById(idCible).appendChild(mySelect)
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