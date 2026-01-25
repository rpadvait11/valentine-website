/*************************
 🔐 PASSWORD SYSTEM
*************************/
const correctPassword = "onlyyou"; // 🔑 CHANGE THIS

function checkPassword() {
  const input = document
    .getElementById("passwordInput")
    .value.trim()
    .toLowerCase();

  const error = document.getElementById("errorMsg");

  if (input === correctPassword.toLowerCase()) {
    document.getElementById("lockScreen").style.display = "none";
    document.getElementById("mainContent").style.display = "block";
    window.scrollTo(0, 0);
  } else {
    error.innerText = "Incorrect password";
  }
}

/*************************
 🎵 AUDIO
*************************/
const music = document.getElementById("bgMusic");
const heartSound = document.getElementById("heartSound");
const fireSound = document.getElementById("fireSound");

function startExperience() {
  music.volume = 0.5;
  music.play();
  document
    .getElementById("story")
    .scrollIntoView({ behavior: "smooth" });
}

/*************************
 ✍️ TYPEWRITER TEXT
*************************/
const lines = [
  "You make my world brighter.",
  "You calm my chaos.",
  "You feel like home.",
  "I choose you. Always."
];

let lineIndex = 0;
let charIndex = 0;
const typeEl = document.getElementById("typeText");

function typeWriter() {
  if (lineIndex < lines.length) {
    if (charIndex < lines[lineIndex].length) {
      typeEl.innerHTML += lines[lineIndex][charIndex++];
      setTimeout(typeWriter, 60);
    } else {
      typeEl.innerHTML += "<br><br>";
      charIndex = 0;
      lineIndex++;
      setTimeout(typeWriter, 400);
    }
  }
}
typeWriter();

/*************************
 🌸 FADE-IN ON SCROLL
*************************/
window.addEventListener("scroll", () => {
  document.querySelectorAll(".fade").forEach(section => {
    if (
      section.getBoundingClientRect().top <
      window.innerHeight - 100
    ) {
      section.classList.add("show");
    }
  });
});

/*************************
 ❤️ FLOATING HEARTS
*************************/
setInterval(() => {
  const heart = document.createElement("span");
  heart.innerText = "❤️";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.bottom = "0";
  document.getElementById("hearts").appendChild(heart);
  setTimeout(() => heart.remove(), 5000);
}, 400);

/*************************
 💥 YES BUTTON ACTION
*************************/
function yesClick() {
  document.getElementById("finalText").innerText =
    "You just made this Valentine unforgettable 💖";

  // Heart sound
  heartSound.currentTime = 0;
  heartSound.play();

  // Heart explosion
  for (let i = 0; i < 30; i++) {
    const burst = document.createElement("span");
    burst.innerText = "💖";
    burst.style.left = "50vw";
    burst.style.top = "50vh";
    document.getElementById("explosion").appendChild(burst);
    setTimeout(() => burst.remove(), 1500);
  }

  startConfetti();

  setTimeout(() => {
    fireSound.currentTime = 0;
    fireSound.play();
    startFireworks();
  }, 400);
}

/*************************
 🎉 CONFETTI
*************************/
const confettiCanvas = document.getElementById("confetti");
const cctx = confettiCanvas.getContext("2d");
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

let confetti = [];

function startConfetti() {
  confetti = [];
  for (let i = 0; i < 200; i++) {
    confetti.push({
      x: Math.random() * confettiCanvas.width,
      y: Math.random() * confettiCanvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * 20,
      color: `hsl(${Math.random() * 360},100%,60%)`
    });
  }
  animateConfetti();
}

function animateConfetti() {
  cctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confetti.forEach(c => {
    cctx.beginPath();
    cctx.fillStyle = c.color;
    cctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
    cctx.fill();
    c.y += Math.cos(c.d) + 3;
  });
  requestAnimationFrame(animateConfetti);
}

/*************************
 🎆 FIREWORKS
*************************/
const fireCanvas = document.getElementById("fireworks");
const fctx = fireCanvas.getContext("2d");
fireCanvas.width = window.innerWidth;
fireCanvas.height = window.innerHeight;

function startFireworks() {
  for (let i = 0; i < 6; i++) {
    setTimeout(createFirework, i * 400);
  }
}

function createFirework() {
  const x = Math.random() * fireCanvas.width;
  const y = Math.random() * fireCanvas.height / 2;

  for (let i = 0; i < 60; i++) {
    const angle = (Math.PI * 2 * i) / 60;
    const speed = Math.random() * 6 + 2;
    animateParticle({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 60,
      color: `hsl(${Math.random() * 360},100%,60%)`
    });
  }
}

function animateParticle(p) {
  function update() {
    if (p.life-- <= 0) return;
    fctx.beginPath();
    fctx.fillStyle = p.color;
    fctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
    fctx.fill();
    p.x += p.vx;
    p.y += p.vy;
    requestAnimationFrame(update);
  }
  update();
}
