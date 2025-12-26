const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let flakes = [];

for (let i = 0; i < 200; i++) {
  flakes.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    speed: Math.random() * 1 + 0.5
  });
}

function snowFall() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";

  flakes.forEach(flake => {
    ctx.beginPath();
    ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2);
    ctx.fill();

    flake.y += flake.speed;

    if (flake.y > canvas.height) {
      flake.y = 0;
      flake.x = Math.random() * canvas.width;
    }
  });

  requestAnimationFrame(snowFall);
}

snowFall();


const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
  revealElements.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      el.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();


const cards = document.querySelectorAll(".card");
const modal = document.getElementById("modal");
const modalMessage = document.getElementById("modalMessage");
const closeBtn = document.querySelector(".modal-close");

document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {

    if (card.classList.contains('open')) return;

    card.classList.add('open');

    const message = card.dataset.message || 'Merry Christmas!';
    const msgBox = card.querySelector('.card-message');

    if (msgBox) {
      msgBox.textContent = message;
    }
  });
});


closeBtn.addEventListener("click", () => {
  modal.classList.remove("show");
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("show");
  }
});


const audio = document.getElementById("bgAudio");
const musicBtn = document.getElementById("audioToggle");

let isPlaying = false;

musicBtn.addEventListener("click", () => {
  if (!isPlaying) {
    audio.play();
    musicBtn.textContent = "⏸ Music";
  } else {
    audio.pause();
    musicBtn.textContent = "♪ Music";
  }
  isPlaying = !isPlaying;
});

