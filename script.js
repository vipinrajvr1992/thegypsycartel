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
   ✅ GYPSY CARTEL — FLOATING CHAT ENGINE (CONTROL DOCK V1)

   UPDATES:
   ✅ NEW "Control Dock" at TOP of screen (Safe from keyboard)
   ✅ 3 Buttons: Minimize (-), Full Screen (⛶), Close (X)
   ✅ Mobile & Desktop Compatible
   ✅ WhatsApp Icon: Official SVG
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       ✅ 1. WHATSAPP FLOAT BUTTON
    ========================================= */
    if (!document.querySelector(".whatsapp-float")) {
        const phoneNumber = "918086604808";
        const message = "Hi Gypsy Cartel Support 👋";
        const isDeviceMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
        
        const waLink = isDeviceMobile
            ? `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`
            : `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

        const waBtn = document.createElement("a");
        waBtn.className = "whatsapp-float";
        waBtn.href = waLink;
        waBtn.target = "_blank";
        waBtn.rel = "noopener noreferrer";
        waBtn.setAttribute("aria-label", "Connect Now");

        /* Hard Size Lock */
        waBtn.style.width = "58px";
        waBtn.style.height = "58px";
        
        /* Official WhatsApp Icon */
        waBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="35" height="35" fill="white" style="display:block; margin: auto; padding-top: 0px;">
          <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
        </svg>`;
        document.body.appendChild(waBtn);
    }

    /* =========================================
       ✅ 2. ZOHO CHAT ENGINE & CONTROL DOCK
    ========================================= */
    function setupZohoFinal() {
        const zohoBtn = document.getElementById("zsiq_float");
        const iframe = document.getElementById("siqiframe");

        if (!zohoBtn || !iframe) return;
        if (zohoBtn.dataset.locked === "true") return;

        zohoBtn.dataset.locked = "true";
        console.log("Zoho Fully Locked with Control Dock ✅");

        /* --- IFRAME SETUP --- */
        iframe.style.setProperty("border-radius", "18px", "important");
        iframe.style.setProperty("overflow", "hidden", "important");

        // Inject Styles for Dock (So you don't need CSS file)
        const style = document.createElement('style');
        style.innerHTML = `
          .win_close, .siqico-close { display: none !important; }
          .zoho-control-dock {
              position: fixed;
              top: 15px; 
              right: 15px;
              z-index: 2147483647; /* Maximum Layer */
              background: #000;
              border-radius: 50px;
              display: none; /* Hidden by default */
              align-items: center;
              padding: 8px 18px;
              gap: 20px;
              box-shadow: 0 4px 15px rgba(0,0,0,0.4);
          }
          .zoho-control-btn {
              color: white;
              font-size: 20px;
              cursor: pointer;
              font-family: sans-serif;
              font-weight: bold;
              line-height: 1;
              user-select: none;
              transition: opacity 0.2s;
          }
          .zoho-control-btn:hover { opacity: 0.7; }
        `;
        document.head.appendChild(style);


        /* --- CREATE CONTROL DOCK (3 BUTTONS) --- */
        let dock = document.createElement("div");
        dock.className = "zoho-control-dock";
        dock.innerHTML = `
          <div class="zoho-control-btn" id="zoho-min" title="Minimize">−</div>
          <div class="zoho-control-btn" id="zoho-full" title="Full Screen">⛶</div>
          <div class="zoho-control-btn" id="zoho-close" title="Close">✕</div>
        `;
        document.body.appendChild(dock);

        /* --- BUTTON LOGIC --- */
        const btnMin = document.getElementById("zoho-min");
        const btnFull = document.getElementById("zoho-full");
        const btnClose = document.getElementById("zoho-close");

        // Helper: Close Chat
        const closeChat = () => {
            iframe.style.display = "none";
            dock.style.display = "none";
            document.body.classList.remove("siq-open");
        };

        // 1. MINIMIZE
        btnMin.onclick = closeChat;

        // 2. CLOSE
        btnClose.onclick = closeChat;

        // 3. FULL SCREEN (Toggle)
        let isFull = false;
        btnFull.onclick = () => {
            isFull = !isFull;
            if (isFull) {
                iframe.style.setProperty("width", "100%", "important");
                iframe.style.setProperty("height", "100%", "important");
                iframe.style.setProperty("top", "0", "important");
                iframe.style.setProperty("left", "0", "important");
                iframe.style.setProperty("right", "0", "important");
                iframe.style.setProperty("bottom", "0", "important");
                iframe.style.setProperty("border-radius", "0", "important");
            } else {
                // Reset to default
                applyResponsiveStyles();
            }
        };

        /* --- RESPONSIVE STYLES --- */
        function applyResponsiveStyles() {
            if (window.innerWidth <= 768) {
                // Mobile: Default to full screen but leave top space for dock
                iframe.style.setProperty("width", "100%", "important");
                iframe.style.setProperty("height", "100%", "important");
                iframe.style.setProperty("top", "0px", "important");
                iframe.style.setProperty("left", "0px", "important");
                iframe.style.setProperty("right", "0px", "important");
                iframe.style.setProperty("bottom", "0px", "important");
                iframe.style.setProperty("border-radius", "0px", "important");
            } else {
                // Desktop: Compact Box
                iframe.style.setProperty("width", "340px", "important");
                iframe.style.setProperty("height", "480px", "important");
                iframe.style.setProperty("bottom", "100px", "important");
                iframe.style.setProperty("right", "20px", "important");
                iframe.style.setProperty("top", "auto", "important");
                iframe.style.setProperty("left", "auto", "important");
                iframe.style.setProperty("border-radius", "18px", "important");
            }
        }

        applyResponsiveStyles(); // Apply on load

        /* --- OPEN EVENTS --- */
        zohoBtn.addEventListener("click", () => {
            iframe.style.display = "block";
            dock.style.display = "flex"; // Show Control Dock
            document.body.classList.add("siq-open");
            applyResponsiveStyles();
        });

    }

    /* =========================================
       ✅ 3. OBSERVER
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
