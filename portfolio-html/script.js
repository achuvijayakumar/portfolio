document.addEventListener('DOMContentLoaded', () => {

    // =========================================
    // BOOT SEQUENCE
    // =========================================
    const bootScreen = document.getElementById('boot-screen');
    const bootText = document.getElementById('boot-text');
    const bootProgress = document.getElementById('boot-progress');
    const lines = [
        "> Initializing PixelOS v1.0...",
        "> Loading Kernel modules..........  OK",
        "> Mounting file system.............  OK",
        "> Starting user interface..........  OK",
        "> Connection established: ONLINE",
        "> Welcome, User."
    ];

    if (bootScreen && bootText) {
        let lineIndex = 0;
        const totalLines = lines.length;

        function typeBootLine() {
            if (lineIndex < lines.length) {
                const p = document.createElement('p');
                p.textContent = lines[lineIndex];
                bootText.appendChild(p);

                // Update progress bar
                if (bootProgress) {
                    const progress = ((lineIndex + 1) / totalLines) * 100;
                    bootProgress.style.width = progress + '%';
                }

                lineIndex++;
                setTimeout(typeBootLine, 350);
            } else {
                setTimeout(() => {
                    bootScreen.style.transition = "opacity 0.5s ease";
                    bootScreen.style.opacity = "0";
                    setTimeout(() => {
                        bootScreen.remove();
                    }, 500);
                }, 700);
            }
        }

        typeBootLine();
    }

    // =========================================
    // FLOATING PIXEL CONFETTI (Light theme)
    // =========================================
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let mouseX = -1000;
        let mouseY = -1000;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Retro pixel colors — pastel/vibrant on teal
        const pixelColors = [
            '#ffffff',  // white
            '#ffff00',  // yellow
            '#00ffff',  // cyan
            '#ff00ff',  // magenta
            '#00ff00',  // green
            '#ffaa00',  // orange
            '#aaaaff',  // light blue
            '#ffaaaa',  // light pink
        ];

        class PixelParticle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.floor(Math.random() * 3 + 2); // pixel sizes 2-4
                this.speedX = (Math.random() - 0.5) * 0.3;
                this.speedY = -Math.random() * 0.4 - 0.1; // drift upward
                this.color = pixelColors[Math.floor(Math.random() * pixelColors.length)];
                this.alpha = Math.random() * 0.4 + 0.15;
                this.twinkleSpeed = Math.random() * 0.03 + 0.01;
                this.twinklePhase = Math.random() * Math.PI * 2;
                this.life = 0;
                this.maxLife = Math.random() * 600 + 300;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Twinkle
                this.twinklePhase += this.twinkleSpeed;
                this.alpha = 0.2 + Math.sin(this.twinklePhase) * 0.2;

                // Mouse repel (push away gently)
                const dx = this.x - mouseX;
                const dy = this.y - mouseY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) {
                    const force = (100 - dist) / 100;
                    this.speedX += (dx / dist) * force * 0.15;
                    this.speedY += (dy / dist) * force * 0.15;
                }

                // Friction
                this.speedX *= 0.995;
                this.speedY *= 0.995;

                // Respawn
                this.life++;
                if (this.life > this.maxLife || this.y < -10 || this.x < -10 || this.x > canvas.width + 10) {
                    this.reset();
                    this.y = canvas.height + 10;
                }
            }

            draw() {
                ctx.globalAlpha = Math.max(0, this.alpha);
                ctx.fillStyle = this.color;
                // Draw as pixel (square)
                ctx.fillRect(
                    Math.floor(this.x),
                    Math.floor(this.y),
                    this.size,
                    this.size
                );
                ctx.globalAlpha = 1;
            }
        }

        // Create particles
        const particleCount = Math.min(60, Math.floor(window.innerWidth / 25));
        for (let i = 0; i < particleCount; i++) {
            particles.push(new PixelParticle());
        }

        let animationId;
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                p.update();
                p.draw();
            });

            animationId = requestAnimationFrame(animate);
        }

        animate();

        // Pause when tab hidden
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                cancelAnimationFrame(animationId);
            } else {
                animate();
            }
        });
    }

    // =========================================
    // TYPEWRITER EFFECT
    // =========================================
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
        setTimeout(typeWriter, 500);
    }

    // =========================================
    // MOBILE MENU
    // =========================================
    const menuBtn = document.getElementById('menu-btn');
    const navLinks = document.getElementById('nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // =========================================
    // SMOOTH SCROLL
    // =========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // =========================================
    // SCROLL ANIMATIONS
    // =========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(
        '.section-title, .pixel-border, .hero-box, .skill-card, .project-card, .timeline-content, .cert-card, .contact-box'
    );
    animatedElements.forEach(el => {
        el.classList.add('fade-in-up');
        observer.observe(el);
    });

    // =========================================
    // CLOCK
    // =========================================
    function updateClock() {
        const now = new Date();
        const clockElement = document.getElementById('clock');
        if (clockElement) {
            clockElement.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
    }
    setInterval(updateClock, 1000);
    updateClock();

    // =========================================
    // MOUSE PARALLAX
    // =========================================
    document.addEventListener('mousemove', (e) => {
        const shapes = document.querySelectorAll('.parallax-shape');
        shapes.forEach(shape => {
            const speed = shape.getAttribute('data-speed') || 0.05;
            const xOffset = (window.innerWidth - e.clientX * speed * 50) / 100;
            const yOffset = (window.innerHeight - e.clientY * speed * 50) / 100;
            shape.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
    });

    // =========================================
    // ACTIVE NAV HIGHLIGHT ON SCROLL
    // =========================================
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinksAll.forEach(link => {
                    link.style.background = '';
                    link.style.color = '';
                    link.style.borderColor = '';
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.style.background = '#000080';
                        link.style.color = '#fff';
                    }
                });
            }
        });
    });

    // =========================================
    // BUTTON CLICK SFX (VISUAL)
    // =========================================
    document.querySelectorAll('.pixel-btn, .btn-win, .nav-link').forEach(btn => {
        btn.addEventListener('mousedown', function () {
            this.style.filter = 'brightness(0.85)';
        });
        btn.addEventListener('mouseup', function () {
            this.style.filter = '';
        });
        btn.addEventListener('mouseleave', function () {
            this.style.filter = '';
        });
    });

});

// =========================================
// CERTIFICATE LIGHTBOX
// =========================================
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

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCertModal();
});
