




const PASSWORD = "1511";
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
    input.disabled = true; // يقفل الكتابة

    const lockCard = document.querySelector(".lock-card");
    
    

    // شغل animation
    lockCard.classList.add("lock-success");

    // Delay 1 second قبل الدخول
    setTimeout(() => {

      playMusic();

      lock.style.opacity = "0";

      setTimeout(() => {
        lock.style.display = "none";
        content.classList.remove("hidden");
      }, 400);

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
    musicBtn.classList.remove("hidden");
  }).catch(() => {
    console.log("Autoplay blocked");
  });
}

musicBtn.addEventListener("click", () => {

  if (isPlaying) {
    music.pause();
    musicIcon.className = "fa-solid fa-play";
  } else {
    music.play();
    musicIcon.className = "fa-solid fa-pause";
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

}



/* ================= FLOATING HEARTS SCRIPT ================= */

const heartsContainer = document.querySelector(".hearts-container");

function createHeart() {

  const heart = document.createElement("div");
  heart.classList.add("heart-float");
  heart.innerHTML = "❤";

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

// كل 600ms يطلع قلب
setInterval(createHeart, 1000);



