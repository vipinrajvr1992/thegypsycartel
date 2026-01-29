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
   ✅ GYPSY CARTEL — CHAT ENGINE (FIXED MASTER)
   • Official WhatsApp SVG
   • Mobile Close Button TOP RIGHT (Safe)
   • Desktop Size Enforced
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  // 1. WHATSAPP FLOATING BUTTON (Top Right Float)
  if (!document.querySelector(".whatsapp-float")) {
    const waBtn = document.createElement("a");
    waBtn.className = "whatsapp-float";
    
    const phoneNumber = "918086604808"; 
    const message = "Hi Gypsy Cartel Support 👋";
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    
    waBtn.href = isMobile 
      ? `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`
      : `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      
    waBtn.target = "_blank";
    waBtn.rel = "noopener noreferrer";
    waBtn.setAttribute("aria-label", "Chat on WhatsApp");
    
    // ✅ OFFICIAL WHATSAPP SVG
    waBtn.innerHTML = `
      <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style="width: 32px; height: 32px; fill: white;">
        <path d="M16 2C8.269 2 2 8.269 2 16c0 2.476.649 4.808 1.787 6.84L2.012 29.35l6.696-1.756C10.662 28.647 13.257 29.5 16 29.5c7.731 0 14-6.269 14-14S23.731 2 16 2zm0 25.122c-2.269 0-4.434-.694-6.25-1.905l-.448-.298-3.968 1.04.88-3.868-.293-.466C4.646 20.096 3.878 18.118 3.878 16c0-6.685 5.438-12.122 12.122-12.122S28.122 9.315 28.122 16 22.685 27.122 16 27.122zm6.652-9.065c-.364-.182-2.155-1.063-2.489-1.185-.333-.121-.576-.182-.818.182-.242.364-.939 1.185-1.151 1.428-.212.242-.424.273-.788.091-1.87-.946-3.136-1.986-4.383-4.133-.157-.27-.017-.417.165-.599.163-.163.364-.424.545-.636.182-.212.242-.364.364-.606.121-.242.061-.455-.03-.636-.091-.182-.818-1.97-1.121-2.7-.294-.708-.595-.612-.818-.624-.211-.012-.454-.012-.697-.012-.242 0-.636.091-.97.455-.333.364-1.272 1.242-1.272 3.03s1.303 3.515 1.485 3.757c.182.242 2.565 3.918 6.215 5.494 2.167.936 3.012.936 4.045.727 1.033-.209 2.155-.879 2.458-1.727.303-.848.303-1.576.212-1.727-.091-.152-.333-.242-.697-.424z"/>
      </svg>`;
      
    // Premium Entrance
    waBtn.style.opacity = "0";
    waBtn.style.transform = "scale(0.85)";
    waBtn.style.transition = "none";
    document.body.appendChild(waBtn);
    setTimeout(() => {
        waBtn.style.opacity = "1";
        waBtn.style.transform = "scale(1)";
        waBtn.style.transition = "all 0.45s ease";
    }, 400);
  }

  // 2. PREMIUM ANIMATION ENTRANCE HELPER
  function premiumEntrance(el) {
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "scale(0.85)";
    el.style.transition = "none";
    setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "scale(1)";
      el.style.transition = "all 0.45s ease";
    }, 400);
  }

  // 3. ACTIVATE ZOHO PREMIUM + FIXES
  function activateZohoPremium() {
    const zohoBtn = document.getElementById("zsiq_float");
    
    // Only animate if not already ready
    if (zohoBtn && !zohoBtn.classList.contains("zoho-ready")) {
        zohoBtn.classList.add("zoho-ready");
        premiumEntrance(zohoBtn);
    }

    // ✅ FIX: MOVE CLOSE BUTTON TO TOP RIGHT (Mobile Only)
    if (window.innerWidth <= 768) {
        const closeBtn = document.querySelector(".win_close") || 
                         document.querySelector(".siqico-close") || 
                         document.querySelector('[data-id="zsiq_float_close"]');

        if (closeBtn) {
            closeBtn.style.setProperty("position", "fixed", "important");
            closeBtn.style.setProperty("top", "20px", "important");       // SAFE TOP
            closeBtn.style.setProperty("right", "20px", "important");     // SAFE RIGHT
            closeBtn.style.setProperty("bottom", "auto", "important");    // NO BOTTOM
            closeBtn.style.setProperty("z-index", "99999999", "important");
            closeBtn.style.setProperty("background", "rgba(0,0,0,0.6)", "important");
            closeBtn.style.setProperty("border-radius", "50%", "important");
            closeBtn.style.setProperty("padding", "8px", "important");
        }
    }

    // ✅ FIX: DESKTOP SIZE
    if (window.innerWidth > 1024) {
        const iframe = document.getElementById("siqiframe");
        if (iframe) {
            iframe.style.setProperty("width", "350px", "important");
            iframe.style.setProperty("height", "500px", "important");
            iframe.style.setProperty("max-height", "500px", "important");
            iframe.style.setProperty("border-radius", "22px", "important");
        }
    }
  }

  // 4. ENGINE RUNNER (Checks every 0.5s)
  const engineInterval = setInterval(activateZohoPremium, 500);
  setTimeout(() => clearInterval(engineInterval), 30000); // Stop after 30s
});
