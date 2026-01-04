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

        document.querySelectorAll('a, button, input, textarea').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
    }

    /* ===============================
       POLICY MODAL – FORCE SAFE STATE
    =============================== */
    const modal = document.getElementById('policy-modal');
    if (modal) {
        modal.classList.add('gc-hidden'); // ALWAYS hidden on load
    }
});

/* ===============================
   POLICY OPEN / CLOSE FUNCTIONS
   (USED BY index.html FOOTER)
=============================== */
function openPolicy(type) {
    const modal = document.getElementById('policy-modal');
    const content = document.getElementById('policy-content');

    if (!modal || !content) return;

    if (type === 'privacy') {
        content.innerHTML = `
            <h2 style="color:var(--primary-orange); margin-bottom:15px;">
                Privacy Policy
            </h2>
            <p>
                Gypsy Cartel respects your privacy. We collect only the
                information you voluntarily provide through our website
                forms to respond to inquiries and project requests.
            </p>
            <p>
                We do not sell, rent, or share your personal data.
                Form submissions may be securely processed using
                trusted third-party services such as Formspree.
            </p>
            <p>
                Reasonable security measures are taken, but no
                online transmission is 100% secure.
            </p>
            <p>
                For questions, contact
                <strong>support@gypsycartel.shop</strong>
            </p>
        `;
    }

    if (type === 'terms') {
        content.innerHTML = `
            <h2 style="color:var(--primary-orange); margin-bottom:15px;">
                Terms of Service
            </h2>
            <p>
                By accessing or using the Gypsy Cartel website,
                you agree to comply with these terms.
            </p>
            <p>
                Submitting a project request does not guarantee
                acceptance or delivery. All pricing, timelines,
                and deliverables are discussed separately.
            </p>
            <p>
                All designs, graphics, software, logos, and content
                are the intellectual property of Gypsy Cartel.
                Unauthorized use is prohibited.
            </p>
            <p>
                Gypsy Cartel is not liable for damages arising
                from use or inability to use this website.
            </p>
        `;
    }

    modal.classList.remove('gc-hidden');
}

/* ===============================
   CLOSE POLICY MODAL
=============================== */
function closePolicy() {
    const modal = document.getElementById('policy-modal');
    if (modal) {
        modal.classList.add('gc-hidden');
    }
}
