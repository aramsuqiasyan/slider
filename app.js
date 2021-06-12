const upBtn = document.querySelector(".up-button");
const downBtn = document.querySelector(".down-button");
const sidebar = document.querySelector(".sidebar");
const container = document.querySelector(".container");
const mainSlide = document.querySelector(".main-slide");
const slidesCount = mainSlide.querySelectorAll("div").length;
let process = false;
let mouseDown = false;
let activeSlideIndex = 0;
let movementY;

sidebar.style.top = `-${(slidesCount - 1) * 100}vh`;

upBtn.addEventListener("click", () => {
  changeSlide("up");
});

downBtn.addEventListener("click", () => {
  changeSlide("down");
});

function changeSlide(direction) {
  process = true;
  if (direction === "up") {
    activeSlideIndex++;
    if (activeSlideIndex === slidesCount) {
      activeSlideIndex = 0;
    }
  } else if (direction === "down") {
    activeSlideIndex--;
    if (activeSlideIndex < 0) {
      activeSlideIndex = slidesCount - 1;
    }
  }

  const height = container.clientHeight;
  mainSlide.style.transform = `translateY(-${activeSlideIndex * height}px)`;
  sidebar.style.transform = `translateY(${activeSlideIndex * height}px)`;
  movementY = 0;
  process = false;
}

document.addEventListener("keydown", (e) => {
  switch (e.keyCode) {
    case 38:
      changeSlide("up");
      break;
    case 40:
      changeSlide("down");
      break;
  }
});

container.addEventListener("mousedown", () => {
  mouseDown = true;
});
container.addEventListener("mousemove", (e) => {
  if (mouseDown && !process) {
    movementY = e.movementY;
  }
});
container.addEventListener("mouseup", () => {
  mouseDown = false;
  if (movementY > 0) {
    changeSlide("down");
  } else if (movementY < 0) {
    changeSlide("up");
  }
});
