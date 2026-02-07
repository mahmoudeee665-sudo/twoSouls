const PASSWORD = "love";

/* Password logic */
function checkPassword() {
  const input = document.getElementById("passwordInput");
  const lock = document.getElementById("lockScreen");
  const content = document.getElementById("content");

  if (input.value === PASSWORD) {
    input.blur();

    playMusic(); // 🎵 تشغيل الأغنية

    lock.style.opacity = "0";

    setTimeout(() => {
      lock.style.display = "none";
      content.classList.remove("hidden");
    }, 400);
  } else {
    input.value = "";
    input.placeholder = "كلمة المرور غير صحيحة";
  }
}


/* Enter key */
document.addEventListener("keydown", e => {
  if (e.key === "Enter") checkPassword();
});

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
  // تأكيد إن الفيديو صامت دايمًا
  video.muted = true;
  video.volume = 0;

  playBtn.addEventListener('click', () => {
    // ❌ لا نلمس bgMusic نهائيًا
    // الموسيقى تفضل شغالة

    video.play();
    videoCard.classList.add('playing');

    // Fullscreen
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.webkitEnterFullscreen) {
      video.webkitEnterFullscreen(); // iOS
    }
  });

  video.addEventListener('pause', () => {
    videoCard.classList.remove('playing');
  });

  video.addEventListener('ended', () => {
    videoCard.classList.remove('playing');
  });
}
