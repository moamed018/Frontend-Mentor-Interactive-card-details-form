let name = document.getElementById("name");
let nameCard = document.getElementById("name-card");
let warnName = document.getElementById("warn-name");

let num = document.getElementById("num");
let numberCard = document.getElementById("number-card");
let warnNum = document.getElementById("warn-num");

let dateMM = document.getElementById("date-mm");
let dateYY = document.getElementById("date-yy");
let dateMmCard = document.getElementById("mm-card");
let dateYyCard = document.getElementById("yy-card");
let warnDate = document.getElementById("warn-date");

let cvc = document.getElementById("cvc");
let cvcCard = document.getElementById("cvc-card");
let warnCvc = document.getElementById("warn-cvc");

let submitBtn = document.getElementById("sub");
let continueBtn = document.getElementById("continue");

let form = document.querySelector("form");
let progr = document.querySelector(".progr");
let done = document.querySelector(".done");

let cardsList = [];
let listBtn = document.querySelector("#list-btn");
let listCard = document.querySelector(".list");
let overlay = document.querySelector(".overlay");
let closeBtn = document.querySelector(".btn-close");
let listItems = document.querySelector(".list-items");
let clearBtn = document.querySelector(".clear");

// ! Reg
const regName = /[a-zA-Z]{3,}\s[a-zA-Z]{3,}/;
const regNum = /\d{4}\s\d{4}\s\d{4}\s\d{4}/;
const regDate = /\d{2}/;
const regCvc = /\d{3}/;

function defulit() {
  let arrInputs = [name, num, dateMM, dateYY, cvc];
  for (let i = 0; i < arrInputs.length; i++) {
    arrInputs[i].value = "";
  }
  numberCard.textContent = "0000 0000 0000 0000";
  nameCard.textContent = "Jane Appleseed";
  dateMmCard.textContent = "00";
  dateYyCard.textContent = "00";
  cvcCard.textContent = "000";
}

window.onload = () => {
  defulit();
  const storage = JSON.parse(localStorage.getItem("storage"));
  cardsList.push(...storage);
  // console.log(storage);
};

function addSpace() {
  if (
    num.value.length === 4 ||
    num.value.length === 9 ||
    num.value.length === 14
  ) {
    num.value += " ";
  }
}

function addToCard(lengt, targ, val, war, reg) {
  val.addEventListener("blur", () => {
    if (val.value.length === lengt && reg.test(val.value)) {
      targ.textContent = val.value;
      war.style.visibility = "hidden";
      val.style.borderColor = "hsl(270, 3%, 87%)";
    } else if (lengt === "" && val.value.length >= 1 && reg.test(val.value)) {
      targ.textContent = val.value;
      war.style.visibility = "hidden";
      val.style.borderColor = "hsl(270, 3%, 87%)";
    } else {
      war.style.visibility = "visible";
      val.style.borderColor = "hsl(0, 100%, 66%)";
    }
  });
}

num.oninput = () => {
  window.onkeydown = (eve) => {
    if (eve.code !== "Backspace") {
      addSpace();
    }
  };
  if (num.value.length >= 19) {
    num.value = num.value.slice(0, 19);
  }
};

function formatingDate() {
  dateMM.addEventListener("blur", () => {
    if (
      dateMM.value < 10 &&
      !dateMM.value.startsWith("0") &&
      dateMM.value != 0
    ) {
      dateMM.value = `0${dateMM.value}`;
    } else if (dateMM.value > 12) {
      dateMM.value = "12";
    }
  });
  dateYY.addEventListener("blur", () => {
    if (dateYY.value > 22) {
      dateYY.value;
    } else if (dateYY.value < 22 && dateYY.value != 0) {
      dateYY.value = "0";
    }
  });
}

formatingDate();

addToCard("", nameCard, name, warnName, regName);
addToCard(19, numberCard, num, warnNum, regNum);
addToCard(2, dateMmCard, dateMM, warnDate, regDate);
addToCard(2, dateYyCard, dateYY, warnDate, regDate);
addToCard(3, cvcCard, cvc, warnCvc, regCvc);

form.addEventListener("submit", function (event) {
  event.preventDefault();
});

submitBtn.addEventListener("click", () => {
  if (
    regName.test(name.value) &&
    regNum.test(num.value) &&
    regDate.test(dateMM.value) &&
    regDate.test(dateYY.value) &&
    regCvc.test(cvc.value) &&
    cvc.value.length === 3 &&
    dateMM.value.length === 2 &&
    dateYY.value.length === 2
  ) {
    form.style.display = "none";
    setTimeout(() => {
      progr.style.display = "block";
    }, 0);
    setTimeout(() => {
      progr.style.display = "none";
      done.style.display = "block";
    }, 700);

    cardsList.push({
      name: name.value,
      num: num.value,
      dateMM: dateMM.value,
      dateYY: dateYY.value,
      cvc: cvc.value,
      createdDate: new Date(),
      id: Math.floor(Math.random() * 1000000),
    });

    localStorage.setItem("storage", JSON.stringify(cardsList));
  }
});

continueBtn.addEventListener("click", () => {
  done.style.display = "none";
  setTimeout(() => {
    progr.style.display = "block";
  }, 0);
  setTimeout(() => {
    progr.style.display = "none";
    form.style.display = "grid";
    defulit();
  }, 500);
});

function renderList() {
  if (cardsList.length === 0) {
    listItems.innerHTML = "";
    listItems.insertAdjacentHTML(
      "afterbegin",
      `<p class="no-item">No Items For Now!</p>`
    );
  } else {
    listItems.innerHTML = "";

    cardsList.map((card) => {
      const date = new Date(card.createdDate);
      const month =
        date.getMonth() + 1 < 10
          ? `0${date.getMonth() + 1}`
          : date.getMonth() + 1;

      const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();

      const hour =
        date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();

      const minutes =
        date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

      const html = `
    <div class="list-item id-${card.id}">
      <p class="number-list">🔢 ${card.num}</p>
      <p class="name-list">👨 ${card.name}</p>
      <div class="list-info">
        <span class="date-list">📅 ${card.dateMM} / ${card.dateYY}</span>
        <span class="cvc-list">💳 ${card.cvc}</span>
      </div>
      <button class="del-btn">Delete</button>
      <p class="add-date">Add: ${date.getFullYear()}/${month}/${day} on ${hour}:${minutes}</p>
    </div>
    `;

      listItems.insertAdjacentHTML("afterbegin", html);
    });
  }
}

listBtn.addEventListener("click", function () {
  renderList();

  listCard.classList.remove("hidden");
});

const closeList = function () {
  listCard.classList.add("hidden");
};

overlay.addEventListener("click", closeList);
closeBtn.addEventListener("click", closeList);

listItems.addEventListener("click", function (event) {
  const target = event.target;
  if (target.classList.contains("del-btn")) {
    const id = +target.closest(".list-item").classList[1].slice(3);
    const index = cardsList.indexOf(cardsList.find((f) => f.id === id));
    cardsList.splice(index, 1);
    renderList();
    localStorage.setItem("storage", JSON.stringify(cardsList));
  }
});

clearBtn.addEventListener("click", function () {
  if (cardsList.length === 0) return;
  
  cardsList = []
  renderList()
  localStorage.setItem("storage", JSON.stringify(cardsList));
});

////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////

// ! Old Code

// let delBtns;

// const deleteCard = function (e) {
//   const id = +e.target.closest(".list-item").classList[1].slice(3);
//   const index = cardsList.indexOf(cardsList.find((f) => f.id === id));
//   cardsList.splice(index, 1);
//   renderList();
// };

// console.log(num.value)

// const hleper = function (func) {
//   const date = new Date(card.createdDate);
//   date.func() < 10 ? `0${date.func()}` : date.func();
// };

// delBtns = document.querySelectorAll(".del-btn");
// [...delBtns].map((del) => {
//   del.addEventListener("click", function (e) {
//     const id = +e.target.closest(".list-item").classList[1].slice(3);
//     const index = cardsList.indexOf(cardsList.find((f) => f.id === id));
//     cardsList.splice(index, 1);
//     renderList();
//   });
// });
// console.log(document.querySelectorAll(".del-btn"));

// [...document.querySelectorAll(".del-btn")].map((e) => {
//   console.log(e);
//   e.addEventListener("click", deleteCard);
// });

// document.querySelectorAll(".del-btn").addEventListener("click", deleteCard);

// console.log(cardsList);
// console.log('Hyyyyy 🎉🎉🎉')

// num.addEventListener('blur', () => {
//   numberCard.textContent = num.value;
//   console.log(num.value)
// })
// num.addEventListener('blur', addToCard(numberCard, num))

/*
      // } else if (val.value.length < lengt) {
        //   newNum = (val.value + '0'.repeat(lengt - val.value.length));
    //   targ.textContent = `${newNum.slice(0, 5).trim()} ${newNum.slice(5, 9).trim()} ${newNum.slice(9, 13).trim()} ${newNum.slice(13, 17).trim()}`
    //   // if (newNum[4] == 0) {
    //   //   newNum[4].replace(" ")
    //   // }
    //   // if (newNum[9] == 0) {
    //   //   newNum.replace(newNum[9], " ")
    //   // }
    //   // if (newNum[14] == 0) {
    //   //   newNum[14].replace(" ")
    //   // }
    //   // targ.textContent = newNum
*/

// console.log(num.value.length)

// if (val.value.length === lengt) {
// targ.textContent = val.value;
// console.log(val.value)
// }
