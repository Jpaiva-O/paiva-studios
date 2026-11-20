/* Paiva Studios — interactions and data */

const posts = [
  { i: 0, type: "video", title: "Natureza em movimento", caption: "Natureza em movimento.", date: "2026-11-07" },
  { i: 1, type: "photo", title: "Arquivo de julho", caption: "Um conjunto de quadros de julho de 2026.", date: "2026-07-28" },
  { i: 2, type: "photo", title: "Memórias de maio", caption: "Registros de maio de 2026.", date: "2026-05-14" },
  { i: 3, type: "photo", title: "Luz de abril", caption: "Um conjunto sereno de abril de 2026.", date: "2026-04-18" },
  { i: 4, type: "photo", title: "O que gerou conversa", caption: "Um dos trabalhos que mais gerou conversa.", date: "2026-03-26" },
  { i: 5, type: "photo", title: "Quadro em destaque", caption: "O quadro mais querido do arquivo.", date: "2026-02-19" },
  { i: 6, type: "photo", title: "Detalhes de janeiro", caption: "Pequenos detalhes, no final de janeiro de 2026.", date: "2026-01-28" },
  { i: 7, type: "photo", title: "Momentos tranquilos", caption: "Um conjunto mais suave de janeiro de 2026.", date: "2026-01-26" },
  { i: 8, type: "photo", title: "Ano novo, novos quadros", caption: "O primeiro registro de 2026.", date: "2026-01-05" },
  { i: 9, type: "photo", title: "Arquivo de outono", caption: "Um favorito de novembro de 2025.", date: "2025-11-16" },
  { i: 10, type: "photo", title: "Uma celebração", caption: "Foi uma alegria registrar este lindo baby shower, cheio de amor, risos e expectativa.", date: "2025-10-26" },
  { i: 11, type: "photo", title: "Favorito de setembro", caption: "Um dos quadros mais amados de 2025.", date: "2025-09-19" }
];

const featuredIds = [5, 11, 4];

const monthNames = ["jan.", "fev.", "mar.", "abr.", "mai.", "jun.", "jul.", "ago.", "set.", "out.", "nov.", "dez."];

function formatDate(iso) {
  const [year, month, day] = iso.split("-");
  return `${Number(day)} ${monthNames[Number(month) - 1]} ${year}`;
}

/* Gallery */
const gallery = document.getElementById("galleryGrid");
const galleryNote = document.getElementById("galleryNote");

function renderGallery(filter = "all") {
  const shown = posts.filter((p) => {
    if (filter === "all") return true;
    if (filter === "featured") return featuredIds.includes(p.i);
    return p.type === filter;
  });

  gallery.innerHTML = shown.map((p) => `
    <button class="post" type="button" data-index="${p.i}" aria-label="Abrir ${p.title}">
      <img src="assets/post-${p.i}.jpg" alt="${p.title}" loading="lazy" />
      <span class="post-overlay">
        <span class="post-tag">${p.type === "video" ? "Vídeo" : "Fotografia"}</span>
        <span class="post-info">
          <span>${formatDate(p.date)}<small>${p.type === "video" ? "Vídeo" : "Fotografia"}</small></span>
          <span aria-hidden="true">↗</span>
        </span>
      </span>
    </button>
  `).join("");

  galleryNote.textContent = "Nenhum trabalho corresponde a este filtro.";
  galleryNote.hidden = shown.length > 0;

  // Ease tiles in one after another (90ms choreography)
  gallery.querySelectorAll(".post").forEach((tile, index) => {
    tile.style.setProperty("--d", `${index * 60}ms`);
    tile.classList.add("in-view");
  });
}

document.querySelectorAll(".filter").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    renderGallery(btn.dataset.filter);
  });
});

renderGallery();

/* Lightbox */
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxMeta = document.getElementById("lightboxMeta");
const lightboxCaption = document.getElementById("lightboxCaption");
let lastFocused = null;

function burstHearts(originX, originY) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  for (let i = 0; i < 9; i++) {
    const heart = document.createElement("span");
    heart.className = "heart-particle";
    heart.textContent = "♥";
    heart.style.left = `${originX}px`;
    heart.style.top = `${originY}px`;
    document.body.appendChild(heart);

    const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.4;
    const distance = 40 + Math.random() * 70;
    heart.animate([
      { transform: "translate(-50%, -50%) scale(0.4)", opacity: 0.9 },
      {
        transform: `translate(calc(-50% + ${Math.cos(angle) * distance}px), calc(-50% + ${Math.sin(angle) * distance}px)) scale(1.3)`,
        opacity: 0
      }
    ], { duration: 700 + Math.random() * 260, easing: "cubic-bezier(0.16, 1, 0.3, 1)", fill: "forwards" })
      .onfinish = () => heart.remove();
  }
}

function openLightbox(post, origin) {
  lastFocused = document.activeElement;
  if (origin) burstHearts(origin.x, origin.y);
  lightboxImage.src = `assets/post-${post.i}.jpg`;
  lightboxImage.alt = post.title;
  lightboxTitle.textContent = post.title;
  lightboxMeta.textContent = `${formatDate(post.date)} · ${post.type === "video" ? "Vídeo" : "Fotografia"}`;
  lightboxCaption.textContent = post.caption;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  lightbox.querySelector(".lightbox-close").focus();
}

function closeLightbox() {
  lightbox.hidden = true;
  lightboxImage.src = "";
  document.body.style.overflow = "";
  if (lastFocused) lastFocused.focus();
}

gallery.addEventListener("click", (event) => {
  const tile = event.target.closest(".post");
  if (!tile) return;
  openLightbox(posts[Number(tile.dataset.index)], { x: event.clientX, y: event.clientY });
});

lightbox.addEventListener("click", (event) => {
  if (event.target.hasAttribute("data-close")) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !lightbox.hidden) closeLightbox();
});

/* Safety: settle entrance states so content is never left hidden if animation is throttled */
window.setTimeout(() => document.body.classList.add("motion-settled"), 1400);

/* Theme */
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("paiva-theme");
if (savedTheme === "light") {
  document.documentElement.dataset.theme = "light";
  themeToggle.setAttribute("aria-pressed", "true");
}

themeToggle.addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  themeToggle.setAttribute("aria-pressed", String(next === "light"));
  localStorage.setItem("paiva-theme", next);
});

/* Reveal on scroll */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

/* Count up stats once */
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.count);
    const duration = 700;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      el.textContent = Math.round(target * progress).toString();
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    countObserver.unobserve(el);
  });
}, { threshold: 0.5 });

document.querySelectorAll("[data-count]").forEach((el) => countObserver.observe(el));

/* =========================================================================
   MOTION — integrated into the portfolio experience
   Canvas particles in the hero, staggered entrances, heart bursts, marquee.
   No external dependencies; all effects respect reduced-motion.
   ========================================================================= */
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* --- Hero particle field that reacts to the pointer --- */
const particleCanvas = document.getElementById("heroParticles");
if (particleCanvas) {
  const ctx = particleCanvas.getContext("2d");
  const stage = particleCanvas.parentElement;
  const pointer = { x: -1000, y: -1000, active: false };
  let particles = [];
  let width = 0;
  let height = 0;
  let animationId = null;
  let canvasVisible = true;

  function accentColor() {
    const styles = getComputedStyle(document.documentElement);
    return styles.getPropertyValue("--accent").trim() || "#e8704a";
  }

  function resize() {
    const rect = stage.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    particleCanvas.width = Math.round(width * dpr);
    particleCanvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.min(70, Math.max(24, Math.round((width * height) / 9000)));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      r: Math.random() * 1.8 + 0.8
    }));
    if (prefersReducedMotion) drawFrame(false);
  }

  function drawFrame(move) {
    ctx.clearRect(0, 0, width, height);
    const color = accentColor();

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      if (move) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        if (pointer.active) {
          const dx = pointer.x - p.x;
          const dy = pointer.y - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 130 && dist > 0) {
            p.x -= (dx / dist) * 0.55;
            p.y -= (dy / dist) * 0.55;
          }
        }
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.55;
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const d = Math.hypot(p.x - q.x, p.y - q.y);
        if (d < 105) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = color;
          ctx.globalAlpha = (1 - d / 105) * 0.22;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 1;
  }

  function loop() {
    drawFrame(true);
    animationId = requestAnimationFrame(loop);
  }

  function start() {
    if (prefersReducedMotion || animationId !== null || !canvasVisible) return;
    loop();
  }
  function stop() {
    if (animationId !== null) cancelAnimationFrame(animationId);
    animationId = null;
  }

  stage.addEventListener("pointermove", (e) => {
    const rect = stage.getBoundingClientRect();
    pointer.x = e.clientX - rect.left;
    pointer.y = e.clientY - rect.top;
    pointer.active = true;
  });
  stage.addEventListener("pointerleave", () => { pointer.active = false; });

  new IntersectionObserver((entries) => {
    canvasVisible = entries[0].isIntersecting;
    canvasVisible ? start() : stop();
  }, { threshold: 0.05 }).observe(stage);

  window.addEventListener("resize", resize);
  resize();
  start();
}

/* --- Scroll progress ribbon --- */
const progressBar = document.getElementById("scrollProgress");
if (progressBar) {
  let ticking = false;
  function updateProgress() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    progressBar.style.width = `${pct}%`;
    ticking = false;
  }
  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(updateProgress);
      ticking = true;
    }
  }, { passive: true });
  updateProgress();
}

/* --- Apple-like compact glass header on scroll --- */
const siteHeader = document.getElementById("siteHeader");
if (siteHeader) {
  let headerTick = false;
  function updateHeader() {
    siteHeader.classList.toggle("is-scrolled", window.scrollY > 24);
    headerTick = false;
  }
  window.addEventListener("scroll", () => {
    if (!headerTick) {
      requestAnimationFrame(updateHeader);
      headerTick = true;
    }
  }, { passive: true });
  updateHeader();
}

/* --- Subtle scroll parallax for the hero photograph --- */
if (!prefersReducedMotion) {
  const parallaxEls = [...document.querySelectorAll("[data-parallax]")];
  if (parallaxEls.length) {
    let parallaxTick = false;
    function updateParallax() {
      const vh = window.innerHeight;
      parallaxEls.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < -120 || rect.top > vh + 120) return;
        const speed = parseFloat(el.dataset.parallax) || 0.08;
        const distance = rect.top + rect.height / 2 - vh / 2;
        el.style.transform = `translate3d(0, ${(distance * speed).toFixed(1)}px, 0)`;
      });
      parallaxTick = false;
    }
    window.addEventListener("scroll", () => {
      if (!parallaxTick) {
        requestAnimationFrame(updateParallax);
        parallaxTick = true;
      }
    }, { passive: true });
    window.addEventListener("resize", updateParallax);
    updateParallax();
  }
}
