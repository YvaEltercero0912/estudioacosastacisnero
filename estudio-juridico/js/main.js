/* ==========================================================================
   main.js — Tailwind config + menu + WhatsApp
   ========================================================================== */

/* Tailwind config (debe estar antes del CDN) */
window.tailwind = window.tailwind || {};
window.tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#1173d4",
        "accent-gold": "#C5A059",
        "background-light": "#f6f7f8",
        "background-dark": "#101922",
        "navy-deep": "#0a1118"
      },
      fontFamily: {
        "display": ["Public Sans", "sans-serif"]
      }
    }
  }
};

function clean(v){ return (v || "").toString().trim(); }

document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     Menú Mobile
  ========================== */
  const btnMenu = document.getElementById("btnMenu");
  const mobileMenu = document.getElementById("mobileMenu");

  if (btnMenu && mobileMenu) {
    const toggleMenu = () => {
      const isOpen = mobileMenu.classList.toggle("is-open");
      btnMenu.setAttribute("aria-expanded", String(isOpen));
    };

    btnMenu.addEventListener("click", toggleMenu);

    mobileMenu.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        mobileMenu.classList.remove("is-open");
        btnMenu.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* =========================
     Formulario -> WhatsApp
  ========================== */
  const contacto = document.getElementById("contacto");
  if (!contacto) return;

  const form = contacto.querySelector("form");
  if (!form) return;

  const inputs = form.querySelectorAll("input");
  const textarea = form.querySelector("textarea");
  const btnEnviar = form.querySelector("button");

  // 🔧 Cambiá este número por el real:
  // Formato: 549 + código de área + número (sin 0, sin 15)
  const WHATSAPP_NUMBER = "5493510000000";

  btnEnviar.addEventListener("click", () => {
    const nombre = clean(inputs[0]?.value);
    const email = clean(inputs[1]?.value);
    const telefono = clean(inputs[2]?.value);
    const consulta = clean(textarea?.value);

    if (!nombre || !consulta) {
      alert("Completá al menos tu nombre y la consulta.");
      return;
    }

    const msg =
`Hola, quisiera hacer una consulta legal.

👤 Nombre: ${nombre}
📧 Email: ${email || "-"}
📱 Tel/WhatsApp: ${telefono || "-"}

📝 Consulta:
${consulta}

Gracias.`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  });
});
