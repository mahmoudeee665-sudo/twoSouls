


const PASSWORD = String.fromCharCode(49, 53, 49, 49);
const input = document.getElementById("passwordInput");
const lock = document.getElementById("lockScreen");
const content = document.getElementById("content");

const PASSWORD_LENGTH = PASSWORD.length;

/* Auto check when length completed */
input.addEventListener("input", () => {

  // يسمح بأرقام فقط
  input.value = input.value.replace(/[^0-9]/g, "");

  // أول ما يكتب 4 أرقام يعمل check
  if (input.value.length === PASSWORD_LENGTH) {
    checkPassword();
  }
});

/* Password logic */
function checkPassword() {

  if (input.value === PASSWORD) {

    input.blur();
    input.disabled = true;

    const lockCard = document.querySelector(".lock-card");
    const lockIcon = lockCard.querySelector("i");
    const lockHint = lockCard.querySelector("p");

    lockHint.textContent = "جاري الفتح...";
    lockIcon.className = "fa-solid fa-spinner fa-spin fa-2xl";
    lockIcon.style.color = "#e64b7c";

    lockCard.classList.add("lock-success");

    burstHearts();

    setTimeout(() => {

      playMusic();

      lock.classList.add("closing");

      setTimeout(() => {
        lock.style.display = "none";
        content.classList.remove("hidden");
        requestAnimationFrame(() => content.classList.add("visible"));
      }, 500);

    }, 1000);

  } else {

    input.value = "";
    input.placeholder = "كلمة المرور غير صحيحة";

  }
}

/* ================= TIMER ================= */

const startDate = new Date("2025-10-20T17:57:00");

setInterval(() => {

  const now = new Date();
  let diff = Math.floor((now - startDate) / 1000);

  const years = Math.floor(diff / (3600 * 24 * 365));
  diff %= 3600 * 24 * 365;

  const months = Math.floor(diff / (3600 * 24 * 30));
  diff %= 3600 * 24 * 30;

  const days = Math.floor(diff / (3600 * 24));
  diff %= 3600 * 24;

  const hours = Math.floor(diff / 3600);
  diff %= 3600;

  const minutes = Math.floor(diff / 60);
  const seconds = diff % 60;

  document.getElementById("years").textContent = years;
  document.getElementById("months").textContent = months;
  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;

}, 1000);


/* ================= MUSIC ================= */

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicToggle");
const musicIcon = musicBtn.querySelector("i");

let isPlaying = false;

function playMusic() {

  music.volume = 0.6;
  music.loop = true;

  music.play().then(() => {
    isPlaying = true;
    musicIcon.className = "fa-solid fa-pause";
    musicBtn.classList.add("playing");
    musicBtn.classList.remove("hidden");
  }).catch(() => {
    console.log("Autoplay blocked");
  });
}

musicBtn.addEventListener("click", () => {

  if (isPlaying) {
    music.pause();
    musicIcon.className = "fa-solid fa-play";
    musicBtn.classList.remove("playing");
  } else {
    music.play();
    musicIcon.className = "fa-solid fa-pause";
    musicBtn.classList.add("playing");
  }

  isPlaying = !isPlaying;
});


/* ================= VIDEO FULLSCREEN ================= */

const videoCard = document.querySelector('.video-card');
const video = document.getElementById('memoriesVideo');
const playBtn = document.querySelector('.video-play-btn');

if (video && playBtn) {

  video.muted = true;
  video.volume = 0;

  playBtn.addEventListener('click', () => {

    video.play();
    videoCard.classList.add('playing');

    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.webkitEnterFullscreen) {
      video.webkitEnterFullscreen();
    }

  });

  video.addEventListener('pause', () => {
    videoCard.classList.remove('playing');
  });

  video.addEventListener('ended', () => {
    videoCard.classList.remove('playing');
  });

  // Sound toggle
  const soundBtn = videoCard.querySelector(".video-sound-btn");
  if (soundBtn) {
    soundBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      video.muted = !video.muted;
      soundBtn.querySelector("i").className = video.muted ? "fa-solid fa-volume-xmark" : "fa-solid fa-volume-high";
    });
  }

}



/* ================= FLOATING HEARTS SCRIPT ================= */

const heartsContainer = document.querySelector(".hearts-container");

function createHeart() {

  const heart = document.createElement("div");
  heart.classList.add("heart-float");
  heart.innerHTML = '<i class="fa-solid fa-heart"></i>';

  // مكان عشوائي أفقي
  heart.style.left = Math.random() * 100 + "vw";

  // حجم عشوائي
  heart.style.fontSize = (Math.random() * 20 + 12) + "px";

  // مدة عشوائية
  const duration = Math.random() * 3 + 3;
  heart.style.animationDuration = duration + "s";

  heartsContainer.appendChild(heart);

  // حذف بعد الانتهاء
  setTimeout(() => {
    heart.remove();
  }, duration * 1000);
}

// Hearts interval — pauses when tab is hidden
let heartInterval = setInterval(createHeart, 1000);
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    clearInterval(heartInterval);
  } else {
    heartInterval = setInterval(createHeart, 1000);
  }
});

/* ================= SCROLL REVEAL ================= */
window.cardObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("show");
      window.cardObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

function observeCards() {
  document.querySelectorAll(".memory-card:not(.show)").forEach(c => window.cardObserver.observe(c));
}

document.addEventListener("DOMContentLoaded", observeCards);

/* ================= SCROLL PROGRESS ================= */
/* ================= TYPING EFFECT ================= */
(function typeFinalMessage() {
  const el = document.getElementById("finalText");
  if (!el) return;
  const full = el.textContent.trim();
  el.textContent = "";
  el.classList.add("typing");
  let i = 0;

  const obs = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return;
    const t = setInterval(() => {
      el.textContent = full.slice(0, i + 1);
      i++;
      if (i >= full.length) {
        clearInterval(t);
        el.classList.remove("typing");
      }
    }, 45);
    obs.disconnect();
  }, { threshold: 0.3 });
  obs.observe(el);
})();

const progressBar = document.getElementById("scrollProgress");
if (progressBar) {
  window.addEventListener("scroll", () => {
    const h = document.documentElement;
    const p = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    progressBar.style.width = Math.min(p, 100) + "%";
  }, { passive: true });
}

/* ================= UNLOCK HEART BURST ================= */
function burstHearts() {
  const container = document.querySelector(".hearts-container") || document.body;
  for (let i = 0; i < 24; i++) {
    const el = document.createElement("div");
    el.innerHTML = '<i class="fa-solid fa-heart"></i>';
    el.style.cssText = `
      position: fixed; z-index: 10000; pointer-events: none;
      font-size: ${14 + Math.random() * 18}px;
      color: #e64b7c;
      left: 50vw; top: 50vh;
      transform: translate(-50%, -50%);
      opacity: 1;
      transition: none;
    `;
    document.body.appendChild(el);
    const angle = Math.random() * 2 * Math.PI;
    const dist = 200 + Math.random() * 400;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist;
    const dur = 0.6 + Math.random() * 0.6;
    el.animate([
      { transform: 'translate(-50%, -50%) scale(0.3)', opacity: 1 },
      { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(1)`, opacity: 0 }
    ], { duration: dur * 1000, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'forwards' });
    setTimeout(() => el.remove(), dur * 1000);
  }
}
