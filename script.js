let O = '16894.svg'
let X = '109602.svg'
let oWinner = 'O\'s CONQUERS THE X\s'
let xWinner = 'X\'s CONQUERS THE O\s'
let oTurn = true;
let hTurn = false;
let restart = true;
let botSelection = true;
let winnerDeclaration = true;
let easyMode = true;
let difficultMode = false;

const backBtn = document.querySelector('#back');
const mode = document.querySelector('.mode')
let cellBlocks = document.querySelectorAll('[data-XO');

let WINNINGCOMBINATIONS = 
[
   [0,1,2],
   [3,4,5],
   [6,7,8],
   [0,3,6],
   [1,4,7],
   [2,5,8],
   [0,4,8],
   [2,4,6]

];
function maintainDefault(){
  cellBlocks.forEach(cellBlock => {
    cellBlock.textContent = '';
    cellBlock.classList.add('tip')
   
        cellBlock.classList.remove('Ohoverless')
        cellBlock.classList.remove('Xhoverless')
   
  })
  gameBoard.classList.add('tictactoe-Visibility');
 resetBtn.classList.add('tictactoe-Visibility');
 document.querySelector('#restart').classList.add('tictactoe-Visibility');

  xSelection.classList.remove('tictactoe-Visibility');
  oSelection.classList.remove('tictactoe-Visibility');
  backBtn.classList.remove('tictactoe-Visibility');
  document.querySelector('.player').textContent = '';
  
  
  mode.style['opacity'] = '0.5';
  oTurn = true;
  hTurn = false;
  winnerDeclaration = true;
}
let resetBtn = document.querySelector('#reset');
let gameBoard = document.querySelector('.gameBoard')
resetBtn.addEventListener('click', () => {
  maintainDefault()
  
  cellBlocks.forEach(cellBlock => {
    
    cellBlock.addEventListener('click',handleClick,{once: true})
  })
})

function selectX(){
  xSelection.classList.add('tictactoe-Visibility');
  oSelection.classList.add('tictactoe-Visibility');
  displayPlayer('Player 1 is X', 'Player 2 is O')
  resetBtn.classList.remove('tictactoe-Visibility');
  gameBoard.classList.remove('tictactoe-Visibility');
  document.querySelector('#restart').classList.remove('tictactoe-Visibility');
  backBtn.classList.add('tictactoe-Visibility');
  mode.style['opacity'] = '0'
  for(let i = 0; i < cellBlocks.length; i++){
    cellBlocks[i].classList.add('Xhoverless') 
    cellBlocks[i].classList.remove('Ohoverless') 
}
  winnerDeclaration = true;
  restart = true;
  clip();
}

let xSelection = document.querySelector('#X')
xSelection.addEventListener('click', () => {
  selectX();
})

function selectO(){
  oSelection.classList.add('tictactoe-Visibility');
  xSelection.classList.add('tictactoe-Visibility');
  displayPlayer('Player 1 is O', 'Player 2 is X')
 
    resetBtn.classList.remove('tictactoe-Visibility');
    gameBoard.classList.remove('tictactoe-Visibility');
    document.querySelector('#restart').classList.remove('tictactoe-Visibility');
    backBtn.classList.add('tictactoe-Visibility');
    mode.style['opacity'] = '0'
  oTurn = false;
  hTurn = true;
  restart = false;
  winnerDeclaration = true;
  for(let i = 0; i < cellBlocks.length; i++){
    cellBlocks[i].classList.add('Ohoverless') 
    cellBlocks[i].classList.remove('Xhoverless') 
}
  clip();
}

let oSelection = document.querySelector('#O');
oSelection.addEventListener('click', () => {
  selectO();
})

function clip(){
cellBlocks.forEach(cellBlock => {
  cellBlock.addEventListener('click',handleClick,{once: true})
  cellBlock.classList.remove('tip');
})}

function displayModalWindow(winner){
let modalWindow = document.querySelector('.modalWindow')
document.querySelector('.winner').textContent = ` ${winner}`
let modalBg = document.querySelector('.modalBg')
modalWindow.classList.add('modalWindowVisible');
modalBg.classList.add('modalBgVisible');
}

document.querySelector('#newGame').addEventListener('click',() =>{
restartGame()
});
let currentState = [0,1,2,3,4,5,6,7,8];
const aiMark = 'O';
const humanMark = 'X'
let currentEmptyState;
console.log(currentState)
function handleClick(e){
  const cell = e.target;
  const currentClass = oTurn ? X : O;
  const winner = oTurn ? xWinner : oWinner;
  const XOdislay = oTurn ? 'X' : 'O';
  hoverless()
  placeMark(cell, currentClass);

  if(checkWin(currentClass)){
    
    if(winnerDeclaration  == true){
    displayModalWindow(winner)
  winnerDeclaration = false}
    
  }else{
    draw()
  }
  hTurn =!hTurn
removeHover()
swapTurns()

if(botSelection == true && difficultMode == true){
  for(let i = 0; i < cellBlocks.length; i++){
    if(cellBlocks[i].childElementCount > 0){
      if(!isNaN(currentState[i])){
    currentState[i] = XOdislay;}
    }
  }
  setTimeout(() => {
    if(currentClass == "109602.svg" && difficultMode == true){
   const bestPlayInfo = minimax(currentState,aiMark)
    let randomChoice = cellBlocks[bestPlayInfo.index]
    randomChoice.click()
  }},500)
  }

  if(botSelection == true && easyMode == true){
  setTimeout(() => {
    let availableBlocks = [];
    if(currentClass == "109602.svg" && easyMode == true){
    for(let i = 0; i < cellBlocks.length; i++){
       if(cellBlocks[i].childElementCount == 0){
         availableBlocks.push(cellBlocks[i])
       }
    }
    let randomSelection = Math.floor(Math.random() * (availableBlocks.length ));
    let randomChoice = '';
    randomChoice = availableBlocks[randomSelection];
    randomChoice.click()
  }},500)
  }
}

function hoverless(){
    for(let i = 0; i < cellBlocks.length; i++){
         if(hTurn == true && cellBlocks[i]){
          cellBlocks[i].classList.remove('Ohoverless')
         cellBlocks[i].classList.add('Xhoverless') }
         if(hTurn == false){
         cellBlocks[i].classList.add('Ohoverless') }
    }
}

function removeHover(){
  for(let i = 0; i < cellBlocks.length; i++){
    if(cellBlocks[i].childElementCount > 0){
      cellBlocks[i].classList.remove('Ohoverless')
      cellBlocks[i].classList.remove('Xhoverless')
    }
}
}

function draw(){
  let cellBlockchild = 0;
for(let i = 0; i < cellBlocks.length; i++){
  cellBlockchild += cellBlocks[i].childElementCount;
}
if(cellBlockchild == 9){
  displayModalWindow('It is a Draw'.toUpperCase())}
}

function placeMark(cell,currentClass){
  const newImage = document.createElement('img');
  newImage.setAttribute('src', currentClass);
  newImage.classList.add('newImage')
  cell.appendChild(newImage)
}
function swapTurns(){
  oTurn = !oTurn
}
function checkWin(currentClass){
  return WINNINGCOMBINATIONS.some(combination => {
    return  combination.every(index =>{
      if(cellBlocks[index].childElementCount > 0){
       return cellBlocks[index].firstElementChild.getAttribute('src') == currentClass;}
    })     
  })

}

function displayPlayer(player1,player2){
  const newDiv = document.querySelector('.player')
  const newDiv1 = document.createElement('div')
  const newDiv2 = document.createElement('div')
  newDiv1.classList.add('player1')
  newDiv2.classList.add('player2')
  newDiv.appendChild(newDiv1)
  newDiv.appendChild(newDiv2)
  newDiv1.textContent = player1;
  newDiv2.textContent  = player2;
}


document.querySelector('#twoPlayer').addEventListener('click', (e) => {
  botSelection = false;
  winnerDeclaration = true;
  document.querySelector('.users').classList.add('tictactoe-Visibility')
  xSelection.classList.remove('tictactoe-Visibility');
  oSelection.classList.remove('tictactoe-Visibility');
  document.querySelector('#newGame').classList.remove('tictactoe-Visibility');
  document.querySelector('#newGame2').classList.add('tictactoe-Visibility');
  document.querySelector('main').classList.remove('main1');
  backBtn.classList.remove('tictactoe-Visibility');
  document.querySelector('body').style['background'] = '#262121';
  document.querySelector('.gameName').textContent = '';
  mode.textContent = 'TWO PLAYER';
})

backBtn.addEventListener('click', e =>{
  document.querySelector('.users').classList.remove('tictactoe-Visibility')
  xSelection.classList.add('tictactoe-Visibility');
  oSelection.classList.add('tictactoe-Visibility');
  e.target.classList.add('tictactoe-Visibility');
  document.querySelector('#difficult').classList.add('tictactoe-Visibility');
  document.querySelector('#easy').classList.add('tictactoe-Visibility');
  document.querySelector('main').classList.add('main1');
  document.querySelector('.gameName').textContent = 'TIC TAC TOE';
  mode.textContent = '';
  document.querySelector('body').style['background'] = `linear-gradient(45deg, rgb(237, 235, 235) 30%, rgb(110, 102, 102) 50%)`;
})

function restartGame(){
  cellBlocks.forEach(cellBlock => {
    cellBlock.textContent = '';
    cellBlock.classList.remove('Ohoverless')
    cellBlock.classList.remove('Xhoverless')
  cellBlock.addEventListener('click',handleClick,{once: true})
  })

  let modalWindow = document.querySelector('.modalWindow')
  let modalBg = document.querySelector('.modalBg')
  modalWindow.classList.remove('modalWindowVisible');
  modalBg.classList.remove('modalBgVisible');
  currentState = [0,1,2,3,4,5,6,7,8];
  if(restart == true){
    for(let i = 0; i < cellBlocks.length; i++){
      cellBlocks[i].classList.add('Xhoverless') 
      cellBlocks[i].classList.remove('Ohoverless') 
  }
        oTurn = true;
        hTurn = false;
        winnerDeclaration = true;

  }else{
    for(let i = 0; i < cellBlocks.length; i++){
      cellBlocks[i].classList.add('Ohoverless') 
      cellBlocks[i].classList.remove('Xhoverless') 
  }
    oTurn = false;
    hTurn = true;
  }

} 

 document.querySelector('#restart').addEventListener('click', restartGame)

  document.querySelector('#bot').addEventListener('click', e => {
    botSelection = true;
    winnerDeclaration = true;
    easyMode = true;
    difficultMode = false;
    document.querySelector('.users').classList.add('tictactoe-Visibility')
    document.querySelector('#resetBotMode').classList.remove('tictactoe-Visibility');
    document.querySelector('#newGame').classList.add('tictactoe-Visibility');
    document.querySelector('#newGame2').classList.remove('tictactoe-Visibility');
    document.querySelector('#difficult').classList.remove('tictactoe-Visibility');
    document.querySelector('#easy').classList.remove('tictactoe-Visibility');
    document.querySelector('main').classList.remove('main1');
    document.querySelector('.gameName').textContent = ''
    document.querySelector('body').style['background'] = 'linear-gradient(90deg, rgb(49, 117, 128) 30%, rgb(23, 21, 21) 50%)';
    chooseX()
    })


  function chooseX(){
    xSelection.classList.add('tictactoe-Visibility');
    oSelection.classList.add('tictactoe-Visibility');
    resetBtn.classList.add('tictactoe-Visibility');
    displayPlayer('Player 1 is X', 'Bot is O');
    gameBoard.classList.remove('tictactoe-Visibility');
    document.querySelector('#restart').classList.remove('tictactoe-Visibility');
    for(let i = 0; i < cellBlocks.length; i++){
      cellBlocks[i].classList.add('Xhoverless') 
      cellBlocks[i].classList.remove('Ohoverless') 
  }
    restart = true;
    winnerDeclaration = true;
    clip();
  }

  document.querySelector('#resetBotMode').addEventListener('click', () => {
    cellBlocks.forEach(cellBlock => {
      cellBlock.textContent = '';
      cellBlock.classList.remove('Ohoverless')
      cellBlock.classList.remove('Xhoverless')
     
    })
  oTurn = true;
  hTurn = false;
  winnerDeclaration = true;
  easyMode = true;
  difficultMode = false;
  currentState = [0,1,2,3,4,5,6,7,8];
  document.querySelector('.winner').textContent = '';
  document.querySelector('.users').classList.remove('tictactoe-Visibility')
  gameBoard.classList.add('tictactoe-Visibility');
  document.querySelector('#resetBotMode').classList.add('tictactoe-Visibility');
  document.querySelector('main').classList.add('main1');
  document.querySelector('#restart').classList.add('tictactoe-Visibility');
  document.querySelector('#difficult').classList.add('tictactoe-Visibility');
  document.querySelector('#easy').classList.add('tictactoe-Visibility');
  document.querySelector('#difficult').style['background-color'] = 'black';
  document.querySelector('#easy').style['background-color'] = 'rgb(59, 110, 155)';
  document.querySelector('.gameName').textContent = 'TIC TAC TOE';
  document.querySelector('.player').textContent = '';
  document.querySelector('body').style['background'] = `linear-gradient(45deg, rgb(237, 235, 235) 30%, rgb(110, 102, 102) 50%)`;
  })

  document.querySelector('#newGame2').addEventListener('click', restartGame)

//minimax algorithm

function determineWinner(currentState,currentMark){
  return WINNINGCOMBINATIONS.some(combination => {
  
    return  combination.every(index =>{
      
       return currentState[index] == currentMark
    })     
  })

}
function getEmptyCell(currentState){
  return currentState.filter(item => !isNaN(item))
}

function minimax(currentState,currentMark){
 const availableCellsIndexes = getEmptyCell(currentState)

 if(determineWinner(currentState,humanMark)){
   return{score: -1}
 }else if(determineWinner(currentState,aiMark)){
   return{score:1}
 }else if(availableCellsIndexes.length == 0){
   return{score: 0}
 }

 const allTestPlayInfos = [];

 for(let i = 0; i < availableCellsIndexes.length; i++){
   const currentTestPlayInfor = {};

   currentTestPlayInfor.index = currentState[availableCellsIndexes[i]];
   currentState[availableCellsIndexes[i]] = currentMark;

   if(currentMark == aiMark){
     const result = minimax(currentState,humanMark);
     currentTestPlayInfor.score = result.score;
   }else{
    const result = minimax(currentState,aiMark);
    currentTestPlayInfor.score = result.score;
   }

   currentState[availableCellsIndexes[i]] = currentTestPlayInfor.index;
   allTestPlayInfos.push(currentTestPlayInfor);
 }

 let bestTestplay = null;

 if(currentMark == aiMark){
   let bestScore = -Infinity;

   for(let i = 0; i < allTestPlayInfos.length; i++){
     if(allTestPlayInfos[i].score > bestScore){
       bestScore = allTestPlayInfos[i].score;
       bestTestplay = i;
     }
   }
 }else{

  let bestScore = Infinity;
  for(let i = 0; i < allTestPlayInfos.length; i++){
    if(allTestPlayInfos[i].score < bestScore){
      bestScore = allTestPlayInfos[i].score;
      bestTestplay = i;
    }
  }
}
return allTestPlayInfos[bestTestplay]
}

document.querySelector('#easy').addEventListener('click', e =>{
 easyMode = true;
 difficultMode = false;
 restartGame();
 e.target.style['background-color'] = 'rgb(59, 110, 155)';
 document.querySelector('#difficult').style['background-color'] = 'black';
})

document.querySelector('#difficult').addEventListener('click', e =>{
 easyMode = false;
 difficultMode = true;
 restartGame();
 currentState = [0,1,2,3,4,5,6,7,8];
 e.target.style['background-color'] = 'rgb(59, 110, 155)';
 document.querySelector('#easy').style['background-color'] = 'black';
})