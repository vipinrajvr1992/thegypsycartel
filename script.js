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

/* =========================================================
   ✅ GYPSY CARTEL — FLOATING CHAT ENGINE (FINAL MASTER LOCK)

   FIXED FOREVER:
   ✅ WhatsApp Official Icon PERFECT (Real Logo)
   ✅ No Green Bug / No Wrong Shape
   ✅ Zoho Compact Box Always
   ✅ Mobile Send Button Never Blocked
   ✅ Default Close Hidden Fully
   ✅ Custom Premium X Button (CSS Controlled)
   ✅ Floating Icons Hide When Chat Opens
   ✅ Tap X → Closes Smooth + Proper
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

    /* ✅ Hard Size Lock */
    waBtn.style.width = "58px";
    waBtn.style.height = "58px";

/* ✅ REAL OFFICIAL WHATSAPP ICON (ORIGINAL PERFECT) */
waBtn.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg"
       viewBox="0 0 32 32"
       width="30"
       height="30"
       style="display:block;">

    <!-- OUTER WHATSAPP BUBBLE -->
    <path fill="white"
      d="M16 2C8.27 2 2 8.27 2 16c0 2.82.74 5.47
      2.02 7.77L2 30l6.4-1.68A13.93 13.93 0 0 0
      16 30c7.73 0 14-6.27 14-14S23.73 2 16 2z"/>

    <!-- INNER PHONE SYMBOL -->
    <path fill="#25d366"
      d="M12.1 9.4c-.2-.5-.4-.43-.6-.44h-.5c-.2 0-.5.1-.7.4
      -.3.3-.9 1-.9 2.3 0 1.3 1 2.6 1.1 2.8.1.2 2 3.1 4.8 4.3
      .7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 2-1.4
      .2-.7.2-1.3.1-1.4-.1-.1-.3-.2-.6-.3
      -.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.2
      -.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1
      -.3-.2-1.2-.5-2.3-1.5-.8-.7-1.4-1.7-1.6-2
      -.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5
      .1-.2 0-.4 0-.5-.1-.2-.6-1.6-.9-2.2z"/>
  </svg>
`;
  /* =========================================
     ✅ 2. ZOHO FINAL ENGINE (LOCKED)
  ========================================= */

  function setupZohoFinal() {

    const zohoBtn = document.getElementById("zsiq_float");
    const iframe = document.getElementById("siqiframe");

    if (!zohoBtn || !iframe) return;

    /* ✅ Run Only Once */
    if (zohoBtn.dataset.locked === "true") return;
    zohoBtn.dataset.locked = "true";

    console.log("Zoho Fully Locked ✅");


    /* ✅ Compact Chat Box */
    iframe.style.setProperty("width", "340px", "important");
    iframe.style.setProperty("height", "480px", "important");
    iframe.style.setProperty("border-radius", "18px", "important");
    iframe.style.setProperty("overflow", "hidden", "important");
    iframe.style.setProperty("z-index", "999999", "important");


    /* ✅ Mobile Safe Position */
    if (window.innerWidth <= 768) {

      iframe.style.setProperty("width", "92vw", "important");
      iframe.style.setProperty("max-width", "380px", "important");

      iframe.style.setProperty("position", "fixed", "important");
      iframe.style.setProperty("bottom", "110px", "important");
      iframe.style.setProperty("right", "14px", "important");
    }


    /* ✅ Hide Default Close */
    setTimeout(() => {
      document.querySelectorAll(".win_close, .siqico-close").forEach(btn => {
        btn.style.display = "none";
      });
    }, 1400);


    /* ✅ Custom Premium Close Button */
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
      iframe.style.opacity = "1";

      xBtn.style.display = "flex";

      document.body.classList.add("siq-open");
    });


    /* ✅ Close Chat */
    xBtn.addEventListener("click", () => {

      iframe.style.opacity = "0";

      setTimeout(() => {

        iframe.style.display = "none";
        xBtn.style.display = "none";

        document.body.classList.remove("siq-open");

      }, 220);
    });
  }


  /* =========================================
     ✅ 3. OBSERVER (RUN ONCE THEN STOP)
  ========================================= */

  const observer = new MutationObserver(() => {

    setupZohoFinal();

    const zohoBtn = document.getElementById("zsiq_float");

    if (zohoBtn?.dataset.locked === "true") {
      observer.disconnect();
      console.log("Observer Stopped Forever ✅");
    }

  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

});
