const VALUES = [
  { id: "scissors", value: "✌️" },
  { id: "rock", value: "✊" },
  { id: "paper", value: "🖐" },
];

const RESULT = {
  win: "Win!",
  lose: "Lose!",
  draw: "Draw!",
};

let i = 0;
const changeComputer = () => {
  const computer = document.querySelector(".computer-item");
  computer.textContent = VALUES[i].value;
  computer.dataset.id = VALUES[i].id;

  if (i === VALUES.length - 1) {
    i = 0;
  } else {
    i++;
  }
};

let interval = setInterval(changeComputer, 100);

const comper = (user, computer) => {
  const indexComputer = VALUES.findIndex((item) => item.id === computer);
  const indexUser = VALUES.findIndex((item) => item.id === user);

  const check = indexUser - indexComputer;

  if ([1, -2].includes(check)) {
    return 1;
  } else if ([-1, 2].includes(check)) {
    return -1;
  } else {
    return 0;
  }
};

const btnAgain = document.querySelector(".play-again");
const user = document.querySelectorAll(".user-item");
const resultMess = document.querySelector(".text-result span");

user.forEach((itemUser) => {
  itemUser.addEventListener("click", (event) => {
    clearInterval(interval);
    user.forEach((e) => {
      e.classList.remove("active");
      e.style.pointerEvents = "none";
    });
    btnAgain.style.display = "block";
    event.target.classList.add("active");

    const valueComputer = document.querySelector(".computer-item").dataset.id;
    const valueUser = event.target.id;
    const result = comper(valueUser, valueComputer);

    resultMess.parentElement.style.display = "block";

    if (result === 1) {
      resultMess.textContent = RESULT.win;
      resultMess.style.color = "#008000e3";
    } else if (result === -1) {
      resultMess.textContent = RESULT.lose;
      resultMess.style.color = "red";
    } else {
      resultMess.textContent = RESULT.draw;
      resultMess.style.color = "#825d50";
    }
  });
});

btnAgain.addEventListener("click", (e) => {
  interval = setInterval(changeComputer, 100);
  e.target.style.display = "none";
  resultMess.parentElement.style.display = "none";
  user.forEach((e) => {
    e.classList.remove("active");
    e.style.pointerEvents = "visible";
  });
});
