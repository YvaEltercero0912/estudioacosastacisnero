/* ==========================================================
   effects.js — Reveal + stagger en Servicios, Áreas, Equipo, Footer
   (sin tocar HTML)
   ========================================================== */
document.addEventListener("DOMContentLoaded", () => {

  // 1) Elementos que deben “entrar” con scroll reveal
  const revealSelectors = [
    ".section-header",
    ".info-card",
    ".area-card",
    ".team-card",
    ".contact-info",
    ".contact-form-card",
    ".footer-col",
    ".footer-bottom"
  ];

  revealSelectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => el.classList.add("scroll-reveal"));
  });

  // 2) Stagger EXACTO para las 4 cards de servicios (stagger-1..4 como el original)
  const serviceCards = document.querySelectorAll("#servicios .info-card");
  serviceCards.forEach((card, idx) => {
    if (idx < 4) card.classList.add(`stagger-${idx + 1}`);
  });

  // 3) Stagger automático por índice para Áreas (6), Equipo (3) y Footer (3)
  //    -> agrega clase "stagger" al contenedor y setea --i en cada hijo reveal
  const staggerContainers = [
    ".areas-grid",
    ".team-grid",
    ".footer-container"
  ];

  staggerContainers.forEach((containerSel) => {
    document.querySelectorAll(containerSel).forEach((wrap) => {
      wrap.classList.add("stagger"); // usa la regla del CSS (delay con --i)

      const children = wrap.querySelectorAll(".scroll-reveal");
      children.forEach((el, idx) => {
        el.style.setProperty("--i", idx);
      });
    });
  });

  // 4) Observer igual al original: is-visible + playState running
  const items = document.querySelectorAll(".scroll-reveal");
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        entry.target.style.animationPlayState = "running";
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  items.forEach(el => observer.observe(el));
});


/* ==========================================================
   effects.js — Reveal EXACTO para ¿Por qué elegirnos?
   ========================================================== */
document.addEventListener("DOMContentLoaded", () => {

  const items = document.querySelectorAll("#servicios .scroll-reveal");
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        entry.target.style.animationPlayState = "running";
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach(el => observer.observe(el));
});
