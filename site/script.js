const header = document.querySelector(".site-header");
const revealItems = document.querySelectorAll(".reveal");
const scene = document.querySelector(".hero-scene");

const updateHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 18);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 },
);

revealItems.forEach((item) => revealObserver.observe(item));

if (scene && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  window.addEventListener(
    "pointermove",
    (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 14;
      const y = (event.clientY / window.innerHeight - 0.5) * 14;
      scene.style.setProperty("--tilt-x", `${x}px`);
      scene.style.setProperty("--tilt-y", `${y}px`);
      scene.animate(
        {
          transform: `translate3d(${x}px, ${y}px, 0)`,
        },
        {
          duration: 900,
          fill: "forwards",
          easing: "cubic-bezier(.2,.8,.2,1)",
        },
      );
    },
    { passive: true },
  );
}
