/* ===========================================
   GYPSY CARTEL — INSTANT PREMIUM CURSOR
=========================================== */

document.addEventListener("DOMContentLoaded", () => {

  // Create Dot + Circle
  const dot = document.createElement("div");
  dot.classList.add("cursor-dot");

  const circle = document.createElement("div");
  circle.classList.add("cursor-circle");

  document.body.appendChild(dot);
  document.body.appendChild(circle);

  // Move instantly (No smooth follow)
  window.addEventListener("mousemove", (e) => {
    dot.style.left = `${e.clientX}px`;
    dot.style.top = `${e.clientY}px`;

    circle.style.left = `${e.clientX}px`;
    circle.style.top = `${e.clientY}px`;
  });

  // Hover zoom for clickable elements
  const clickables = document.querySelectorAll(
    "a, button, .btn, .card, .clickable"
  );

  clickables.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      circle.classList.add("active");
    });

    el.addEventListener("mouseleave", () => {
      circle.classList.remove("active");
    });
  });

  // Disable cursor on mobile
  if (window.innerWidth < 768) {
    dot.remove();
    circle.remove();
    document.body.style.cursor = "auto";
  }

});
