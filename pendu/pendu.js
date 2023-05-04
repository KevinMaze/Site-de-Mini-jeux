// O Générer un mot aléa
// O Afficher les lettres masquées  _ _ _ _ _
// O Pouvoir proposer des lettres
// O Afficher les lettres trouvées
// O Gérer un nb d'erreur max
// O Gérer la victoire
// O Afficher des lettres visible (selon difficulté)
// 

const allWords = ['fleur', 'montagne', 'plastique', 'puéricultrice', 'congolexicomatisation', 'explosion', 'macaron', 'voiture', 'pissenlit', 'biroute']
const buttonPlay = document.getElementById("beginGame");
const worldToFindDiv = document.getElementById("worldToFindDiv");
const keyboardDiv = document.getElementById("keyboard");
let wordToFind ='';
let wordToFindArray;
let cptErreur = 0;

buttonPlay.addEventListener('click', function() {
  beginGame()
});

function beginGame(){
  // Générer un mot au hasard
  cptErreur = 0;
  worldToFindDiv.innerHTML = " "
  wordToFind = generateWord();
  wordToFindArray = Array.from(wordToFind);

  let table = document.createElement("table");
  let line = document.createElement("tr");
  line.id = "LineOfWord";
  wordToFindArray.forEach(letter => {
    // Créer un TD (case du tableau) par lettre
    let td = document.createElement("td");
    td.dataset.letter = letter;
    td.innerText = "_";
    line.appendChild(td);
  });
  table.appendChild(line);
  worldToFindDiv.appendChild(table);
  generateKeyboard();
}

function generateKeyboard(){
  keyboardDiv.innerHTML = '';
  let alphabet = generateAlphabet();
  alphabet.forEach(letter => {
    let lettreDiv = document.createElement("div");
    lettreDiv.innerHTML = letter;
    lettreDiv.classList.add("letterKeyboard");
    keyboardDiv.appendChild(lettreDiv);

    lettreDiv.addEventListener("click", () => {
      if(checkLetterInWord(letter)){
          //Afficher la lettre dans le mot masqué
          let lineWord = document.getElementById("LineOfWord");
          let allTdOfWord = lineWord.children;
          Array.from(allTdOfWord).forEach(td => {
              if(td.dataset.letter == letter){
                  td.innerHTML = letter;
              }
          });
      }
      else{
        // Incrémenter le compteur d'erreur
        cptErreur ++;
        document.getElementById("cptErreur").innerHTML = cptErreur;
        if(cptErreur >= 5){
          document.getElementById("cptErreur").innerHTML = "Perdu, vous avez fait plus de 5 erreurs";
          let lineWord = document.getElementById("LineOfWord");
          let allTdOfWord = lineWord.children;
          Array.from(allTdOfWord).forEach(td => {
            td.innerHTML = td.dataset.letter;
        });
        keyboardDiv.innerHTML = '';
        }
      }
      lettreDiv.style.visibility = "hidden"
    })
  });
}

function generateAlphabet(capital = false){
  // return [...Array(26)].map((_,i) => String.fromCharCode(i + (capital ? 65 : 97)));
  //                 |
  // code développé  V
  let tab = [];
  let i = 65;
  if(!capital){
    i += 32;
  }
  let finish = i+26;
  for (i; i<finish; i++) {
      tab.push(String.fromCharCode(i))
    }
  return tab;
}

function generateWord(){
  let indexWorld = getRandomInt(allWords.length);
  return allWords[indexWorld];
}

function getRandomInt(max){
  return Math.floor(Math.random() * max);
}

// Retourne true si la lettre est présente dans le mot
// Retourne false si absente
function checkLetterInWord(letter){
  let findLettre = false;
  wordToFindArray.forEach(letterOfWord => {
    if(letter == letterOfWord){
      findLettre = true;
    }
  });
  return findLettre;
}
