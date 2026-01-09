/* =========================================================
   GYPSY CARTEL — GLOBAL SCRIPT (FINAL & STABLE)
   Cursor always visible • Modal safe • No conflicts
========================================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* ===============================
       CUSTOM CURSOR (ALWAYS ON)
    =============================== */
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    let mouseX = 0;
    let mouseY = 0;

    if (cursorDot && cursorOutline) {

        document.body.classList.add('gc-cursor-active');

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        });

        const followCursor = () => {
            cursorOutline.style.left = `${mouseX}px`;
            cursorOutline.style.top = `${mouseY}px`;
            requestAnimationFrame(followCursor);
        };
        followCursor();

        /* Elements that trigger cursor highlight */
        const cursorTargets = `
            a, button, input, textarea, select,
            .apps-gallery-img,
            .apps-gallery-arrow,
            .apps-modal-close,
            .apps-modal-arrow
        `;

        document.addEventListener('mouseover', (e) => {
            if (e.target.matches(cursorTargets)) {
                cursorOutline.style.transform =
                    'translate(-50%, -50%) scale(1.5)';
            }
        });

        document.addEventListener('mouseout', (e) => {
            if (e.target.matches(cursorTargets)) {
                cursorOutline.style.transform =
                    'translate(-50%, -50%) scale(1)';
            }
        });
    }

    /* ===============================
       POLICY MODAL – SAFE DEFAULT
    =============================== */
    const policyModal = document.getElementById('policy-modal');
    if (policyModal) {
        policyModal.classList.add('gc-hidden');
    }

    /* ===============================
       APPS GALLERY MODAL (SCROLL + ARROWS)
    =============================== */
    const modal = document.getElementById('appsModal');
    const modalImg = document.getElementById('appsModalImg');
    const closeBtn = document.querySelector('.apps-modal-close');
    const galleryImages = document.querySelectorAll('.apps-gallery-img');

    let currentIndex = 0;

    if (modal && modalImg && galleryImages.length) {

        const showImage = (index) => {
            currentIndex = index;
            modalImg.src = galleryImages[currentIndex].src;
            modal.style.display = 'flex';
        };

        galleryImages.forEach((img, index) => {
            img.addEventListener('click', () => {
                showImage(index);
            });
        });

        /* Close modal */
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        }

        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.style.display = 'none';
        });

        /* Keyboard navigation */
        document.addEventListener('keydown', (e) => {
            if (modal.style.display !== 'flex') return;

            if (e.key === 'ArrowRight') {
                currentIndex = (currentIndex + 1) % galleryImages.length;
                modalImg.src = galleryImages[currentIndex].src;
            }

            if (e.key === 'ArrowLeft') {
                currentIndex =
                    (currentIndex - 1 + galleryImages.length) % galleryImages.length;
                modalImg.src = galleryImages[currentIndex].src;
            }

            if (e.key === 'Escape') {
                modal.style.display = 'none';
            }
        });
    }
});


/* ===============================
   POLICY OPEN / CLOSE
=============================== */
function openPolicy(type) {
    const modal = document.getElementById('policy-modal');
    const content = document.getElementById('policy-content');
    if (!modal || !content) return;

    if (type === 'privacy') {
        content.innerHTML = `
            <h2 style="color:var(--primary-orange)">Privacy Policy</h2>
            <p>We respect your privacy. No data is sold or shared.</p>
        `;
    }

    if (type === 'terms') {
        content.innerHTML = `
            <h2 style="color:var(--primary-orange)">Terms of Service</h2>
            <p>All content belongs to Gypsy Cartel.</p>
        `;
    }

    modal.scrollTop = 0;
    modal.classList.remove('gc-hidden');
}

function closePolicy() {
    const modal = document.getElementById('policy-modal');
    if (modal) modal.classList.add('gc-hidden');
}


/* ===============================
   DESIGN FORM — AJAX SUBMIT
=============================== */
const designForm = document.getElementById('designForm');

if (designForm) {
    designForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const successMsg = document.getElementById('design-success');
        const formData = new FormData(designForm);

        try {
            const response = await fetch(designForm.action, {
                method: 'POST',
                body: formData,
                headers: { Accept: 'application/json' }
            });

            if (response.ok) {
                designForm.reset();
                if (successMsg) successMsg.style.display = 'block';
            } else {
                alert('Submission failed. Please try again.');
            }
        } catch {
            alert('Network error. Please try again.');
        }
    });
}


/* ===============================
   LOAD HEADER & FOOTER
=============================== */
document.addEventListener('DOMContentLoaded', () => {

    fetch('/partials/header.html')
        .then(res => res.text())
        .then(html => {
            const headerMount = document.getElementById('site-header');
            if (headerMount) headerMount.innerHTML = html;

            const path = window.location.pathname;
            document.querySelectorAll('nav a[data-nav]').forEach(link => {
                if (path === '/' && link.dataset.nav === 'home') {
                    link.classList.add('active');
                } else if (path.includes(link.dataset.nav)) {
                    link.classList.add('active');
                }
            });
        });

    fetch('/partials/footer.html')
        .then(res => res.text())
        .then(html => {
            const footerMount = document.getElementById('site-footer');
            if (footerMount) footerMount.innerHTML = html;

            const y = document.getElementById('year');
            if (y) y.textContent = new Date().getFullYear();
        });
});
