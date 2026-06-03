// ==========================================
// PRELOADER
// ==========================================
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  setTimeout(() => {
    preloader.style.opacity = "0";
    setTimeout(() => {
      preloader.style.display = "none";
    }, 1000);
  }, 2500);
});

// ==========================================
// SIDEBAR
// ==========================================
const menuBtn       = document.getElementById("menuBtn");
const sidebar       = document.getElementById("sidebar");
const sidebarClose  = document.getElementById("sidebarClose");
const sidebarOverlay = document.getElementById("sidebarOverlay");

function openSidebar() {
  sidebar.classList.add("open");
  sidebarOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
  menuBtn.innerHTML = '✕';
}

function closeSidebar() {
  sidebar.classList.remove("open");
  sidebarOverlay.classList.remove("active");
  document.body.style.overflow = "";
  menuBtn.innerHTML = '☰';
}

menuBtn.addEventListener("click", () => {
  sidebar.classList.contains("open") ? closeSidebar() : openSidebar();
});

sidebarClose.addEventListener("click", closeSidebar);
sidebarOverlay.addEventListener("click", closeSidebar);

// Close sidebar on ESC key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeSidebar();
});

// ==========================================
// SIDEBAR ACCORDION (Sub-menus)
// ==========================================
document.querySelectorAll(".sidebar-toggle-link").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const parentItem = link.closest(".sidebar-item");
    const isOpen = parentItem.classList.contains("open");

    // Close all open items
    document.querySelectorAll(".sidebar-item.open").forEach(item => {
      item.classList.remove("open");
    });

    // Open clicked one (toggle)
    if (!isOpen) {
      parentItem.classList.add("open");
    }
  });
});

// Close sidebar when a non-toggle link is clicked
document.querySelectorAll(".sidebar-nav .sidebar-link:not(.sidebar-toggle-link), .sidebar-sub a").forEach(link => {
  link.addEventListener("click", closeSidebar);
});

// ==========================================
// HEADER SCROLL EFFECT
// ==========================================
const header = document.getElementById("mainHeader");

window.addEventListener("scroll", () => {
  if (window.scrollY > 80) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// ==========================================
// SCROLL PROGRESS BAR
// ==========================================
window.addEventListener("scroll", () => {
  const scrollTop    = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const progress     = (scrollTop / scrollHeight) * 100;
  document.getElementById("progressBar").style.width = progress + "%";
});

// ==========================================
// COUNTER ANIMATION
// ==========================================
const counters = document.querySelectorAll(".counter");
let counterStarted = false;

function startCounters() {
  counters.forEach(counter => {
    const target = +counter.getAttribute("data-target");
    let count    = 0;
    const speed  = target / 120;

    const updateCounter = () => {
      count += speed;
      if (count < target) {
        counter.innerText = Math.floor(count);
        requestAnimationFrame(updateCounter);
      } else {
        counter.innerText = target + "+";
      }
    };

    updateCounter();
  });
}

window.addEventListener("scroll", () => {
  const counterSection = document.querySelector(".counter-section");
  if (!counterSection || counterStarted) return;

  const rect = counterSection.getBoundingClientRect();
  if (rect.top < window.innerHeight * 0.85) {
    counterStarted = true;
    startCounters();
  }
});

// ==========================================
// SCROLL REVEAL
// ==========================================
const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const trigger = window.innerHeight * 0.88;
  revealElements.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < trigger) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load",   revealOnScroll);

// ==========================================
// PARALLAX — HERO
// ==========================================
window.addEventListener("scroll", () => {
  const hero = document.querySelector(".hero");
  if (!hero) return;
  hero.style.backgroundPositionY = window.pageYOffset * 0.5 + "px";
});

// ==========================================
// PARALLAX — ADMISSION BANNER
// ==========================================
window.addEventListener("scroll", () => {
  const banner = document.querySelector(".admission-banner");
  if (!banner) return;
  banner.style.backgroundPosition = `center ${window.scrollY * 0.3}px`;
});

// ==========================================
// MOUSE GLOW
// ==========================================
const glow = document.getElementById("mouseGlow");

document.addEventListener("mousemove", (e) => {
  glow.style.left = e.clientX + "px";
  glow.style.top  = e.clientY + "px";
});

// ==========================================
// FLOATING CIRCLES — STAGGER DELAY
// ==========================================
document.querySelectorAll(".circle:not(.center-logo)").forEach((circle, index) => {
  circle.style.animationDelay = `${index * 0.6}s`;
});

// ==========================================
// IMAGE HOVER ZOOM (circle images)
// ==========================================
document.querySelectorAll(".circle img").forEach(img => {
  img.addEventListener("mouseenter", () => {
    img.style.transform  = "scale(1.14)";
    img.style.transition = "0.6s";
  });
  img.addEventListener("mouseleave", () => {
    img.style.transform = "scale(1)";
  });
});

// ==========================================
// BACK TO TOP
// ==========================================
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ==========================================
// SMOOTH SCROLL — ANCHOR LINKS
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href === "#") return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// ==========================================
// RANDOM FLOATING SHAPES
// ==========================================
for (let i = 0; i < 10; i++) {
  const shape = document.createElement("span");
  shape.classList.add("floating-shape");
  shape.style.left            = Math.random() * 100 + "%";
  shape.style.animationDuration = (6 + Math.random() * 10) + "s";
  shape.style.animationDelay  = (Math.random() * 5) + "s";
  document.body.appendChild(shape);
}

const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {

    reveals.forEach((item) => {

        const top = item.getBoundingClientRect().top;

        if(top < window.innerHeight - 100){

            item.classList.add("active");

        }

    });

});