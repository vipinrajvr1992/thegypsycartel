/* =========================================================
   GYPSY CARTEL — GLOBAL SCRIPT (FINAL MASTER)
   ✅ Cinematic Page Load Trigger
   ✅ Cursor Engine (Physics + CSS Class Zoom)
   ✅ Apps Modal + Scroll Lock
   ✅ Studio Dropdown (Active Grey)
   ✅ Header/Footer Loader (Absolute Path Fix)
   ✅ Auto Nav Highlight (Folder Safe)
   ✅ Design Form AJAX Submit
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================
       1. PREMIUM PAGE LOAD TRIGGER
    ========================================================= */
    // Add class after short delay to trigger CSS fade-in
    setTimeout(() => {
        document.body.classList.add("page-loaded");
    }, 50);


    /* =========================================================
       2. DEVICE DETECTION (Cursor Safe)
    ========================================================= */
    const isTouchDevice =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(hover: none)").matches;


    /* =========================================================
       4. APPS GALLERY MODAL + SCROLL LOCK
    ========================================================= */
    const modal = document.getElementById("appsModal");
    const modalImg = document.getElementById("appsModalImg");
    const closeBtn = document.querySelector(".apps-modal-close");
    const galleryImages = document.querySelectorAll(".apps-gallery-img");

    let currentIndex = 0;

    if (modal && modalImg && galleryImages.length) {

        function toggleScroll(lock) {
            document.body.style.overflow = lock ? "hidden" : "";
        }

        function showImage(index) {
            currentIndex = index;
            modalImg.src = galleryImages[currentIndex].src;
            modal.style.display = "flex";
            toggleScroll(true);
        }

        function closeModal() {
            modal.style.display = "none";
            toggleScroll(false);
        }

        function nextImage() {
            currentIndex = (currentIndex + 1) % galleryImages.length;
            modalImg.src = galleryImages[currentIndex].src;
        }

        function prevImage() {
            currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
            modalImg.src = galleryImages[currentIndex].src;
        }

        // Open
        galleryImages.forEach((img, index) => {
            img.addEventListener("click", () => showImage(index));
        });

        // Close Button
        if (closeBtn) closeBtn.addEventListener("click", closeModal);

        // Background Click
        modal.addEventListener("click", (e) => {
            if (e.target === modal) closeModal();
        });

        // Arrow Buttons (Desktop)
        const leftArrow = document.querySelector('.apps-modal-arrow.left');
        const rightArrow = document.querySelector('.apps-modal-arrow.right');
        
        if (leftArrow) leftArrow.addEventListener('click', (e) => {
            e.stopPropagation(); prevImage();
        });
        if (rightArrow) rightArrow.addEventListener('click', (e) => {
            e.stopPropagation(); nextImage();
        });

        // Keyboard Nav
        document.addEventListener("keydown", (e) => {
            if (modal.style.display !== "flex") return;
            if (e.key === "Escape") closeModal();
            if (e.key === "ArrowRight") nextImage();
            if (e.key === "ArrowLeft") prevImage();
        });
    }


    /* =========================================================
       5. STUDIO CUSTOM DROPDOWN (Grey Active)
    ========================================================= */
    document.querySelectorAll(".gc-dropdown").forEach(dropdown => {
        const selectedBox = dropdown.querySelector(".gc-dropdown-selected");
        const items = dropdown.querySelectorAll("li");
        const hiddenInput = dropdown.querySelector("input[type='hidden']");

        if (!selectedBox || !hiddenInput) return;

        selectedBox.addEventListener("click", (e) => {
            e.stopPropagation();
            dropdown.classList.toggle("open");
        });

        items.forEach(item => {
            item.addEventListener("click", () => {
                selectedBox.textContent = item.textContent;
                hiddenInput.value = item.dataset.value;
                items.forEach(li => li.classList.remove("active"));
                item.classList.add("active");
                dropdown.classList.remove("open");
            });
        });

        // Close on click outside
        document.addEventListener("click", (e) => {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove("open");
            }
        });
    });


    /* =========================================================
       6. HEADER + FOOTER LOADER (ABSOLUTE PATH FIX)
    ========================================================= */
    
    /* ✅ FIX 4: Use Absolute Path for Production Domain */
    const partialsPath = "/partials/";

    /* LOAD HEADER */
    fetch(partialsPath + "header.html")
        .then(res => res.text())
        .then(html => {
            const mount = document.getElementById("site-header");
            if (mount) mount.innerHTML = html;

            /* ✅ FIX 3: Folder Safe Nav Highlight */
            let currentPath = window.location.pathname
                .replace(/\/$/, "") // remove trailing slash
                .split("/")
                .pop();
            
            if (currentPath === "" || currentPath === "index") currentPath = "home";

            document.querySelectorAll("header nav a").forEach(link => {
                if (link.dataset.nav === currentPath) {
                    link.classList.add("active");
                }
            });
        });

    /* LOAD FOOTER */
    fetch(partialsPath + "footer.html")
        .then(res => res.text())
        .then(html => {
            const mount = document.getElementById("site-footer");
            if (mount) mount.innerHTML = html;
            const year = document.getElementById("year");
            if (year) year.textContent = new Date().getFullYear();
        });


    /* =========================================================
       7. DESIGN FORM AJAX SUBMIT
    ========================================================= */
    const designForm = document.getElementById("designForm");

    if (designForm) {
        designForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const successMsg = document.getElementById("design-success");
            const submitBtn = designForm.querySelector("button");
            const originalText = submitBtn.innerText;
            const formData = new FormData(designForm);

            submitBtn.innerText = "SENDING...";

            try {
                const response = await fetch(designForm.action, {
                    method: "POST",
                    body: formData,
                    headers: { Accept: "application/json" }
                });

                if (response.ok) {
                    designForm.reset();
                    submitBtn.innerText = "SENT ✅";
                    
                    /* Show Success Message */
                    if (successMsg) {
                        successMsg.style.display = "block";
                        successMsg.style.color = "#00ff88";
                    }

                    setTimeout(() => {
                        submitBtn.innerText = originalText;
                        if (successMsg) successMsg.style.display = "none";
                    }, 4000);
                } else {
                    alert("Submission failed. Try again.");
                    submitBtn.innerText = originalText;
                }
            } catch {
                alert("Network error. Please try again.");
                submitBtn.innerText = originalText;
            }
        });
    }

});
/* =========================================================
   GYPSY CARTEL — GLOBAL PREMIUM ANIMATION ENGINE
   Paste this at the BOTTOM of script.js
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

/* =========================================
       2. GLOBAL SCROLL REVEAL SYSTEM
       Works for Text, Cards, Sections, Forms, Images
    ========================================= */

    const revealElements = document.querySelectorAll(
        ".reveal, .reveal-img, .reveal-form"
    );

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                }
            });
        },
        {
            threshold: 0.15,
        }
    );

    revealElements.forEach((el) => {
        revealObserver.observe(el);
    });


    /* =========================================
       3. PREMIUM STAGGER SUPPORT (delay-1, delay-2...)
    ========================================= */

    document.querySelectorAll(".delay-1").forEach(el => {
        el.style.transitionDelay = "0.15s";
    });

    document.querySelectorAll(".delay-2").forEach(el => {
        el.style.transitionDelay = "0.3s";
    });

    document.querySelectorAll(".delay-3").forEach(el => {
        el.style.transitionDelay = "0.45s";
    });

    document.querySelectorAll(".delay-4").forEach(el => {
        el.style.transitionDelay = "0.6s";
    });


    /* =========================================
       4. PREMIUM IMAGE LOAD FADE-IN
       (Images appear smoothly after loading)
    ========================================= */

    document.querySelectorAll("img").forEach((img) => {
        img.style.opacity = "0";
        img.style.transition = "opacity 0.8s ease";

        img.addEventListener("load", () => {
            img.style.opacity = "1";
        });

        /* If already cached */
        if (img.complete) {
            img.style.opacity = "1";
        }
    });


    /* =========================================
       5. PREMIUM BUTTON MICRO INTERACTION
       Slight press effect
    ========================================= */

    document.querySelectorAll(".btn").forEach((btn) => {
        btn.addEventListener("mousedown", () => {
            btn.style.transform = "scale(0.96)";
        });

        btn.addEventListener("mouseup", () => {
            btn.style.transform = "";
        });

        btn.addEventListener("mouseleave", () => {
            btn.style.transform = "";
        });
    });

});
/* =========================================================
   ✅ GYPSY CARTEL — FINAL MOBILE NAVBAR ENGINE (PURE)
   Auto Center + Indicator + Hamburger Drawer
   Works After Header Inject (Production Safe)
========================================================= */

function initMobileNavbar() {

  /* ✅ Run ONLY on Mobile */
  if (window.innerWidth > 768) return;

  const headerNav = document.querySelector("header nav");
  const menu = document.querySelector("header nav ul");
  const links = document.querySelectorAll("header nav a");
  const indicator = document.querySelector(".nav-indicator");
  const menuBtn = document.querySelector(".mobile-menu-btn");

  if (!headerNav || !menu || !links.length) return;

  /* =========================================
     ✅ MOVE INDICATOR PERFECT POSITION
  ========================================= */
  function moveIndicator(activeLink) {
    if (!indicator || !activeLink) return;

    const rect = activeLink.getBoundingClientRect();
    const navRect = headerNav.getBoundingClientRect();

    indicator.style.width = rect.width + "px";
    indicator.style.left = rect.left - navRect.left + "px";
  }

  /* =========================================
     ✅ AUTO CENTER ACTIVE TAB
  ========================================= */
  function centerActive(activeLink) {
    if (!activeLink) return;

    activeLink.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest"
    });
  }

  /* =========================================
     ✅ INITIAL ACTIVE LINK ON LOAD
  ========================================= */
  const active = document.querySelector("header nav a.active");

  if (active) {
    setTimeout(() => {
      moveIndicator(active);
      centerActive(active);
    }, 150);
  }

  /* =========================================
     ✅ CLICK UPDATE ACTIVE LINK
  ========================================= */
  links.forEach(link => {
    link.addEventListener("click", () => {

      links.forEach(l => l.classList.remove("active"));
      link.classList.add("active");

      moveIndicator(link);
      centerActive(link);

      /* Close Drawer After Click */
      menu.classList.remove("open");
    });
  });

  /* =========================================
     ✅ HAMBURGER TOGGLE
  ========================================= */
  if (menuBtn) {
    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      menu.classList.toggle("open");
    });
  }

  /* =========================================
     ✅ CLOSE DRAWER OUTSIDE CLICK
  ========================================= */
  document.addEventListener("click", (e) => {
    if (!headerNav.contains(e.target)) {
      menu.classList.remove("open");
    }
  });

  /* =========================================
     ✅ UPDATE INDICATOR ON RESIZE
  ========================================= */
  window.addEventListener("resize", () => {
    const activeNow = document.querySelector("header nav a.active");
    if (activeNow) moveIndicator(activeNow);
  });
}


/* =========================================================
   ✅ RUN NAVBAR AFTER HEADER LOADS (INJECT SAFE)
========================================================= */
document.addEventListener("DOMContentLoaded", () => {

  const headerMount = document.getElementById("site-header");
  if (!headerMount) return;

  const observer = new MutationObserver(() => {

    if (headerMount.querySelector("nav")) {
      initMobileNavbar();
      observer.disconnect();
    }

  });

  observer.observe(headerMount, {
    childList: true,
    subtree: true
  });

});
/* ============================================
   ✅ GLOBAL WHATSAPP FLOATING BUTTON INJECTOR
============================================ */

document.addEventListener("DOMContentLoaded", () => {

  // Prevent duplicate injection
  if (document.querySelector(".whatsapp-widget")) return;

  // Create button
  const btn = document.createElement("a");
  btn.className = "whatsapp-widget";
  btn.href = "https://wa.me/918086604808";
  btn.target = "_blank";
  btn.setAttribute("aria-label", "Chat on WhatsApp");

  // WhatsApp SVG Icon (No file needed)
  btn.innerHTML = `
    <svg viewBox="0 0 32 32">
      <path d="M19.11 17.44c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.33-.8-.71-1.34-1.58-1.5-1.85-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.44-.46-.61-.47-.16-.01-.34-.01-.52-.01s-.48.07-.73.34c-.25.27-.95.93-.95 2.27s.97 2.64 1.11 2.82c.14.18 1.9 2.9 4.6 4.07.64.28 1.14.45 1.53.58.64.2 1.22.17 1.68.1.51-.08 1.6-.65 1.82-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.32z"/>
      <path d="M16.02 3C9.39 3 4 8.38 4 15c0 2.64.87 5.08 2.34 7.05L5 29l7.17-1.88C13.98 27.7 14.98 28 16.02 28c6.63 0 12.02-5.38 12.02-12S22.65 3 16.02 3zm0 22.02c-.9 0-1.78-.23-2.57-.66l-.58-.31-4.25 1.11 1.13-4.14-.38-.61A9.92 9.92 0 0 1 6.1 15c0-5.46 4.45-9.9 9.92-9.9 5.46 0 9.92 4.44 9.92 9.9 0 5.46-4.46 9.92-9.92 9.92z"/>
    </svg>
  `;

  // Inject into site globally
  document.body.appendChild(btn);

});
