/* ================= SUPABASE ================= */
const SUPABASE_URL = "https://bgfmlaawqkldjxuztfyw.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_AGIzngMZ121kB4oLhWICeg_koN3su9h";
const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/* ================= CONTENT HTML (hidden from source) ================= */
const CONTENT_HTML = `
  <section class="timeline">
    <div class="timeline-card">
      <div class="tl-stars"></div>
      <div class="tl-header">
        <span class="tl-line-left"></span>
        <span class="tl-icon"><i class="fa-solid fa-infinity"></i></span>
        <span class="tl-line-right"></span>
      </div>
      <h4 class="tl-title">OUR ETERNAL TIMELINE</h4>
      <div class="time-grid">
        <div class="time-cell" style="--i:0; --o:6s">
          <div class="cell-aura"></div>
          <span id="years">0</span>
          <small>سنة</small>
        </div>
        <div class="time-cell" style="--i:1; --o:5s">
          <div class="cell-aura"></div>
          <span id="months">0</span>
          <small>شهر</small>
        </div>
        <div class="time-cell" style="--i:2; --o:4s">
          <div class="cell-aura"></div>
          <span id="days">0</span>
          <small>يوم</small>
        </div>
        <div class="time-cell" style="--i:3; --o:3s">
          <div class="cell-aura"></div>
          <span id="hours">0</span>
          <small>ساعة</small>
        </div>
        <div class="time-cell" style="--i:4; --o:2s">
          <div class="cell-aura"></div>
          <span id="minutes">0</span>
          <small>دقيقة</small>
        </div>
        <div class="time-cell highlight glow" style="--i:5; --o:1s">
          <div class="cell-aura"></div>
          <div class="sonar-ring"></div>
          <span id="seconds">0</span>
          <small>ثانية</small>
        </div>
      </div>
      <div class="tl-footer">
        <span class="tl-footnote">وتبقى الذكرى نجمة تُنير الدرب</span>
      </div>
    </div>
  </section>

  <section class="memories">
    <div class="memory-card" id="staticCard1">
      <div class="memory-info">
        <span class="date">1-11-2025</span>
        <h3>أول صورة لينا</h3>
        <p>أول صورة جمعتنا مع بعض، كانت بداية حكاية جميلة، لحظة بسيطة بس مليانة إحساس وذكريات هتفضل عايشة جوانا دايمًا</p>
      </div>
    </div>
    <div class="memory-card" id="staticCard2">
      <div class="memory-info">
        <span class="date">25-11-2025</span>
        <h3>أحلى يوم لينا</h3>
        <p>اليوم ده كان من أحلى الأيام اللي عدّت علينا، اتطمنّا فيه لبعض اوي وحسّينا قد إيه وجودنا مع بعض مريح وكان مميز أكتر لأنه كان يوم عيد ميلادك</p>
      </div>
    </div>
    <div class="memory-card" id="staticCard3">
      <div class="memory-info">
        <span class="date">27-1-2026</span>
        <h3>يوم مميز بالنسبالي</h3>
        <p>اليوم ده كان مميز بالنسبالي جدًا، كنت مبسوط من قلبي ومن غير أي سبب غير إننا كنا مع بعض</p>
      </div>
    </div>
    <div class="memory-card video-card" id="staticVideoCard">
      <div class="video-wrapper">
        <video id="memoriesVideo" preload="metadata" muted playsinline></video>
        <button class="video-play-btn" aria-label="play video"><i class="fa-solid fa-play"></i></button>
        <button class="video-sound-btn" aria-label="toggle sound"><i class="fa-solid fa-volume-xmark"></i></button>
      </div>
      <div class="memory-info">
        <span class="date"><i class="fa-solid fa-infinity fa-2xl"></i></span>
        <h3>ذكريات عمري ما هنساها</h3>
        <p>شوية لحظات متجمعة في فيديو، كل لقطة فيهم بتحكي ذكرى، وكل ذكرى ليها مكان خاص في قلبي</p>
      </div>
    </div>
  </section>

  <section class="memories" id="newMemoriesContainer"></section>

  <section class="final">
    <div class="final-card">
      <span><i class="fa-solid fa-heart fa-2xl" style="color: #e64b7c;"></i></span>
      <p id="finalText">
معاكي حسّيت يعني إيه حب حقيقي،
راحة واطمئنان من غير مجهود
<br><br>
بقيت أحب أبسط التفاصيل لمجرد إنك موجودة فيها،
وأحلى وقت عندي هو الوقت اللي بكون معاكي فيه
<br><br>
ونفسي مهما يحصل نفضل دايمًا مع بعض،
نعدّي كل حاجة سوا ونكون سند لبعض طول العمر
<br><br>
بحبك أوي… ونفسي نكمّل طريقنا جنب بعض دايمًا ..
      </p>
      <strong>Mahmoud & Waad</strong>
    </div>
  </section>
`;

/* ================= INJECT CONTENT ================= */
function injectContent() {
  const el = document.getElementById("content");
  el.innerHTML = CONTENT_HTML;

  const cards = [
    document.getElementById("staticCard1"),
    document.getElementById("staticCard2"),
    document.getElementById("staticCard3"),
  ];

  const staticImgs = ["img/1.jpg", "img/2.jpg", "img/3.jpg"];
  cards.forEach((card, i) => {
    const img = document.createElement("img");
    img.src = staticImgs[i];
    img.alt = "";
    img.loading = "lazy";
    card.prepend(img);
  });

  const video = document.getElementById("memoriesVideo");
  if (video) {
    video.poster = "img/videobg.jpeg";
    video.src = "video/memories.mp4";
  }

  loadMemories();
}

/* ================= PASSWORD ================= */
const input = document.getElementById("passwordInput");
const lock = document.getElementById("lockScreen");
const content = document.getElementById("content");
let prevLen = 0;

function burstSparkles() {
  const wrap = document.querySelector(".lock-icon-wrap");
  if (!wrap) return;
  for (let i = 0; i < 6; i++) {
    const dot = document.createElement("div");
    dot.className = "sparkle";
    const angle = Math.random() * 360;
    const dist = 30 + Math.random() * 50;
    dot.style.setProperty("--tx", `${Math.cos(angle) * dist}px`);
    dot.style.setProperty("--ty", `${Math.sin(angle) * dist}px`);
    dot.style.left = "50%";
    dot.style.top = "50%";
    wrap.appendChild(dot);
    setTimeout(() => dot.remove(), 600);
  }
}

input.addEventListener("input", () => {
  input.value = input.value.replace(/[^0-9]/g, "");
  const len = input.value.length;
  if (len > prevLen) burstSparkles();
  prevLen = len;
  const dots = document.querySelectorAll(".pin-dot");
  dots.forEach((dot, i) => dot.classList.toggle("filled", i < len));
  if (len === 4) checkPassword();
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") checkPassword();
});

async function checkPassword() {
  const { data, error } = await sb.rpc("check_password", { input_pw: input.value });
  if (!error && data) {
    input.blur();
    input.disabled = true;
    const lockCard = document.querySelector(".lock-card");
    const lockHint = lockCard.querySelector("p");
    lockHint.textContent = "جاري الفتح...";
    lockCard.classList.add("lock-success");
    burstHearts();

    const contentLoaded = injectContent();

    setTimeout(async () => {
      playMusic();
      lock.classList.add("closing");
      await contentLoaded;
      lock.style.display = "none";
      content.classList.remove("hidden");
      requestAnimationFrame(() => {
        content.classList.add("visible");
        container?.classList.add("home");
      });
      startTimer();
      setupVideo();
      observeCards();
      typeFinalMessage();
      requestNotificationPermission();
    }, 1500);
  } else {
    input.value = "";
    input.placeholder = "كلمة المرور غير صحيحة";
    const card = document.querySelector(".lock-card");
    const icon = card.querySelector(".lock-icon-locked");
    const dots = document.querySelectorAll(".pin-dot");
    card.classList.add("shake");
    icon.style.color = "#ff3355";
    dots.forEach(d => d.classList.add("wrong"));
    setTimeout(() => {
      card.classList.remove("shake");
      icon.style.color = "#e64b7c";
      dots.forEach(d => d.classList.remove("wrong", "filled"));
    }, 600);
  }
}

/* ================= TIMER ================= */
const startDate = new Date("2025-10-20T17:57:00");
let timerInterval;

function startTimer() {
  if (timerInterval) clearInterval(timerInterval);
  function tick() {
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
    const y = document.getElementById("years");
    if (y) y.textContent = years;
    const m = document.getElementById("months");
    if (m) m.textContent = months;
    const d = document.getElementById("days");
    if (d) d.textContent = days;
    const h = document.getElementById("hours");
    if (h) h.textContent = hours;
    const mi = document.getElementById("minutes");
    if (mi) mi.textContent = minutes;
    const s = document.getElementById("seconds");
    if (s) s.textContent = seconds;
  }
  tick();
  timerInterval = setInterval(tick, 1000);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) { clearInterval(timerInterval); timerInterval = null; }
    else if (!timerInterval) { tick(); timerInterval = setInterval(tick, 1000); }
  });
}

/* ================= MUSIC ================= */
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicToggle");
const musicIcon = musicBtn?.querySelector("i");
let isPlaying = false;
let musicPausedByVideo = false;

function pauseMusic() {
  if (music && !music.paused) { music.pause(); musicPausedByVideo = true; }
}

function resumeMusic() {
  if (music && musicPausedByVideo) { music.play().catch(() => {}); musicPausedByVideo = false; }
}

async function playMusic() {
  if (!music) return;
  music.volume = 0.6;
  music.loop = true;
  try {
    music.src = "music/Adele - Lovesong (Lyric Video) (mp3cut.net).mp3";
    await music.play();
    isPlaying = true;
    if (musicIcon) musicIcon.className = "fa-solid fa-pause";
    if (musicBtn) { musicBtn.classList.add("playing"); musicBtn.classList.remove("hidden"); }
  } catch (e) {
    console.log("Autoplay blocked");
  }
}

musicBtn?.addEventListener("click", () => {
  if (isPlaying) {
    music.pause();
    if (musicIcon) musicIcon.className = "fa-solid fa-play";
    if (musicBtn) musicBtn.classList.remove("playing");
  } else {
    music.play().catch(() => {});
    if (musicIcon) musicIcon.className = "fa-solid fa-pause";
    if (musicBtn) musicBtn.classList.add("playing");
  }
  isPlaying = !isPlaying;
});

/* ================= VIDEO ================= */
function setupVideo() {
  const videoCard = document.querySelector('.video-card');
  const video = document.getElementById('memoriesVideo');
  const playBtn = document.querySelector('.video-play-btn');
  if (!video || !playBtn) return;
  video.muted = false;
  video.volume = 1;
  function onVidPlay() { pauseMusic(); videoCard?.classList.add('playing'); }
  function onVidStop() { resumeMusic(); videoCard?.classList.remove('playing'); }
  playBtn.addEventListener('click', () => {
    onVidPlay();
    video.play().catch(() => {});
    if (video.requestFullscreen) video.requestFullscreen();
    else if (video.webkitEnterFullscreen) video.webkitEnterFullscreen();
  });
  video.addEventListener('play', onVidPlay);
  video.addEventListener('playing', onVidPlay);
  video.addEventListener('pause', onVidStop);
  video.addEventListener('ended', onVidStop);
  document.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement === video) onVidPlay(); else onVidStop();
  });
  document.addEventListener('webkitfullscreenchange', () => {
    if (document.webkitFullscreenElement === video) onVidPlay(); else onVidStop();
  });
  const soundBtn = videoCard?.querySelector(".video-sound-btn");
  if (soundBtn) {
    soundBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      video.muted = !video.muted;
      soundBtn.querySelector("i").className = video.muted ? "fa-solid fa-volume-xmark" : "fa-solid fa-volume-high";
    });
  }
}

/* ================= LOAD MEMORIES (Supabase) ================= */
async function loadMemories() {
  const { data, error } = await sb
    .from("memories")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) { console.error(error); return; }

  const container = document.getElementById("newMemoriesContainer");
  if (!container) return;

  for (const item of data) {
    const card = document.createElement("div");
    card.className = "memory-card" + (item.type === "video" ? " video-card" : "");

    const mediaUrl = sb.storage.from("memories").getPublicUrl(item.media_path).data.publicUrl;
    const posterUrl = item.poster_path ? sb.storage.from("memories").getPublicUrl(item.poster_path).data.publicUrl : '';

    if (item.type === "video") {
      card.innerHTML = `
        <div class="video-wrapper">
          <video src="${mediaUrl}" poster="${posterUrl}" preload="metadata" playsinline></video>
          <button class="video-play-btn" aria-label="play video"><i class="fa-solid fa-play"></i></button>
          <button class="video-sound-btn" aria-label="toggle sound"><i class="fa-solid fa-volume-xmark"></i></button>
        </div>`;
    } else {
      card.innerHTML = `<img src="${mediaUrl}" alt="" loading="lazy">`;
    }

    const info = document.createElement("div");
    info.className = "memory-info";
    const dt = item.date_text;
    const dateHtml = dt.includes("♾️")
      ? '<i class="fa-solid fa-infinity fa-2xl" style="color:var(--pink)"></i>'
      : dt;
    info.innerHTML = `
      <span class="date">${dateHtml}</span>
      <h3>${item.title}</h3>
      <p>${item.caption}</p>`;
    card.appendChild(info);
    container.appendChild(card);
  }

  document.querySelectorAll(".memory-card").forEach((c, i) => {
    c.style.animationDelay = `${i * 0.08}s`;
  });

  (function watchCards() {
    if (window.cardObserver) {
      document.querySelectorAll(".memory-card:not(.show)").forEach(c => window.cardObserver.observe(c));
    } else {
      setTimeout(watchCards, 100);
    }
  })();

  document.querySelectorAll(".video-card").forEach(vc => {
    const v = vc.querySelector("video");
    const btn = vc.querySelector(".video-play-btn");
    if (!v || !btn) return;
    function onVidPlay2() { pauseMusic(); vc.classList.add("playing"); }
    function onVidStop2() { resumeMusic(); vc.classList.remove("playing"); }
    btn.addEventListener("click", () => {
      onVidPlay2();
      v.play().catch(() => {});
      if (v.requestFullscreen) v.requestFullscreen();
      else if (v.webkitEnterFullscreen) v.webkitEnterFullscreen();
    });
    v.addEventListener("play", onVidPlay2);
    v.addEventListener("playing", onVidPlay2);
    v.addEventListener("pause", onVidStop2);
    v.addEventListener("ended", onVidStop2);
    const sbBtn = vc.querySelector(".video-sound-btn");
    if (sbBtn) {
      sbBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        v.muted = !v.muted;
        sbBtn.querySelector("i").className = v.muted ? "fa-solid fa-volume-xmark" : "fa-solid fa-volume-high";
      });
    }
  });
}

/* ================= FLOATING HEARTS ================= */
const heartsContainer = document.querySelector(".hearts-container");

function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart-float");
  heart.innerHTML = '<i class="fa-solid fa-heart"></i>';
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = (Math.random() * 20 + 12) + "px";
  const duration = Math.random() * 3 + 3;
  heart.style.animationDuration = duration + "s";
  heartsContainer?.appendChild(heart);
  setTimeout(() => heart.remove(), duration * 1000);
}

let heartInterval = setInterval(createHeart, 1000);
document.addEventListener("visibilitychange", () => {
  if (document.hidden) clearInterval(heartInterval);
  else heartInterval = setInterval(createHeart, 1000);
});

/* ================= FLOATING CALLIGRAPHY ================= */
const words = ["حب", "أمل", "سلام", "أمان", "روح", "حنين","حب", "سند", "قرب", "شغف", "حياة", "وعد", "عشق", "حلم","حب"];
const container = document.querySelector(".bg-calligraphy");
if (container) {
  const bands = [24, 18, 14, 12, 12];
  let idx = 0;
  bands.forEach((count, band) => {
    for (let i = 0; i < count; i++) {
      const el = document.createElement("span");
      el.textContent = words[idx % words.length];
      idx++;
      const opacity = 0.1 + band * 0.08;
      el.style.cssText = `
        position: absolute;
        font-family: 'Rekaa', serif;
        font-size: ${40 + Math.random() * 100}px;
        color: rgba(var(--pink-rgb), ${opacity});
        left: ${Math.random() * 100}%;
        bottom: ${-5 + band * 20}%;
        z-index: ${band};
        animation: calligraphyFloat ${20 + Math.random() * 30}s linear infinite;
        animation-delay: -${Math.random() * 50}s;
        transform: rotate(${-15 + Math.random() * 30}deg);
        text-shadow: 0 0 20px rgba(var(--pink-rgb), 0.35);
        pointer-events: none;
        user-select: none;
      `;
      container.appendChild(el);
    }
  });
}

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

/* ================= TYPING EFFECT ================= */
function typeFinalMessage() {
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
      if (i >= full.length) { clearInterval(t); el.classList.remove("typing"); }
    }, 45);
    obs.disconnect();
  }, { threshold: 0.3 });
  obs.observe(el);
}

/* ================= SCROLL PROGRESS ================= */
const progressBar = document.getElementById("scrollProgress");
if (progressBar) {
  window.addEventListener("scroll", () => {
    const h = document.documentElement;
    const p = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    progressBar.style.width = Math.min(p, 100) + "%";
  }, { passive: true });
}

/* ================= HEART BURST ================= */
function burstHearts() {
  const c = document.querySelector(".hearts-container") || document.body;
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