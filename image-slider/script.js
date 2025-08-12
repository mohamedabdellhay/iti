const arrows = document.querySelectorAll(".arrow");
const slider = document.querySelector(".slider");
const allImages = document.querySelectorAll(".slider > div");

let current = 0;

arrows.forEach((arrow) => {
  arrow.addEventListener("click", (event) => {
    if (event.target.closest(".left")) {
      current--;
      if (current < 0) {
        current = allImages.length - 1;
      }
    } else {
      current++;
      if (current >= allImages.length) {
        current = 0;
      }
    }
    moveSlider();
  });
});

function moveSlider() {
  slider.style.transform = `translateX(-${current * 100}%)`;
  slider.style.transition = "transform 1s ease";
}
