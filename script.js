// 🔐 PASSWORD
const correctPassword = "onlyyou"; // CHANGE THIS

function checkPassword() {
  const input = document.getElementById("passwordInput").value;
  if (input === correctPassword) {
    document.getElementById("lockScreen").style.display = "none";
    document.getElementById("mainContent").style.display = "block";
  } else {
    document.getElementById("errorMsg").innerText = "Wrong password 💔";
  }
}

// AUDIO
const music = document.getElementById("bgMusic");
const heartSound = document.getElementById("heartSound");
const fireSound = document.getElementById("fireSound");

function startExperience() {
  music.volume = 0.5;
  music.play();
  document.getElementById("story").scrollIntoView({ behavior: "smooth" });
}

// TYPEWRITER
const lines = [
  "You make my world brighter.",
  "You calm my chaos.",
  "You feel like home.",
  "I choose you. Always."
];

let i = 0, j = 0;
const el = document.getElementById("typeText");

(function type() {
  if (i < lines.length) {
    if (j < lines[i].length) {
      el.innerHTML += lines[i][j++];
      setTimeout(type, 60);
    } else {
      el.innerHTML += "<br><br>";
      j = 0; i++;
      setTimeout(type, 400);
    }
  }
})();

// FADE
window.addEventListener("scroll", () => {
  document.querySelectorAll(".fade").forEach(f => {
    if (f.getBoundingClientRect().top < window.innerHeight - 100) {
      f.classList.add("show");
    }
  });
});

// FLOATING HEARTS
setInterval(() => {
  const h = document.createElement("span");
  h.innerText = "❤️";
  h.style.left = Math.random() * 100 + "vw";
  h.style.bottom = "0";
  document.getElementById("hearts").appendChild(h);
  setTimeout(() => h.remove(), 5000);
}, 400);

// YES CLICK
function yesClick() {
  document.getElementById("finalText").innerText =
    "You just made this Valentine unforgettable 💖";

  heartSound.play();

  for (let i = 0; i < 30; i++) {
    const e = document.createElement("span");
    e.innerText = "💖";
    e.style.left = "50vw";
    e.style.top = "50vh";
    document.getElementById("explosion").appendChild(e);
    setTimeout(() => e.remove(), 1500);
  }

  startConfetti();
  setTimeout(() => {
    fireSound.play();
    startFireworks();
  }, 400);
}

// CONFETTI
const confettiCanvas = document.getElementById("confetti");
const ctx = confettiCanvas.getContext("2d");
confettiCanvas.width = innerWidth;
confettiCanvas.height = innerHeight;

let confetti = [];

function startConfetti() {
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
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confetti.forEach(c => {
    ctx.beginPath();
    ctx.fillStyle = c.color;
    ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
    ctx.fill();
    c.y += Math.cos(c.d) + 3;
  });
  requestAnimationFrame(animateConfetti);
}

// FIREWORKS
const fireCanvas = document.getElementById("fireworks");
const fctx = fireCanvas.getContext("2d");
fireCanvas.width = innerWidth;
fireCanvas.height = innerHeight;

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
      x, y,
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

