/* =========================================================
   GYPSY CARTEL — MASTER SCRIPT v1.0 (FINAL STABLE)
   Includes:
   - Page Load Reveal
   - Premium Physics Cursor (Old Stable Version)
   - Hover Zoom via Class
   - Apps Slider + Modal Lightbox
   - Dropdown Safe System
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     1. PREMIUM PAGE LOAD REVEAL
  ========================================================= */
  window.addEventListener("load", () => {
    document.body.classList.add("page-loaded");
  });


  /* =========================================================
     2. CUSTOM CURSOR (OLD PREMIUM PHYSICS)
  ========================================================= */
  const dot = document.querySelector(".cursor-dot");
  const outline = document.querySelector(".cursor-outline");

  if (dot && outline && window.matchMedia("(hover: hover)").matches) {

    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;

    /* Dot = Instant */
    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      dot.style.left = mouseX + "px";
      dot.style.top = mouseY + "px";
    });

    /* Outline = Smooth Follow */
    function animateCursor() {
      outlineX += (mouseX - outlineX) * 0.15;
      outlineY += (mouseY - outlineY) * 0.15;

      outline.style.left = outlineX + "px";
      outline.style.top = outlineY + "px";

      requestAnimationFrame(animateCursor);
    }
    animateCursor();


    /* =========================================================
       3. HOVER ZOOM SYSTEM (CLASS BASED)
    ========================================================= */
    const hoverTargets = document.querySelectorAll(
      "a, button, .btn, .apps-gallery-img, .gc-dropdown-selected, .gc-dropdown-list li"
    );

    hoverTargets.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        outline.classList.add("active");
      });

      el.addEventListener("mouseleave", () => {
        outline.classList.remove("active");
      });
    });

  }


  /* =========================================================
     4. PREMIUM DROPDOWN SYSTEM (LOCKED SAFE)
  ========================================================= */
  const dropdowns = document.querySelectorAll(".gc-dropdown");

  dropdowns.forEach((dropdown) => {
    const selected = dropdown.querySelector(".gc-dropdown-selected");
    const list = dropdown.querySelector(".gc-dropdown-list");
    const items = dropdown.querySelectorAll("li");

    if (!selected || !list) return;

    selected.addEventListener("click", () => {
      dropdown.classList.toggle("open");
    });

    items.forEach((item) => {
      item.addEventListener("click", () => {
        selected.textContent = item.textContent;
        dropdown.classList.remove("open");
      });
    });

    document.addEventListener("click", (e) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove("open");
      }
    });
  });


  /* =========================================================
     5. APPS SLIDER ARROWS SCROLL
  ========================================================= */
  const track = document.querySelector(".apps-gallery-track");
  const leftArrow = document.querySelector(".apps-gallery-arrow.left");
  const rightArrow = document.querySelector(".apps-gallery-arrow.right");

  if (track && leftArrow && rightArrow) {

    leftArrow.addEventListener("click", () => {
      track.scrollBy({ left: -340, behavior: "smooth" });
    });

    rightArrow.addEventListener("click", () => {
      track.scrollBy({ left: 340, behavior: "smooth" });
    });

  }


  /* =========================================================
     6. MODAL LIGHTBOX SYSTEM (FULL SAFE)
  ========================================================= */
  const modal = document.querySelector(".apps-modal");
  const modalImg = document.querySelector(".apps-modal-img");
  const closeBtn = document.querySelector(".apps-modal-close");
  const modalLeft = document.querySelector(".apps-modal-arrow.left");
  const modalRight = document.querySelector(".apps-modal-arrow.right");

  const galleryImages = document.querySelectorAll(".apps-gallery-img");

  if (modal && modalImg && galleryImages.length > 0) {

    let currentIndex = 0;

    function openModal(index) {
      currentIndex = index;
      modal.style.display = "flex";
      modalImg.src = galleryImages[currentIndex].src;
    }

    function closeModal() {
      modal.style.display = "none";
    }

    function showNext() {
      currentIndex = (currentIndex + 1) % galleryImages.length;
      modalImg.src = galleryImages[currentIndex].src;
    }

    function showPrev() {
      currentIndex =
        (currentIndex - 1 + galleryImages.length) % galleryImages.length;
      modalImg.src = galleryImages[currentIndex].src;
    }

    galleryImages.forEach((img, i) => {
      img.addEventListener("click", () => openModal(i));
    });

    if (closeBtn) closeBtn.addEventListener("click", closeModal);

    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });

    if (modalRight) modalRight.addEventListener("click", showNext);
    if (modalLeft) modalLeft.addEventListener("click", showPrev);

    document.addEventListener("keydown", (e) => {
      if (modal.style.display !== "flex") return;

      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    });
  }

});
