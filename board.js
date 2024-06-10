// 판의 크기를 가져올 세션
let myStorage = window.sessionStorage;
// 판 크기 페이지에서 가져온 판의 크기를 담을 변수
const boardSize = parseInt(myStorage.getItem("boardSize"));
// =============== 세션과 세션에서 가져온 변수
// 어떤 플레이어의 차례인지 저장한 함수(플레이어1을 시작으로 설정한 플레이어 수 만큼 늘어난 후 다시 1로 돌아감)
let userTurn = 1;
const maxUserTurn = 2;
// 플레이어가 카드를 고른 횟수
let playerSelectCount = 0;
// 선택한 카드의 인덱스를 담을 리스트
let selectCardIdxList = [];
// 게임 판에서 뒤집어진 카드의 개수
let flipedCardCount = 0;
let playerScoreList = [0];
// =============== 게임에서 필요한 변수
// 카드들을 놓을 판 Div
const $setCard = document.querySelector(".setCard");
// 게임판에 배치된 카드의 수
const cardCount = boardSize * boardSize;
// 카드에 Id 값에 넣을 인덱스들 ※필요한 만큼 잘라서 사용(4x4 : 1번째 줄만, 5x5 : 2번째 줄까지, 6x6 : 전부)
const totalCardIdIdxList = ["1", "1", "2", "2", "3", "3", "4", "4", "5", "5", "6", "6", "7", "7", "8", "8",
                 "9", "9", "10", "10", "11", "11", "12", "12",
                 "13", "13", "14", "14", "15", "15", "16", "16", "17", "17", "18", "18"];
                 // 카드의 Id값에 따라 부여할 색깔들을 담은 변수
const cardColorList = ["red", "purple", "green", "olive", "blue", "orange", "chartreuse", "crimson", "darkblue", "darkgoldenrod",
                     "darkseagreen", "darkslategray", "darkturquoise", "deeppink", "dimgray", "indigo"];

let cardIdIdxList = totalCardIdIdxList.slice(0, cardCount);
// =============== 카드 조작에 필요한 변수
// 카드를 뒤집는 함수
const cardEvent1 = function flipCard() {
  console.log(this.getAttribute("id"));
  const $cardList = document.querySelectorAll(`.cardDiv${boardSize}${boardSize}`);
  // 선택한 카드의 value 값이 "back"이라면
  if(this.getAttribute("value") === "back") {
    // 선택한 카드의 id값에 맞춰 색깔을 부여함
    this.style.backgroundColor = cardColorList[parseInt(this.getAttribute("id")) - 1];
    // 선택한 카드의 value값을 "front"로 변경하여 뒤집은 카드를 클릭해도 이벤트가 발생하지 않게 함
    this.setAttribute("value", "front");
    // 선택한 카드의 인덱스를 저장함
    for (let i = 0; i < $cardList.length; i++) {
      if (this === $cardList[i]) {
        selectCardIdxList.push(i);
      }
    }

    // 카드를 고른 횟수를 증가시킴
    playerSelectCount += 1;

    setTimeout(() => {
      if(playerSelectCount > 1) {
        cardEvent2($cardList, selectCardIdxList[0], selectCardIdxList[1]);
        playerSelectCount = 0;
        selectCardIdxList = [];
      }
    }, 100);
  }
}

// 선택한 카드들이 같은 색의 카드인지 확인하는 함수
const cardEvent2 = function checkSameCard(cardList, idx1, idx2) {
  if(cardList[idx1].getAttribute("id") === cardList[idx2].getAttribute("id")) {
    alert("맞았습니다.");
    // 플레이어의 카드 총 맞춘 횟수
    const $playerFlipedCardCount = document.querySelector(`.player${userTurn}FlipedCardCountTd`);
    // 카드 맞춘 횟수
    let collectCount = parseInt($playerFlipedCardCount.innerText);
    // 하나 올림
    collectCount += 1;
    // 다시 innerText 넣음
    $playerFlipedCardCount.innerText = collectCount + "";
    // 뒤집혀진 카드 수를 2장 늘림
    flipedCardCount += 2;
  } else {
    alert("틀렸습니다.");
    cardEvent3(cardList, idx1);
    cardEvent3(cardList, idx2);
  }

  setTimeout(() => {
    if(flipedCardCount === cardCount || (boardSize === 5 && flipedCardCount + 1 === cardCount)) {
      for (let i = 0; i < maxUserTurn; i++) {
        playerScoreList.push(parseInt(document.querySelector(`.player${i + 1}FlipedCardCountTd`).innerText));
      }
      for (let i = 0; i < playerScoreList.length; i++) {
        if (Math.max(...playerScoreList) === playerScoreList[i]) {
          if (playerScoreList[i] === cardCount / 4) {
            alert("무승부");
          } else {
            alert(`플레이어${i} 승리!`);
          }
          break;
        }        
      }
      // 새로고침하여 게임을 리셋함
      location.reload(true);
    }
    // 다음 차례로 넘김
    document.querySelector(`.player${userTurn}Div`).setAttribute("id", "none");
    userTurn += 1;
    if (userTurn > maxUserTurn) {
      userTurn = 1;
    }
    document.querySelector(`.player${userTurn}Div`).setAttribute("id", "turn");
  }, 100);
}

// 다시 카드를 뒤집는 함수
const cardEvent3 = function returnCard(cardList, idx) {
  cardList[idx].style.backgroundColor = "burlywood";
  cardList[idx].setAttribute("value", "back");
}
// =============== 카드에 부여할 이벤트

// 화면이 실행 될 때 판의 크기를 세션에서 불러오기
window.onload = function() {
  const title = document.querySelector("h1");
  title.innerText = `${boardSize} X ${boardSize} 카드 뒤집기 게임`;
  // 카드 무작위로 섞기
  for(let i = 0; i < 10; i++) {
    const rNum1 = Math.floor(Math.random() * cardIdIdxList.length);
    const rNum2 = Math.floor(Math.random() * cardIdIdxList.length);

    const nTmp = cardIdIdxList[rNum1];
    cardIdIdxList[rNum1] = cardIdIdxList[rNum2];
    cardIdIdxList[rNum2] = nTmp;
  }

  let cardIdIdxListCount = 0;

  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      // 카드를 한 장씩 생성하고 속성을 부여(class, value, id)
      const cardDiv = document.createElement("div");
      cardDiv.setAttribute("class", `cardDiv${boardSize}${boardSize}`);
      cardDiv.setAttribute("value", "back");
      cardDiv.setAttribute("id", `${cardIdIdxList[cardIdIdxListCount]}`);
      // 카드에 이벤트를 부여
      cardDiv.addEventListener("click", cardEvent1);
      // 지정해둔 판에 속성을 지정한 카드를 자식으로 생성
      $setCard.appendChild(cardDiv);
      
      cardIdIdxListCount += 1;
    }
  }
}