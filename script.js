document.addEventListener('DOMContentLoaded', () => {

    /* ===============================
       CUSTOM CURSOR
    =============================== */
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (cursorDot && cursorOutline) {
        window.addEventListener('mousemove', (e) => {
            const x = e.clientX;
            const y = e.clientY;

            cursorDot.style.left = `${x}px`;
            cursorDot.style.top = `${y}px`;

            cursorOutline.animate(
                { left: `${x}px`, top: `${y}px` },
                { duration: 500, fill: "forwards" }
            );
        });

        document.querySelectorAll('a, button').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
    }

    /* ===============================
       POLICY MODAL (FIXED)
    =============================== */
    const modal = document.getElementById('policy-modal');
    if (modal) {
        modal.classList.add('gc-hidden'); // FORCE HIDE ON LOAD
    }
});

/* ===============================
   POLICY FUNCTIONS
=============================== */
function openPolicy(type) {
    const modal = document.getElementById('policy-modal');
    const content = document.getElementById('policy-content');

    if (!modal || !content) return;

    if (type === 'privacy') {
        content.innerHTML = `
            <h2>Privacy Policy</h2>
            <p>Gypsy Cartel respects your privacy. We only collect necessary
            information submitted through forms to respond to inquiries.</p>
            <p>We do not sell or share your data.</p>
        `;
    }

    if (type === 'terms') {
        content.innerHTML = `
            <h2>Terms of Service</h2>
            <p>Using this website means you agree to our terms.
            Submitting a project request does not guarantee acceptance.</p>
            <p>All content belongs to Gypsy Cartel.</p>
        `;
    }

    modal.classList.remove('gc-hidden');
}

function closePolicy() {
    const modal = document.getElementById('policy-modal');
    if (modal) modal.classList.add('gc-hidden');
}
