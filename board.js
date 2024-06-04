const $cardList = document.getElementsByClassName("card44Div");
var count = 0;
var cardIdx = [];
var userturn = 1;
var flipCardCount = 0;
let cardIdIdx = ["1", "1", "2", "2", "3", "3", "4", "4", "5", "5", "6", "6", "7", "7", "8", "8"];
let cardColorList = ["red", "purple", "green", "olive", "blue", "orange", "chartreuse", "crimson"];

for(let i = 0; i < 10; i++) {
  const rNum1 = Math.floor(Math.random() * cardIdIdx.length);
  const rNum2 = Math.floor(Math.random() * cardIdIdx.length);

  const nTmp = cardIdIdx[rNum1];
  cardIdIdx[rNum1] = cardIdIdx[rNum2];
  cardIdIdx[rNum2] = nTmp;
}

for (let i = 0; i < cardIdIdx.length; i++) {
  document.getElementsByClassName("card44Div")[i].setAttribute("id", cardIdIdx[i]);
}

// 카드를 뒤집는 함수
const cardEvent1 = function flipCard() {
  if(this.getAttribute("value") === "back") {
    this.style.backgroundColor = cardColorList[parseInt(this.getAttribute("id")) - 1];
    this.setAttribute("value", "front");
    for (let i = 0; i < $cardList.length; i++) {
      if (this === $cardList[i]) {
        cardIdx.push(i);
      }
    }
    count += 1;

    setTimeout(() => {
      if (count > 1) {
        cardEvent2(cardIdx[0],cardIdx[1]);
        count = 0;
        cardIdx = [];
      }
    }, 100);
  }
}

// 뒤집은 두 카드가 같은 색의 카드인 지 확인 하는 함수
const cardEvent2 = function checkSameCard(index1, index2) {
  if($cardList[index1].style.backgroundColor === $cardList[index2].style.backgroundColor) {
    alert("맞았습니다.");
    const playerFilpcardCount = document.getElementsByClassName(`player${userturn}FlipcardCountTd`);
    let collectCount = parseInt(playerFilpcardCount[0].innerText);
    collectCount += 1;
    playerFilpcardCount[0].innerText = collectCount + '';
    flipCardCount += 2;
  } else {
    alert("틀렸습니다.");
    cardEvent3(cardIdx[0]);
    cardEvent3(cardIdx[1]);
  }
  setTimeout(() => {
    if (flipCardCount === 4 * 4) {
      alert("게임이 끝났습니다.")
    }
    document.getElementsByClassName(`player${userturn}Div`)[0].setAttribute("id", "none");
    userturn += 1;
    if (userturn > 2) {
      userturn = 1;
    }
    document.getElementsByClassName(`player${userturn}Div`)[0].setAttribute("id", "turn");
  }, 100);
}

// 다른 색의 카드일 때 다시 카드를 뒤집는 함수
const cardEvent3 = function returnCard(index) {
  $cardList[index].style.backgroundColor = "burlywood";
  $cardList[index].setAttribute("value", "back");
}

// 카드에 이벤트 리스너 부여
for(let i = 0; i < $cardList.length; i++) {
  const card = $cardList[i];
  card.addEventListener("click", cardEvent1);
}

window.onload = function() {
  selectCardWidth = window.sessionStorage;
  
}