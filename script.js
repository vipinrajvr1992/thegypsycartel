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
/* =========================================================
   GYPSY CARTEL — GLOBAL SCRIPT (FINAL MASTER)
   Includes:
   1. Page Logic (Modals, Forms, Dropdowns)
   2. Animations (Scroll Reveal, Stagger)
   3. Navigation (Mobile Drawer, Auto-Highlight)
   4. Floating Widgets (WhatsApp + Zoho Premium Fixes)
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================
       1. PREMIUM PAGE LOAD TRIGGER
    ========================================================= */
    setTimeout(() => {
        document.body.classList.add("page-loaded");
    }, 50);

    /* =========================================================
       2. DEVICE DETECTION
    ========================================================= */
    const isTouchDevice =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(hover: none)").matches;

    /* =========================================================
       3. APPS GALLERY MODAL + SCROLL LOCK
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

        galleryImages.forEach((img, index) => {
            img.addEventListener("click", () => showImage(index));
        });

        if (closeBtn) closeBtn.addEventListener("click", closeModal);

        modal.addEventListener("click", (e) => {
            if (e.target === modal) closeModal();
        });

        const leftArrow = document.querySelector('.apps-modal-arrow.left');
        const rightArrow = document.querySelector('.apps-modal-arrow.right');
        
        if (leftArrow) leftArrow.addEventListener('click', (e) => { e.stopPropagation(); prevImage(); });
        if (rightArrow) rightArrow.addEventListener('click', (e) => { e.stopPropagation(); nextImage(); });

        document.addEventListener("keydown", (e) => {
            if (modal.style.display !== "flex") return;
            if (e.key === "Escape") closeModal();
            if (e.key === "ArrowRight") nextImage();
            if (e.key === "ArrowLeft") prevImage();
        });
    }

    /* =========================================================
       4. STUDIO CUSTOM DROPDOWN (Grey Active)
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

        document.addEventListener("click", (e) => {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove("open");
            }
        });
    });

    /* =========================================================
       5. DESIGN FORM AJAX SUBMIT
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
   ANIMATION ENGINE (Scroll Reveal & Interactions)
========================================================= */
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. SCROLL REVEAL
    const revealElements = document.querySelectorAll(".reveal, .reveal-img, .reveal-form");
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach((el) => revealObserver.observe(el));

    // 2. STAGGER DELAYS
    document.querySelectorAll(".delay-1").forEach(el => el.style.transitionDelay = "0.15s");
    document.querySelectorAll(".delay-2").forEach(el => el.style.transitionDelay = "0.3s");
    document.querySelectorAll(".delay-3").forEach(el => el.style.transitionDelay = "0.45s");
    document.querySelectorAll(".delay-4").forEach(el => el.style.transitionDelay = "0.6s");

    // 3. IMAGE LOAD FADE-IN
    document.querySelectorAll("img").forEach((img) => {
        img.style.opacity = "0";
        img.style.transition = "opacity 0.8s ease";
        img.addEventListener("load", () => { img.style.opacity = "1"; });
        if (img.complete) img.style.opacity = "1";
    });

    // 4. BUTTON MICRO INTERACTION
    document.querySelectorAll(".btn").forEach((btn) => {
        btn.addEventListener("mousedown", () => { btn.style.transform = "scale(0.96)"; });
        btn.addEventListener("mouseup", () => { btn.style.transform = ""; });
        btn.addEventListener("mouseleave", () => { btn.style.transform = ""; });
    });
});

/* =========================================================
   MOBILE NAVBAR ENGINE & HEADER LOADER
========================================================= */

function initMobileNavbar() {
  if (window.innerWidth > 768) return;

  const headerNav = document.querySelector("header nav");
  const menu = document.querySelector("header nav ul");
  const links = document.querySelectorAll("header nav a");
  const indicator = document.querySelector(".nav-indicator");
  const menuBtn = document.querySelector(".mobile-menu-btn");

  if (!headerNav || !menu || !links.length) return;

  function moveIndicator(activeLink) {
    if (!indicator || !activeLink) return;
    const rect = activeLink.getBoundingClientRect();
    const navRect = headerNav.getBoundingClientRect();
    indicator.style.width = rect.width + "px";
    indicator.style.left = rect.left - navRect.left + "px";
  }

  function centerActive(activeLink) {
    if (!activeLink) return;
    activeLink.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }

  const active = document.querySelector("header nav a.active");
  if (active) {
    setTimeout(() => { moveIndicator(active); centerActive(active); }, 150);
  }

  links.forEach(link => {
    link.addEventListener("click", () => {
      links.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
      moveIndicator(link);
      centerActive(link);
      menu.classList.remove("open");
    });
  });

  if (menuBtn) {
    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      menu.classList.toggle("open");
    });
  }

  document.addEventListener("click", (e) => {
    if (!headerNav.contains(e.target)) {
      menu.classList.remove("open");
    }
  });

  window.addEventListener("resize", () => {
    const activeNow = document.querySelector("header nav a.active");
    if (activeNow) moveIndicator(activeNow);
  });
}

// HEADER & FOOTER INJECTOR
document.addEventListener("DOMContentLoaded", () => {
    const partialsPath = "/partials/";

    /* Load Header */
    fetch(partialsPath + "header.html")
        .then(res => res.text())
        .then(html => {
            const mount = document.getElementById("site-header");
            if (mount) {
                mount.innerHTML = html;
                
                // Active Link Logic
                let currentPath = window.location.pathname.replace(/\/$/, "").split("/").pop();
                if (currentPath === "" || currentPath === "index") currentPath = "home";
                document.querySelectorAll("header nav a").forEach(link => {
                    if (link.dataset.nav === currentPath) link.classList.add("active");
                });

                // Init Navbar
                initMobileNavbar();
            }
        });

    /* Load Footer */
    fetch(partialsPath + "footer.html")
        .then(res => res.text())
        .then(html => {
            const mount = document.getElementById("site-footer");
            if (mount) mount.innerHTML = html;
            const year = document.getElementById("year");
            if (year) year.textContent = new Date().getFullYear();
        });
});
/* =========================================================
   ✅ GYPSY CARTEL — FLOATING CHAT ENGINE (FINAL MASTER LOCK)

   FIXED FOREVER:
   ✅ WhatsApp Official Icon = REAL ORIGINAL LOGO
   ✅ Tooltip Works Properly
   ✅ Zoho Compact Box Always
   ✅ Mobile Send Button Never Blocked
   ✅ Default Close Hidden Fully
   ✅ Custom Premium X Button Perfect
   ✅ Floating Icons Hide When Chat Opens
   ✅ Observer Stops After Setup (No Loop)
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================
     ✅ 1. WHATSAPP FLOAT BUTTON (ONLY ONCE)
  ========================================= */

  if (!document.querySelector(".whatsapp-float")) {

    const phoneNumber = "918086604808";
    const message = "Hi Gypsy Cartel Support 👋";

    const isMobile =
      /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    const waLink = isMobile
      ? `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`
      : `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    const waBtn = document.createElement("a");
    waBtn.className = "whatsapp-float";
    waBtn.href = waLink;
    waBtn.target = "_blank";
    waBtn.rel = "noopener noreferrer";

    /* ✅ Tooltip Text */
    waBtn.setAttribute("aria-label", "Connect Now");

    /* ✅ Hard Size Lock */
    waBtn.style.width = "58px";
    waBtn.style.height = "58px";

    /* ✅ REAL OFFICIAL WHATSAPP LOGO (ORIGINAL) */
    waBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg"
           viewBox="0 0 512 512"
           width="30"
           height="30"
           style="display:block;">

        <!-- Official WhatsApp White Icon -->
        <path fill="white"
          d="M256.06 32C132.29 32 32 132.29 32 256c0 45.11 13.18
          87.18 35.85 122.57L32 480l104.93-34.51C172.69 467.1
          213.42 480 256.06 480 379.71 480 480 379.71 480 256
          480 132.29 379.71 32 256.06 32zm123.28 334.49
          c-5.12 14.4-25.6 26.37-35.2 27.84-9.12 1.44-20.48
          2.05-33.02-1.47-7.68-2.05-17.41-5.63-29.82-10.88
          -52.22-22.4-86.27-77.06-88.96-80.77-2.69-3.71
          -21.25-28.29-21.25-53.82 0-25.6 13.44-38.14
          18.24-43.39 4.8-5.25 10.5-6.53 14.02-6.53
          3.52 0 7.17.06 10.3.19 3.33.13 7.81-1.28
          12.22 9.28 5.12 12.29 17.41 42.5 18.94 45.57
          1.54 3.07 2.56 6.66.51 10.75-2.05 4.1-3.07
          6.66-6.14 10.24-3.07 3.58-6.4 8.06-9.15
          10.82-3.07 3.07-6.27 6.4-.96 12.54
          5.31 6.14 23.55 38.78 50.56 62.85
          34.69 30.91 63.94 40.51 73.22 45.06
          9.28 4.61 14.72 3.84 20.1-2.3
          5.38-6.14 23.04-26.88 29.18-36.16
          6.14-9.28 12.29-7.68 20.48-4.61
          8.19 3.07 52.22 24.58 61.18 29.06
          8.96 4.48 14.91 6.66 17.09 10.3
          2.18 3.65 2.18 21.12-2.94 35.52z"/>
      </svg>
    `;

    document.body.appendChild(waBtn);
  }


  /* =========================================
     ✅ 2. ZOHO FINAL ENGINE (LOCKED)
  ========================================= */

  function setupZohoFinal() {

    const zohoBtn = document.getElementById("zsiq_float");
    const iframe = document.getElementById("siqiframe");

    if (!zohoBtn || !iframe) return;

    if (zohoBtn.dataset.locked === "true") return;
    zohoBtn.dataset.locked = "true";

    console.log("Zoho Fully Locked ✅");

    /* ✅ Compact Box */
    iframe.style.setProperty("width", "340px", "important");
    iframe.style.setProperty("height", "480px", "important");
    iframe.style.setProperty("border-radius", "18px", "important");
    iframe.style.setProperty("overflow", "hidden", "important");

    /* ✅ Mobile Safe */
    if (window.innerWidth <= 768) {
      iframe.style.setProperty("width", "92vw", "important");
      iframe.style.setProperty("max-width", "380px", "important");
      iframe.style.setProperty("bottom", "110px", "important");
      iframe.style.setProperty("right", "14px", "important");
    }

    /* ✅ Hide Default Close */
    setTimeout(() => {
      document.querySelectorAll(".win_close, .siqico-close")
        .forEach(btn => btn.style.display = "none");
    }, 1200);

    /* ✅ Custom Close Button */
    let xBtn = document.querySelector(".zoho-custom-close");

    if (!xBtn) {
      xBtn = document.createElement("div");
      xBtn.className = "zoho-custom-close";
      xBtn.innerHTML = "✕";
      document.body.appendChild(xBtn);
    }

    /* ✅ Open Chat */
    zohoBtn.addEventListener("click", () => {
      iframe.style.display = "block";
      xBtn.style.display = "flex";
      document.body.classList.add("siq-open");
    });

    /* ✅ Close Chat */
    xBtn.addEventListener("click", () => {
      iframe.style.display = "none";
      xBtn.style.display = "none";
      document.body.classList.remove("siq-open");
    });
  }


  /* =========================================
     ✅ 3. OBSERVER (STOPS FOREVER)
  ========================================= */

  const observer = new MutationObserver(() => {

    setupZohoFinal();

    if (document.getElementById("zsiq_float")?.dataset.locked === "true") {
      observer.disconnect();
      console.log("Observer Stopped Forever ✅");
    }

  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

});
