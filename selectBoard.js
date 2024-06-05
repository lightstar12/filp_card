const downNumBtn = document.getElementsByClassName("downSizeBtn")[0];
const upNumBtn = document.getElementsByClassName("upSizeBtn")[0];
const boardSize = document.getElementsByClassName("boardSize")[0];
const selectSizeBtn = document.getElementsByClassName("selectSizeBtn")[0];
let myStorage = window.sessionStorage;

const downSize = function() {
  boardSize.innerText = (parseInt(boardSize.innerText) - 1) + "";

  if (boardSize.innerText === "4") {
    downNumBtn.disabled = true;
  } else {
    upNumBtn.disabled = false;
  }
}

const upSize = function() {
  boardSize.innerText = (parseInt(boardSize.innerText) + 1) + "";

  if (boardSize.innerText === "6") {
    upNumBtn.disabled = true;
  } else {
    downNumBtn.disabled = false;
  }
}

const selectSize = function() {
  myStorage.setItem("boardSize", boardSize.innerText);
}

downNumBtn.addEventListener("click", downSize);
upNumBtn.addEventListener("click", upSize);
selectSizeBtn.addEventListener("click", selectSize);