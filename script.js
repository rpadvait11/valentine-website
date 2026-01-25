/* 🔐 PASSWORD */
const correctPassword = "onlyyou";

function checkPassword() {
  const input = document.getElementById("passwordInput").value.trim();
  if (input === correctPassword) {
    document.getElementById("lockScreen").style.display = "none";
    document.getElementById("mainContent").style.display = "block";
  } else {
    document.getElementById("errorMsg").innerText = "Wrong password";
  }
}

/* 🎵 AUDIO */
const music = document.getElementById("bgMusic");
const heartSound = document.getElementById("heartSound");
const fireSound = document.getElementById("fireSound");

function startExperience() {
  music.volume = 0.5;
  music.play();
}

/* ✍️ TYPEWRITER */
const lines = [
  "You make my world brighter.",
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

/* 💖 YES BUTTON */
function yesClick() {
  document.getElementById("finalText").innerText =
    "Happy Valentine’s Day 💖";

  heartSound.play();
  fireSound.play();
}
