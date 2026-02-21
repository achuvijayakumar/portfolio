document.addEventListener('DOMContentLoaded', () => {
    // Boot Sequence
    const bootScreen = document.getElementById('boot-screen');
    const bootText = document.getElementById('boot-text');
    const lines = [
        "Initializing PixelOS v1.0...",
        "Loading Kernel modules...",
        "Mounting file system...",
        "Starting user interface service...",
        "Connection established: ONLINE",
        "Welcome, User."
    ];

    if (bootScreen && bootText) {
        let lineIndex = 0;

        function typeBootLine() {
            if (lineIndex < lines.length) {
                const p = document.createElement('p');
                p.textContent = "> " + lines[lineIndex];
                bootText.appendChild(p);
                lineIndex++;
                setTimeout(typeBootLine, 400); // Delay between lines
            } else {
                setTimeout(() => {
                    bootScreen.style.transition = "opacity 0.5s ease";
                    bootScreen.style.opacity = "0";
                    setTimeout(() => {
                        bootScreen.remove();
                    }, 500);
                }, 800); // Wait bit after last line
            }
        }

        typeBootLine();
    }

    // Typewriter Effect
    const nameText = "ACHU VIJAYAKUMAR";
    const typewriterElement = document.getElementById('typewriter');

    if (typewriterElement) {
        let i = 0;
        function typeWriter() {
            if (i < nameText.length) {
                typewriterElement.textContent += nameText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        // Start after a small delay
        setTimeout(typeWriter, 500);
    }

    // Mobile Menu Toggle
    const menuBtn = document.getElementById('menu-btn');
    const navLinks = document.getElementById('nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // Smooth Scroll (Optional, simple native behavior is usually enough with css scroll-behavior)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Target elements to animate
    const animatedElements = document.querySelectorAll('.section-title, .pixel-border, .hero-box, .skill-card, .project-card, .timeline-content');
    animatedElements.forEach(el => {
        el.classList.add('fade-in-up');
        observer.observe(el);
    });

    // Clock Update
    function updateClock() {
        const now = new Date();
        const clockElement = document.getElementById('clock');
        if (clockElement) {
            clockElement.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
    }
    setInterval(updateClock, 1000);
    updateClock();

    // Mouse Parallax for Background Shapes
    document.addEventListener('mousemove', (e) => {
        const shapes = document.querySelectorAll('.parallax-shape');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        shapes.forEach(shape => {
            const speed = shape.getAttribute('data-speed') || 0.05;
            const xOffset = (window.innerWidth - e.clientX * speed * 50) / 100;
            const yOffset = (window.innerHeight - e.clientY * speed * 50) / 100;

            shape.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
    });
});

// Certificate Lightbox Modal Functions
function openCertModal(src, title) {
    const modal = document.getElementById('cert-modal');
    const img = document.getElementById('cert-modal-img');
    const titleEl = document.getElementById('cert-modal-title');
    img.src = src;
    img.alt = title;
    titleEl.textContent = title;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeCertModal() {
    const modal = document.getElementById('cert-modal');
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCertModal();
});
