const themeBtn = document.querySelector(".theme-btn-container");
const themeIndicatorElements = document.querySelectorAll(".selection");
const displayPlace = document.querySelector(".calc-container--result span");
// theme related elements
const themeBtnDiv = document.querySelector(".theme-btn");
const mainContainer = document.querySelector(".container");
const headerContainer = document.querySelector(".calc-container--header");
const display = document.querySelector(".calc-container--result");
const keypad = document.querySelector(".calc-container--body");
const keys = document.querySelectorAll(".key");
const delKey = document.querySelector(".key--del");
const resetKey = document.querySelector(".key--reset");
const calc = document.querySelector(".key--calculate");

const elements_to_apply_theme = [
  mainContainer,
  headerContainer,
  display,
  keypad,
  keys,
  delKey,
  resetKey,
  calc,
  themeBtnDiv,
];

function changeTheme() {
  const removeTheme = function (element) {
    element.classList.remove("theme-1");
    element.classList.remove("theme-2");
    element.classList.remove("theme-3");
  };

  const currentTheme = themeBtn.dataset.theme;
  let class_to_add = "";

  themeIndicatorElements.forEach(removeTheme);

  if (currentTheme === "1") {
    themeBtn.dataset.theme = "2";
    class_to_add = "theme-2";
    themeIndicatorElements[1].classList.add("theme-2");
  } else if (currentTheme === "2") {
    themeBtn.dataset.theme = "3";
    class_to_add = "theme-3";
    themeIndicatorElements[2].classList.add("theme-3");
    themeIndicatorElements[2].style.backgroundColor = "hsl(176, 100%, 44%)";
  } else if (currentTheme === "3") {
    themeBtn.dataset.theme = "1";
    class_to_add = "theme-1";
    themeIndicatorElements[0].classList.add("theme-1");
  }

  elements_to_apply_theme.forEach((element) => {
    if (NodeList.prototype.isPrototypeOf(element)) {
      element.forEach((subelement) => {
        removeTheme(subelement);
        subelement.classList.add(class_to_add);
      });
    } else {
      removeTheme(element);
      console.log(element);
      element.classList.add(class_to_add);
    }
  });

  console.log(elements_to_apply_theme);
}

themeBtn.addEventListener("click", changeTheme);

let data = "";
function updateDisplay(e) {
  let key = e.target;
  let value = key.dataset.value;

  if (data == "0") {
    data = "";
  }

  if (value === "del") {
    data = data.slice(0, data.length - 1);
  } else if (value === "reset") {
    data = "";
  } else if (value === "calc") {
    data = data.replace("x", "*");
    data = eval(data).toString();
  } else {
    if (value === "*") {
      value = "x";
    }
    data += value;
  }

  displayPlace.textContent = data;
}

keys.forEach(function (key) {
  key.addEventListener("click", updateDisplay);
});
