console.log("Hello, World!");

//////////////////////// task 1 ///////////////////////
let inputField = document.getElementById("inputField");
const inputPattern = /^[A-Za-z\u0600-\u06FF\s]+$/;

inputField.addEventListener("keydown", function (event) {
  event.stopPropagation();
  console.log(event.key);

  const validLetter = inputPattern.test(event.key);
  console.log(validLetter);
  validLetter ? "" : event.preventDefault();

  window.alert(`the code for ${event.key} is: ${event.code}`);
});

inputField.addEventListener("mousedown", function (event) {
  let button = event.button;
  alert(mouseClickMessage(button));
});
// function to handle display the mouse event that occurred
function mouseClickMessage(btnCode) {
  switch (btnCode) {
    case 0:
      return `you clicked left btn`;
    case 1:
      return `you clicked wheel`;
    case 2:
      return `you clicked right btn`;
  }
}
///////////////////////////////////////////////////////////

//////////////// task 2 ///////////////////////////////////

// let clock = document.querySelector(".clock");
// console.log(clock);
// const time = new Date();
// console.log(time);
//  function to return current time
function currentTime() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const pmOrAm = hours > 12 ? "PM" : "AM";

  return `${String(hours > 12 ? hours / 2 : hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}:${String(seconds).padStart(2, "0")} ${pmOrAm}`;
}

const btns = document.querySelectorAll(".clock-btn");
let timeinterval;
btns[0].addEventListener("click", () => {
  timeinterval = setInterval(() => {
    document.querySelector(".clock").innerHTML = currentTime();
  }, 0);
  alert("Clock Started");
});
window.addEventListener("keydown", function (key) {
  // task number 2
  // if (!(key.altKey && key.keyCode == 87)) {
  //   return;
  // }

  if (key.keyCode != 87) {
    return;
  }

  console.log(key);
  stopClock();
});
btns[1].addEventListener("click", stopClock);

function stopClock() {
  clearInterval(timeinterval);
  alert("Clock stopped");
}
// /////////////////////////////////////////////////////////

//////////////////// task 3 /////////////////////////////////

inputField.addEventListener("keydown", function (event) {
  const [start, end] = [65, 90];
  //   console.log(event);
  if (event.keyCode < start || event.keyCode > 90) event.preventDefault();
});

/////////////////////// task 4 ////////////////////////
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slides[slideIndex - 1].style.display = "block";
}

/////////////// task 5 //////////////////////

/////////////// task 5.2 /////////////////

Array.from(document.getElementsByTagName("img")).forEach((element) => {
  element.addEventListener("contextmenu", function (event) {
    event.preventDefault();
  });
});
