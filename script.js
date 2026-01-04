document.addEventListener('DOMContentLoaded', () => {
    // ===============================
    // Custom Cursor Logic
    // ===============================
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (cursorDot && cursorOutline) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });
    }

    const links = document.querySelectorAll('a, button, input, textarea');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorOutline.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        });
        link.addEventListener('mouseleave', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.backgroundColor = 'transparent';
        });
    });
});

/* ======================================================
   PRIVACY POLICY & TERMS MODAL (HOME PAGE ONLY)
   ====================================================== */

function openPolicy(type) {
    const modal = document.getElementById('policy-modal');
    const contentBox = document.getElementById('policy-content');

    if (!modal || !contentBox) return;

    const file = type === 'privacy' ? 'privacy.html' : 'terms.html';

    fetch(file)
        .then(response => response.text())
        .then(html => {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;

            // Extract only main content
            const container = tempDiv.querySelector('.container');
            contentBox.innerHTML = container ? container.innerHTML : html;

            modal.classList.remove('gc-hidden');
            document.body.style.overflow = 'hidden';
        })
        .catch(() => {
            contentBox.innerHTML = '<p style="color:#fff">Unable to load content.</p>';
            modal.classList.remove('gc-hidden');
        });
}

function closePolicy() {
    const modal = document.getElementById('policy-modal');
    if (modal) {
        modal.classList.add('gc-hidden');
        document.body.style.overflow = '';
    }
}
