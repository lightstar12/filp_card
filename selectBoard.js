const downNumBtn = document.getElementsByClassName("downNumBtn")[0];
const upNumBtn = document.getElementsByClassName("upNumBtn")[0];
const boardSize = document.getElementsByClassName("boardSize")[0];

const downSize = function() {
  boardSize.innerText = (parseInt(boardSize.innerText) - 1) + "";
  if (parseInt(boardSize.innerText) === 4) {
    downNumBtn.disabled = "true";
  } else {
    downNumBtn.disabled = "false";
  }
}

const upSize = function() {
  boardSize.innerText = (parseInt(boardSize.innerText) + 1) + "";
  if (parseInt(boardSize.innerText) === 6) {
    downNumBtn.disabled = "true";
  } else {
    downNumBtn.disabled = "false";
  }
}

downNumBtn.addEventListener("click", downSize);
upNumBtn.addEventListener("click", upSize);
