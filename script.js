
(function () {
  const canvas = document.getElementById('snow');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h; let flakes = [];
  const FLAKES = 220; // tuned for performance

  const resize = () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  };
  window.addEventListener('resize', resize);
  resize();

  const rand = (min, max) => Math.random() * (max - min) + min;
  const createFlake = () => ({
    x: rand(0, w), y: rand(-h, h), r: rand(0.8, 2.6), d: rand(0.5, 1.5), a: rand(0, Math.PI * 2)
  });
  flakes = Array.from({ length: FLAKES }, createFlake);

  function draw() {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.beginPath();
    for (let i = 0; i < flakes.length; i++) {
      const f = flakes[i];
      const sway = Math.sin(f.a) * 0.8;
      ctx.moveTo(f.x, f.y);
      ctx.arc(f.x + sway, f.y, f.r, 0, Math.PI * 2);
      f.y += f.d;
      f.a += 0.01 + f.d * 0.002;
      if (f.y > h + 4) { f.y = -4; f.x = rand(0, w); }
    }
    ctx.fill();
    requestAnimationFrame(draw);
  }
  draw();
})();

// // Parallax trees on scroll
// (function () {
//   const bg = document.querySelector('.trees-bg');
//   const fg = document.querySelector('.trees-fg');
//   const onScroll = () => {
//     const y = window.scrollY;
//     if (bg) bg.style.transform = `translateY(${y * 0.08}px)`;
//     if (fg) fg.style.transform = `translateY(${y * 0.16}px)`;
//   };
//   document.addEventListener('scroll', onScroll, { passive: true });
//   onScroll();
// })();



(function () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();



(function () {
  const modal = document.getElementById('modal');
  const msgBox = document.getElementById('modalMessage');
  const closeBtn = document.querySelector('.modal-close');

  const showModal = (message) => {
    msgBox.textContent = message;
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
  };
  const hideModal = () => {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
  };

  modal.addEventListener('click', (e) => { if (e.target === modal) hideModal(); });
  closeBtn.addEventListener('click', hideModal);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') hideModal(); });

  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('open');
      const message = card.dataset.message || 'Merry Christmas!';
      showModal(message);
    });
  });
})();

// Gentle audio toggle (starts on first interaction if allowed)
(function () {
  const audio = document.getElementById('bgAudio');
  const btn = document.getElementById('audioToggle');
  if (!audio || !btn) return;

  let playing = false;
  const updateBtn = () => {
    btn.textContent = playing ? '⏸ Music' : '♪ Music';
  };
  updateBtn();

  const start = async () => {
    try {
      await audio.play();
      playing = true; updateBtn();
    } catch (e) {
      playing = false; updateBtn();
    }
  };
  const stop = () => { audio.pause(); playing = false; updateBtn(); };

  btn.addEventListener('click', () => { playing ? stop() : start(); });

  // Try to start softly after first user interaction
  const oneTimeStart = () => { start(); window.removeEventListener('click', oneTimeStart); };
  window.addEventListener('click', oneTimeStart, { once: true });
})();



