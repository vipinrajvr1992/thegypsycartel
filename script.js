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

    /* ✅ Tooltip */
    waBtn.setAttribute("aria-label", "Connect Now");

    /* ✅ Hard Size Lock */
    waBtn.style.width = "58px";
    waBtn.style.height = "58px";

    /* ✅ REAL OFFICIAL WHATSAPP LOGO — PERFECT */
    waBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg"
           viewBox="0 0 448 512"
           width="30"
           height="30"
           style="display:block;">
        <path fill="white"
          d="M380.9 97.1C339-6.1 215.6-36.6 121.4 5.3
          27.1 47.3-6.5 168.6 35.4 262.9c14.5 32.6
          38.5 60.6 69.2 80.5L32 480l142.2-37.4
          c96.4 33.4 201.4-15.3 236.7-108.9
          17.2-45.3 16.4-95.5-2.2-140.9zM224 438.6
          c-31.3 0-62-8.4-88.8-24.3l-6.4-3.8-84.4
          22.2 22.5-82.1-4.1-6.7c-54.4-88.6-26.7
          -203.6 61.9-258 88.6-54.4 203.6-26.7
          258 61.9 26.2 42.7 33.6 93.6 20.6
          142.1-23.4 87.6-102.8 148.7-197.3
          148.7zm101.1-138.6c-5.5-2.7-32.7-16.1
          -37.8-17.9-5.1-1.9-8.8-2.7-12.5
          2.7-3.7 5.5-14.4 17.9-17.7 21.6
          -3.3 3.7-6.6 4.1-12.1 1.4-32.7
          -16.4-54.1-29.4-75.6-66.5-5.7
          -9.8 5.7-9.1 16.4-30.3 1.8-3.7
          .9-6.8-.5-9.5-1.4-2.7-12.5-30.2
          -17.1-41.3-4.6-11.1-9.3-9.6-12.5
          -9.8h-10.7c-3.7 0-9.5 1.4-14.4
          6.8-5 5.5-19 18.6-19 45.3
          0 26.7 19.5 52.4 22.2 56
          2.7 3.7 38.3 58.5 92.9 82
          13 5.6 23.1 8.9 31 11.4
          13 4.1 24.8 3.5 34.1 2.1
          10.4-1.6 32.7-13.4 37.3-26.3
          4.6-12.9 4.6-24 3.2-26.3
          -1.4-2.3-5.1-3.7-10.6-6.4z"/>
      </svg>
    `;

    /* ✅ IMPORTANT: ADD BUTTON TO PAGE */
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
