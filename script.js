/* ==============================
   SMOOTH SCROLLING FOR NAV LINKS
   ============================== */
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", e => {
    const href = link.getAttribute("href");
    if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

/* ==============================
   SHRINKING NAVBAR ON SCROLL
   ============================== */
const header = document.querySelector("header") || document.querySelector(".headerVideo");

window.addEventListener("scroll", () => {
  if (header) header.classList.toggle("shrink", window.scrollY > 50);
});

/* ==============================
   ACTIVE NAV LINK ON SCROLL
   ============================== */
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.pageYOffset >= sectionTop) current = section.getAttribute("id");
  });

  navLinks.forEach(a => {
    a.classList.remove("active");
    if (a.getAttribute("href") === "#" + current) a.classList.add("active");
  });
});

/* ==============================
   SCROLL REVEAL ANIMATION
   ============================== */
const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
  revealElements.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 80) el.classList.add("show");
  });
}

window.addEventListener("scroll", revealOnScroll);

/* ==============================
   COUNTER ANIMATION
   ============================== */
const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {
  const updateCounter = () => {
    const target = +counter.getAttribute("data-target");
    const current = +counter.innerText;
    const increment = target / 120;

    if (current < target) {
      counter.innerText = Math.ceil(current + increment);
      setTimeout(updateCounter, 15);
    } else {
      counter.innerText = target;
    }
  };
  updateCounter();
});

/* ==============================
   CONTACT FORM — EmailJS
   ============================== */


const EMAILJS_SERVICE_ID  = "YOUR_SERVICE_ID";   // e.g. "service_abc123"
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";  // e.g. "template_xyz456"
const EMAILJS_PUBLIC_KEY  = "YOUR_PUBLIC_KEY";   // e.g. "aBcDeFgHiJkLmNoP"

const form = document.getElementById("contactForm");

if (form) {
  const btn         = form.querySelector("button[type=submit]");
  const originalText = btn ? btn.innerText : "Send Message";

  form.addEventListener("submit", e => {
    e.preventDefault();

    const nameField    = form.querySelector("[name=name]");
    const emailField   = form.querySelector("[name=email]");
    const messageField = form.querySelector("[name=message]");

    // ── Validation ──
    if (!nameField.value.trim() || !emailField.value.trim() || !messageField.value.trim()) {
      showFormFeedback("Please fill all fields.", "error");
      return;
    }

    if (!emailField.value.includes("@")) {
      showFormFeedback("Please enter a valid email.", "error");
      return;
    }

    // ── Send via EmailJS ──
    if (btn) {
      btn.innerText = "Sending…";
      btn.disabled  = true;
    }

    emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        from_name:  nameField.value.trim(),
        from_email: emailField.value.trim(),
        message:    messageField.value.trim(),
      },
      EMAILJS_PUBLIC_KEY
    )
    .then(() => {
      showFormFeedback("Message sent! We'll be in touch soon.", "success");
      form.reset();
    })
    .catch(err => {
      console.error("EmailJS error:", err);
      showFormFeedback("Something went wrong. Please try again.", "error");
    })
    .finally(() => {
      if (btn) {
        btn.innerText = originalText;
        btn.disabled  = false;
      }
    });
  });
}

/* Inline feedback message under the form button */
function showFormFeedback(msg, type) {
  let el = document.getElementById("formFeedback");
  if (!el) {
    el = document.createElement("p");
    el.id = "formFeedback";
    el.style.cssText = `
      margin-top: 10px;
      font-size: 13px;
      font-family: 'Cairo', sans-serif;
      font-weight: 600;
      letter-spacing: 0.5px;
      transition: opacity 0.4s ease;
    `;
    const form = document.getElementById("contactForm");
    if (form) form.appendChild(el);
  }

  el.innerText = msg;
  el.style.color   = type === "success" ? "var(--teal)" : "#c0392b";
  el.style.opacity = "1";

  // Auto-hide after 5s
  clearTimeout(el._hideTimer);
  el._hideTimer = setTimeout(() => { el.style.opacity = "0"; }, 5000);
}

/* ==============================
   WHATSAPP FLOAT BUTTON
   ============================== */
const whatsappNumber = "201273773339";
const whatsappBtn    = document.createElement("a");

whatsappBtn.href      = `https://wa.me/${whatsappNumber}`;
whatsappBtn.innerHTML = "💬";
whatsappBtn.target    = "_blank";
whatsappBtn.style.cssText = `
  position: fixed;
  bottom: 25px;
  right: 25px;
  width: 65px;
  height: 65px;
  border-radius: 50%;
  background: #25D366;
  color: white;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 25px rgba(0,0,0,0.3);
  text-decoration: none;
  z-index: 9999;
`;
document.body.appendChild(whatsappBtn);

/* ==============================
   LOADING SCREEN
   ============================== */
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.style.opacity = "0";
    setTimeout(() => loader.remove(), 600);
  }
});

/* ==============================
   SCROLL TO CONTACT BUTTON
   ============================== */
function scrollToContact() {
  const contact = document.getElementById("contact");
  if (contact) contact.scrollIntoView({ behavior: "smooth" });
}

/* ==============================
   LANGUAGE SWITCH (EN / AR)
   ============================== */
const toggle = document.getElementById("langToggle");
let currentLang = localStorage.getItem("siteLang") || "en";

applyLang(currentLang);

if (toggle) {
  toggle.addEventListener("click", () => {
    currentLang = currentLang === "en" ? "ar" : "en";
    localStorage.setItem("siteLang", currentLang);
    applyLang(currentLang);
  });
}

function applyLang(lang) {
  document.documentElement.lang = lang;
  document.documentElement.dir  = lang === "ar" ? "rtl" : "ltr";

  if (toggle) toggle.innerText = lang === "en" ? "عربي" : "English";

  document.querySelectorAll("[data-en][data-ar]").forEach(el => {
    const isPhone = el.tagName === "A" && el.getAttribute("href")?.startsWith("tel:");
    const isEmail = el.tagName === "A" && el.getAttribute("href")?.includes("mail.google.com");

    if (isPhone || isEmail) {
      // Keep phone/email text as-is; direction fixed below
    } else if (el.hasAttribute("data-en-placeholder")) {
      el.placeholder = lang === "en"
        ? el.getAttribute("data-en-placeholder")
        : el.getAttribute("data-ar-placeholder");
    } else {
      el.innerText = lang === "en"
        ? el.getAttribute("data-en")
        : el.getAttribute("data-ar");
    }
  });

  // Force LTR on numbers so digits and "+" never mirror
  document.querySelectorAll('a[href^="tel:"], a[href^="mailto:"], .counter, .projects-stat-number')
    .forEach(el => {
      el.style.direction   = "ltr";
      el.style.display     = "inline-block";
      el.style.unicodeBidi = "isolate";
    });
}

/* ==============================
   VIDEO MUTED STATE PERSISTENCE
   ============================== */
document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("projectVideo");
  if (video) {
    const saved = localStorage.getItem("projectVideoMuted");
    if (saved !== null) video.muted = saved === "true";
    video.addEventListener("volumechange", () => {
      localStorage.setItem("projectVideoMuted", video.muted);
    });
  }
});



/* ==============================
   HAMBURGER MENU
   ============================== */
(function () {
  const hamburger      = document.querySelector(".hamburger");
  const mobileNav      = document.querySelector(".mobile-nav");
  const overlay        = document.querySelector(".mobile-menu-overlay");
  const closeBtn       = document.querySelector(".mobile-nav-close");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-links a");
  const mobileLangBtn  = document.querySelector(".mobile-lang-toggle");

  if (!hamburger || !mobileNav) return; // not on a page that has the drawer

  function openMenu() {
    hamburger.classList.add("open");
    mobileNav.classList.add("open");
    overlay.classList.add("active");
    document.body.classList.add("menu-open");
    hamburger.setAttribute("aria-expanded", "true");
    mobileNav.setAttribute("aria-hidden", "false");
  }

  function closeMenu() {
    hamburger.classList.remove("open");
    mobileNav.classList.remove("open");
    overlay.classList.remove("active");
    document.body.classList.remove("menu-open");
    hamburger.setAttribute("aria-expanded", "false");
    mobileNav.setAttribute("aria-hidden", "true");
  }

  hamburger.addEventListener("click", () => {
    hamburger.classList.contains("open") ? closeMenu() : openMenu();
  });

  if (closeBtn) closeBtn.addEventListener("click", closeMenu);
  if (overlay)  overlay.addEventListener("click", closeMenu);

  mobileNavLinks.forEach(link => link.addEventListener("click", closeMenu));

  // Language toggle inside drawer mirrors the desktop button (which applyLang already handles)
  if (mobileLangBtn) {
    mobileLangBtn.addEventListener("click", () => {
      if (toggle) toggle.click();
      closeMenu();
    });
  }

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeMenu();
  });
})();

/* ==============================
   SERVICE PANELS — TOUCH / TAP
   ============================== */
(function () {
  const panels = document.querySelectorAll(".service-panel");
  if (!panels.length) return;

  // Detect touch device
  const isTouch = () => window.matchMedia("(hover: none) and (pointer: coarse)").matches;

  panels.forEach(panel => {
    panel.addEventListener("click", () => {
      if (!isTouch()) return; // desktop hover handles it

      const isOpen = panel.classList.contains("is-open");
      panels.forEach(p => p.classList.remove("is-open"));
      if (!isOpen) panel.classList.add("is-open");
    });
  });
})();


/* ==============================
   PROJECTS BG — TOUCH SCALE
   ============================== */
(function () {
  const projectsSection = document.getElementById("projects");
  if (!projectsSection) return;

  if (!window.matchMedia("(hover: none) and (pointer: coarse)").matches) return;

  projectsSection.addEventListener("click", () => {
    projectsSection.classList.toggle("is-active");
  });
})();


/* ==============================
   CARDS — TOUCH TAP
   ============================== */
(function () {
  if (!window.matchMedia("(hover: none) and (pointer: coarse)").matches) return;

  document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", () => {
      const isActive = card.classList.contains("is-active");
      // Close all cards first
      document.querySelectorAll(".card").forEach(c => c.classList.remove("is-active"));
      if (!isActive) card.classList.add("is-active");
    });
  });
})();



// FAVICON MANAGEMENT
class FaviconManager {
    constructor() {
        this.initFavicon();
    }

    // Initialize favicon on page load
    initFavicon() {
        console.log('Favicon loaded successfully');
        
        // Verify favicon file exists
        this.verifyFaviconLoaded();
    }

    // Verify favicon is loaded
    verifyFaviconLoaded() {
        const favicon = document.querySelector('link[rel="icon"]');
        if (favicon) {
            console.log('✓ Favicon is loaded:', favicon.href);
        } else {
            console.warn('⚠ Favicon not found in document head');
        }
    }

    // Optional: Change favicon dynamically
    changeFavicon(iconPath) {
        const favicon = document.querySelector('link[rel="icon"]');
        if (favicon) {
            favicon.href = iconPath;
            console.log('Favicon changed to:', iconPath);
        }
    }

    // Optional: Check if user prefers dark mode and adjust theme color
    initDarkModeTheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            const themeColor = document.querySelector('meta[name="theme-color"]');
            if (themeColor) {
                themeColor.setAttribute('content', '#1a1a1a');
                console.log('Dark mode theme color applied');
            }
        }
    }
}

// Initialize favicon when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const faviconManager = new FaviconManager();
    faviconManager.initDarkModeTheme();
});
// END FAVICON MANAGEMENT