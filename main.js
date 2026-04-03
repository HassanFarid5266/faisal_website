// Nav scroll
const nav = document.getElementById("navbar");
window.addEventListener(
  "scroll",
  () => nav.classList.toggle("scrolled", scrollY > 40),
  { passive: true },
);

// Hamburger
const ham = document.getElementById("ham");
const mob = document.getElementById("mobNav");
ham.addEventListener("click", () => {
  ham.classList.toggle("open");
  mob.classList.toggle("open");
});
mob.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    mob.classList.remove("open");
    ham.classList.remove("open");
  }),
);

// Scroll reveal
const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("v");
    });
  },
  { threshold: 0.1 },
);
document.querySelectorAll(".r").forEach((el) => obs.observe(el));

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});
