"use strict";

document.documentElement.classList.add("js");

const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".primary-nav");
const navLinks = [...document.querySelectorAll(".nav-link")];
const railLinks = [...document.querySelectorAll(".rail-link")];
const revealElements = [...document.querySelectorAll(".reveal")];
const currentYear = document.querySelector("#current-year");
const progressBar = document.querySelector(".scroll-progress span");
const portrait = document.querySelector(".portrait-card");
const heroCode = document.querySelector(".hero-code-window");
const heroOrbs = [...document.querySelectorAll(".orb")];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (currentYear) currentYear.textContent = new Date().getFullYear();

function setMenuState(isOpen) {
  if (!menuToggle || !navigation) return;
  menuToggle.classList.toggle("is-open", isOpen);
  navigation.classList.toggle("is-open", isOpen);
  document.body.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
}

menuToggle?.addEventListener("click", () => {
  setMenuState(!navigation.classList.contains("is-open"));
});

[...navLinks, ...railLinks].forEach((link) => link.addEventListener("click", () => setMenuState(false)));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenuState(false);
});

function setActiveSection(id) {
  const href = `#${id}`;
  navLinks.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === href));
  railLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === href;
    link.classList.toggle("active", isActive);
    if (isActive) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
}

const initialSection = window.location.hash.slice(1) || "home";
setActiveSection(initialSection);
window.addEventListener("hashchange", () => setActiveSection(window.location.hash.slice(1) || "home"));

function updateScrollEffects() {
  const scrollY = window.scrollY;
  const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
  const progress = Math.min(scrollY / maxScroll, 1);
  const heroProgress = Math.min(scrollY / Math.max(window.innerHeight * .82, 1), 1);

  header?.classList.toggle("is-scrolled", scrollY > 10);
  if (progressBar) progressBar.style.transform = `scaleX(${progress})`;

  if (!reduceMotion.matches) {
    portrait?.style.setProperty("--portrait-shift", `${Math.round(heroProgress * -56)}px`);
    heroCode?.style.setProperty("--code-shift", `${Math.round(heroProgress * 34)}px`);
    heroOrbs.forEach((orb, index) => {
      const direction = index % 2 === 0 ? 1 : -1;
      orb.style.setProperty("--orb-shift", `${Math.round(heroProgress * 46 * direction)}px`);
    });
  }
}

let scrollTicking = false;
window.addEventListener("scroll", () => {
  if (scrollTicking) return;
  scrollTicking = true;
  window.requestAnimationFrame(() => {
    updateScrollEffects();
    scrollTicking = false;
  });
}, { passive: true });

window.addEventListener("resize", updateScrollEffects, { passive: true });
reduceMotion.addEventListener?.("change", updateScrollEffects);
updateScrollEffects();

revealElements.forEach((element, index) => {
  element.style.setProperty("--reveal-delay", `${(index % 4) * 65}ms`);
});

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -7% 0px" }
  );
  revealElements.forEach((element) => revealObserver.observe(element));

  const sections = [...document.querySelectorAll("main section[id]")];
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visibleEntries = entries.filter((entry) => entry.isIntersecting);
      if (!visibleEntries.length) return;
      const activeEntry = [...visibleEntries].sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (activeEntry) setActiveSection(activeEntry.target.id);
    },
    { rootMargin: "-32% 0px -56% 0px", threshold: [0, .15, .45] }
  );
  sections.forEach((section) => sectionObserver.observe(section));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

const dialogs = [...document.querySelectorAll(".project-dialog")];
document.querySelectorAll("[data-modal-target]").forEach((button) => {
  button.addEventListener("click", () => {
    const dialog = document.getElementById(button.dataset.modalTarget);
    if (dialog?.showModal) dialog.showModal();
  });
});

dialogs.forEach((dialog) => {
  dialog.querySelector(".dialog-close")?.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    const bounds = dialog.getBoundingClientRect();
    const clickedBackdrop = event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
    if (clickedBackdrop) dialog.close();
  });
});
