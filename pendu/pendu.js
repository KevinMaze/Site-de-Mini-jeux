// O Générer un mot aléa
// O Afficher les lettres masquées  _ _ _ _ _
// - Pouvoir proposer des lettres
// - Afficher les lettres trouvées
// - Gérer un nb d'erreur max
// - Afficher des lettres visible

const allWords = ['Fleur', 'Montagne', 'Plastique', 'Puéricultrice', 'Congolexicomatisation', 'Explosion', 'Macaron', 'Voiture', 'Pissenlit', 'Biroute']
const buttonPlay = document.getElementById("beginGame");
const worldToFindDiv = document.getElementById("worldToFindDiv");
const keyboardDiv = document.getElementById("keyboard");

buttonPlay.addEventListener('click', function() {
  beginGame()
});

function beginGame(){
  // Générer un mot au hasard
  worldToFindDiv.innerHTML = " "
  let wordToFind = generateWord();
  // worldToFindDiv.innerHTML = wordToFind;
  let wordToFindArray = Array.from(wordToFind);

  let table = document.createElement("table");
  let line = document.createElement("tr");
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
