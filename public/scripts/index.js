//Deck

let deck = [
  {
    id: 1,
    name: "Frog",
    color: "#84CFFA",
    image: "src/frog.png",
    description: ["description 1", "description 2", "description 3"],
    flipped: true,
  },
  {
    id: 2,
    name: "Cow",
    color: "#FA8484",
    image: "src/cow.png",
    description: ["description 1", "description 2", "description 3"],
    flipped: true,
  },
  {
    id: 3,
    name: "Kangaroo",
    color: "#E984FA",
    image: "src/kangaroo.png",
    description: ["description 1", "description 2", "description 3"],
    flipped: true,
  },
  {
    id: 4,
    name: "Lion",
    color: "#84FAAC",
    image: "src/lion.png",
    description: ["description 1", "description 2", "description 3"],
    flipped: true,
  },
  {
    id: 5,
    name: "Bird",
    color: "#8684FA",
    image: "src/bird.png",
    description: ["description 1", "description 2", "description 3"],
    flipped: true,
  },
  {
    id: 6,
    name: "Elephant",
    color: "#F7FA84",
    image: "src/elephant.png",
    description: ["description 1", "description 2", "description 3"],
    flipped: true,
  },
];

const cards = document.querySelectorAll('.card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let moves = 0;
let winCount = 0;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

   if (!hasFlippedCard) {
     hasFlippedCard = true;
     firstCard = this;
     return;
    }

    console.log(winCount)
     
    secondCard = this;
 
    checkForMatch();
}
 
  // Checking if cards match

  function checkForMatch() {
    if(firstCard.dataset.name !== secondCard.dataset.name) {
      moves++;
    }
    document.getElementById("movesCount").innerHTML = `${moves}`;
    document.getElementById("movesCount2").innerHTML = `${moves}`;
      
    if (firstCard.dataset.name === secondCard.dataset.name) {
      winCount++;
      disableCards();
      // ПРОВЕРКА УСЛОВИЙ ПОБЕДЫ: Проверяем, равно ли "winCount" "6", что соответствует максимальному числу пар.
      if(winCount == 6) {
        setTimeout(() => {
          document.querySelector('#victory').style.display = 'block'
          document.querySelector('#movesVictory').innerHTML = moves
        }, 1000);
      }
      
      return;
    }

 
    unflipCards();

    console.log(moves);

  }
 
  // Отключение клика по совпавшим картам

  function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
  }
 
  // Переворот несоответствующих карт обратно

  function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');

      resetBoard();

    }, 1500);
  }

  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }

  // Перемешивание карт (IIFE) Непосредственно вызываемое выражение функции

  (function shuffle() {
    cards.forEach(card => {
      let ramdomPos = Math.floor(Math.random() * 12);
      card.style.order = ramdomPos;
    });
  })();

cards.forEach(card => card.addEventListener('click', flipCard));


