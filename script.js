/* =========================================================
   GYPSY CARTEL — GLOBAL SCRIPT (FINAL MASTER FIXED)
   ✅ Cursor Engine
   ✅ Apps Modal + Scroll Lock
   ✅ Studio Dropdown Active Grey
   ✅ Header/Footer Loader FIXED for GitHub Pages
   ✅ Auto Nav Highlight Perfect
   ✅ Design Form AJAX Submit
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================
       1. DEVICE DETECTION (Cursor Safe)
    ========================================================= */
    const isTouchDevice =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(hover: none)").matches;


    /* =========================================================
       2. CUSTOM CURSOR ENGINE (Desktop Only)
    ========================================================= */
    const cursorDot = document.querySelector(".cursor-dot");
    const cursorOutline = document.querySelector(".cursor-outline");

    if (!isTouchDevice && cursorDot && cursorOutline) {

        let mouseX = 0, mouseY = 0;
        let outlineX = 0, outlineY = 0;

        window.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;

            cursorDot.style.opacity = "1";
            cursorOutline.style.opacity = "1";
        });

        function animateCursor() {
            outlineX += (mouseX - outlineX) * 0.15;
            outlineY += (mouseY - outlineY) * 0.15;

            cursorOutline.style.left = `${outlineX}px`;
            cursorOutline.style.top = `${outlineY}px`;

            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        /* Hide cursor when typing */
        document.querySelectorAll("input, textarea, select").forEach(el => {
            el.addEventListener("mouseenter", () => {
                cursorDot.style.opacity = "0";
                cursorOutline.style.opacity = "0";
            });
            el.addEventListener("mouseleave", () => {
                cursorDot.style.opacity = "1";
                cursorOutline.style.opacity = "1";
            });
        });

        /* Hover scale effect */
        document.querySelectorAll("a, button, .btn, .apps-gallery-img").forEach(el => {
            el.addEventListener("mouseenter", () => {
                cursorOutline.style.transform =
                    "translate(-50%, -50%) scale(1.5)";
            });
            el.addEventListener("mouseleave", () => {
                cursorOutline.style.transform =
                    "translate(-50%, -50%) scale(1)";
            });
        });

    } else {
        /* Mobile: disable custom cursor */
        if (cursorDot) cursorDot.style.display = "none";
        if (cursorOutline) cursorOutline.style.display = "none";
        document.body.style.cursor = "auto";
    }


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
            currentIndex =
                (currentIndex - 1 + galleryImages.length) % galleryImages.length;
            modalImg.src = galleryImages[currentIndex].src;
        }

        galleryImages.forEach((img, index) => {
            img.addEventListener("click", () => showImage(index));
        });

        if (closeBtn) closeBtn.addEventListener("click", closeModal);

        modal.addEventListener("click", (e) => {
            if (e.target === modal) closeModal();
        });

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

        document.addEventListener("click", () => {
            dropdown.classList.remove("open");
        });

    });


    /* =========================================================
       5. HEADER + FOOTER LOADER (FINAL FIX)
       ✅ Works in ALL folders + GitHub Pages
    ========================================================= */

    function getBasePath() {
        let depth = window.location.pathname.split("/").length - 2;
        return depth > 0 ? "../".repeat(depth) : "./";
    }

    const BASE = getBasePath();

    /* ---------- LOAD HEADER ---------- */
    fetch(BASE + "partials/header.html")
        .then(res => res.text())
        .then(html => {

            const mount = document.getElementById("site-header");
            if (mount) mount.innerHTML = html;

            /* Auto Active Nav */
            let path = window.location.pathname
                .replace(/\/$/, "")
                .split("/")
                .pop();

            if (path === "" || path === "index.html") path = "home";
            path = path.replace(".html", "");

            document.querySelectorAll("header nav a").forEach(link => {
                if (link.dataset.nav === path) {
                    link.classList.add("active");
                }
            });

        })
        .catch(() => console.warn("Header failed to load"));


    /* ---------- LOAD FOOTER ---------- */
    fetch(BASE + "partials/footer.html")
        .then(res => res.text())
        .then(html => {

            const mount = document.getElementById("site-footer");
            if (mount) mount.innerHTML = html;

            const year = document.getElementById("year");
            if (year) year.textContent = new Date().getFullYear();

        })
        .catch(() => console.warn("Footer failed to load"));



    /* =========================================================
       6. DESIGN FORM AJAX SUBMIT
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

                    if (successMsg) successMsg.style.display = "block";

                    setTimeout(() => {
                        submitBtn.innerText = originalText;
                        if (successMsg) successMsg.style.display = "none";
                    }, 3000);

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
