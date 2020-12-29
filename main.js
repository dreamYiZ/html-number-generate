let intervalId = null;
let intervalTime = 400;
let gen = null;
let currnetN = null;

function* generatorPrimeNumber() {
  let n = currnetN || 0;
  while (++n) {
    let i = n;
    let isPrimeNumber = true;
    while (i--) {
      n % i === 0 && n !== i && i !== 1 && (isPrimeNumber = false);
    }
    if (isPrimeNumber) {
      yield (currnetN = n);
    } else {
    }
  }
}

function addElement(nodeText) {
  const newDiv = document.createElement("div");
  const newContent = document.createTextNode(nodeText);
  newDiv.appendChild(newContent);
  document.body.appendChild(newDiv);
}

function startInterval(t) {
  return setInterval(() => {
    addElement(gen.next().value);
  }, t);
}

function addButton(nodeText = "开始计数") {
  const newDiv = document.createElement("button");
  const newContent = document.createTextNode(nodeText);
  newDiv.appendChild(newContent);
  newDiv.addEventListener("click", function (event) {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
      newDiv.textContent = "开始计数";
    } else {
      intervalId = startInterval(intervalTime);
      newDiv.textContent = "停止计数";
    }
  });
  document.body.appendChild(newDiv);
}

function changeKeyDown() {
  document.onkeydown = function disableKeys(event) {
    if (typeof event != "undefined") {
      if (event.ctrlKey && event.code === "F5") {
        sessionStorage.setItem("cache__number", currnetN);
        window.location.reload();
        return false;
      }
    }
  };
}

function main() {
  currnetN = sessionStorage.getItem("cache__number");
  gen = generatorPrimeNumber();
  addButton();
  changeKeyDown();
}

main();
