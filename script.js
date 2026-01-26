/* =========================================================
   GYPSY CARTEL — GLOBAL SCRIPT (FINAL MASTER)
   Version: 4.0 Production
   • Physics Cursor (Desktop) / Disabled (Mobile)
   • Apps Gallery Modal (Premium)
   • Studio Dropdown (Grey Logic)
   • Global Header/Footer Loader
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================
       1. DEVICE DETECTION (Mobile Check)
       (Disables custom cursor logic on Touch devices)
    ========================================================= */
    const isTouchDevice = 
        "ontouchstart" in window || 
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(hover: none)").matches;


    /* =========================================================
       2. PHYSICS CURSOR ENGINE (Desktop Only)
       (Uses Linear Interpolation for smooth "magnetic" lag)
    ========================================================= */
    const cursorDot = document.querySelector(".cursor-dot");
    const cursorOutline = document.querySelector(".cursor-outline");

    // Physics Variables
    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;

    // Only run if Desktop AND elements exist
    if (!isTouchDevice && cursorDot && cursorOutline) {

        // A. Track Mouse Position (Instant)
        window.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Dot moves instantly
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
            
            // Ensure visibility
            cursorDot.style.opacity = 1;
            cursorOutline.style.opacity = 1;
        });

        // B. Physics Loop (The Smooth Follow Effect)
        const animateCursor = () => {
            // Calculate distance
            let distX = mouseX - outlineX;
            let distY = mouseY - outlineY;

            // Move outline towards mouse (0.15 = Speed/Smoothness factor)
            outlineX += distX * 0.15; 
            outlineY += distY * 0.15;

            // Apply Position
            cursorOutline.style.left = `${outlineX}px`;
            cursorOutline.style.top = `${outlineY}px`;

            // Loop
            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        // C. Smart Input Detection (Hide cursor when typing)
        document.querySelectorAll("input, textarea, select, label").forEach(el => {
            el.addEventListener("mouseenter", () => {
                cursorDot.style.opacity = 0;
                cursorOutline.style.opacity = 0;
            });
            el.addEventListener("mouseleave", () => {
                cursorDot.style.opacity = 1;
                cursorOutline.style.opacity = 1;
            });
        });

        // D. Interactive Hover (Scale up on links)
        document.querySelectorAll("a, button, .btn, .apps-gallery-img").forEach(el => {
            el.addEventListener("mouseenter", () => {
                cursorOutline.style.transform = "translate(-50%, -50%) scale(1.5)";
                cursorOutline.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
            });
            el.addEventListener("mouseleave", () => {
                cursorOutline.style.transform = "translate(-50%, -50%) scale(1)";
                cursorOutline.style.backgroundColor = "transparent";
            });
        });

    } else {
        // Mobile Fallback: Hide Custom, Show System
        if (cursorDot) cursorDot.style.display = "none";
        if (cursorOutline) cursorOutline.style.display = "none";
        document.body.style.cursor = "auto";
    }


    /* =========================================================
       3. APPS GALLERY MODAL (Premium Lightbox)
    ========================================================= */
    const modal = document.getElementById("appsModal");
    const modalImg = document.getElementById("appsModalImg");
    const closeBtn = document.querySelector(".apps-modal-close");
    const galleryImages = document.querySelectorAll(".apps-gallery-img");

    let currentIndex = 0;

    if (modal && modalImg && galleryImages.length) {

        function showImage(index) {
            currentIndex = index;
            modalImg.src = galleryImages[currentIndex].src;
            modal.style.display = "flex";
        }

        function nextImage() {
            currentIndex = (currentIndex + 1) % galleryImages.length;
            modalImg.src = galleryImages[currentIndex].src;
        }

        function prevImage() {
            currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
            modalImg.src = galleryImages[currentIndex].src;
        }

        // Open Click
        galleryImages.forEach((img, index) => {
            img.addEventListener("click", () => showImage(index));
        });

        // Close Click
        if (closeBtn) {
            closeBtn.addEventListener("click", () => {
                modal.style.display = "none";
            });
        }

        // Background Click Close
        modal.addEventListener("click", (e) => {
            if (e.target === modal) modal.style.display = "none";
        });

        // Keyboard Navigation (Arrows + ESC)
        document.addEventListener("keydown", (e) => {
            if (modal.style.display !== "flex") return;
            if (e.key === "ArrowRight") nextImage();
            if (e.key === "ArrowLeft") prevImage();
            if (e.key === "Escape") modal.style.display = "none";
        });
        
        // Modal Arrow Buttons
        const leftArrow = document.querySelector('.apps-modal-arrow.left');
        const rightArrow = document.querySelector('.apps-modal-arrow.right');
        
        if(leftArrow) leftArrow.addEventListener('click', (e) => {
            e.stopPropagation();
            prevImage();
        });
        
        if(rightArrow) rightArrow.addEventListener('click', (e) => {
            e.stopPropagation();
            nextImage();
        });
    }


    /* =========================================================
       4. STUDIO DROPDOWN (Premium Grey Logic)
    ========================================================= */
    document.querySelectorAll(".gc-dropdown").forEach(dropdown => {
        const selectedBox = dropdown.querySelector(".gc-dropdown-selected");
        const items = dropdown.querySelectorAll("li");
        const hiddenInput = dropdown.querySelector("input[type='hidden']");

        if (!selectedBox || !hiddenInput) return;

        // Toggle Open
        selectedBox.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevent immediate closing
            dropdown.classList.toggle("open");
        });

        // Select Logic
        items.forEach(item => {
            item.addEventListener("click", () => {
                selectedBox.textContent = item.textContent;
                hiddenInput.value = item.dataset.value;

                // Visual Feedback (Grey Active State)
                items.forEach(li => li.classList.remove("active"));
                item.classList.add("active");

                dropdown.classList.remove("open");
            });
        });

        // Close when clicking outside
        document.addEventListener("click", (e) => {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove("open");
            }
        });
    });


    /* =========================================================
       5. HEADER & FOOTER LOADER (AJAX)
    ========================================================= */
    // Header Load
    fetch("/partials/header.html")
        .then(res => res.text())
        .then(html => {
            const mount = document.getElementById("site-header");
            if (mount) mount.innerHTML = html;

            // Auto-Active Link Highlight
            let path = window.location.pathname;
            if (path === "/" || path === "/index.html") path = "home";
            else path = path.replace(".html", "").replace("/", ""); // Clean path

            document.querySelectorAll("header nav a").forEach(link => {
                // Check data-nav attribute match
                if (link.dataset.nav === path) {
                    link.classList.add("active");
                }
            });
        });

    // Footer Load
    fetch("/partials/footer.html")
        .then(res => res.text())
        .then(html => {
            const mount = document.getElementById("site-footer");
            if (mount) mount.innerHTML = html;
            
            const year = document.getElementById("year");
            if (year) year.textContent = new Date().getFullYear();
        });

});

/* =========================================================
   6. DESIGN FORM SUBMISSION (AJAX)
========================================================= */
const designForm = document.getElementById("designForm");

if (designForm) {
    designForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const successMsg = document.getElementById("design-success");
        const submitBtn = designForm.querySelector("button");
        const originalBtnText = submitBtn.innerText;
        
        // Show Loading State
        submitBtn.innerText = "SENDING...";
        
        const formData = new FormData(designForm);

        try {
            const response = await fetch(designForm.action, {
                method: "POST",
                body: formData,
                headers: { Accept: "application/json" }
            });

            if (response.ok) {
                designForm.reset();
                if (successMsg) successMsg.style.display = "block";
                
                // Reset Button
                submitBtn.innerText = "SENT ✅";
                setTimeout(() => {
                    submitBtn.innerText = originalBtnText;
                    successMsg.style.display = "none";
                }, 5000);
            } else {
                alert("Submission failed. Please try again.");
                submitBtn.innerText = originalBtnText;
            }
        } catch (error) {
            alert("Network error. Please try again.");
            submitBtn.innerText = originalBtnText;
        }
    });
}
