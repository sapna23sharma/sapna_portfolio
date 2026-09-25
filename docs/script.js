/* =========================================================
   PORTFOLIO — MAIN JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    /* =====================================================
       1. FOOTER YEAR
       ===================================================== */

    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    /* =====================================================
       2. MOBILE NAVIGATION
       ===================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinksContainer = document.querySelector(".nav-links");

    if (menuToggle && navLinksContainer) {

        menuToggle.addEventListener("click", () => {
            navLinksContainer.classList.toggle("active");
            menuToggle.classList.toggle("active");

            const isOpen = navLinksContainer.classList.contains("active");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );
        });


        // Close mobile menu after clicking a link
        const navLinks = navLinksContainer.querySelectorAll("a");

        navLinks.forEach((link) => {
            link.addEventListener("click", () => {
                navLinksContainer.classList.remove("active");
                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );
            });
        });
    }


    /* =====================================================
       3. SCROLL REVEAL ANIMATION
       ===================================================== */

    const revealElements = document.querySelectorAll(".reveal");

    if (revealElements.length > 0) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }
        );


        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });
    }


    /* =====================================================
       4. ACTIVE NAVIGATION LINK
       ===================================================== */

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-links a");

    if (sections.length > 0 && navLinks.length > 0) {

        const sectionObserver = new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    // Remove active class from all links
                    navLinks.forEach((link) => {
                        link.classList.remove("active");
                    });


                    // Find corresponding navigation link
                    const activeLink = document.querySelector(
                        `.nav-links a[href="#${entry.target.id}"]`
                    );


                    // Add active class
                    if (activeLink) {
                        activeLink.classList.add("active");
                    }

                });

            },
            {
                threshold: 0.25,
                rootMargin: "-80px 0px -40% 0px"
            }
        );


        sections.forEach((section) => {
            sectionObserver.observe(section);
        });
    }


    /* =====================================================
       5. HERO VISUAL 3D TILT
       ===================================================== */

    const heroVisual = document.querySelector(".hero-visual");

    if (heroVisual) {

        heroVisual.addEventListener("mousemove", (event) => {

            const rect = heroVisual.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) /
                rect.width -
                0.5;

            const y =
                (event.clientY - rect.top) /
                rect.height -
                0.5;


            heroVisual.style.transform = `
                perspective(900px)
                rotateY(${x * 4}deg)
                rotateX(${y * -4}deg)
            `;
        });


        heroVisual.addEventListener("mouseleave", () => {

            heroVisual.style.transform = `
                perspective(900px)
                rotateY(0deg)
                rotateX(0deg)
            `;
        });
    }


    /* =====================================================
       6. PROJECT IMAGE FALLBACK
       ===================================================== */

    const projectImages = document.querySelectorAll(
        ".project-image img"
    );

    projectImages.forEach((image) => {

        image.addEventListener("error", () => {

            image.style.display = "none";

            const parent = image.parentElement;

            if (parent) {
                parent.classList.add("image-fallback");
            }
        });

    });


    /* =====================================================
       7. PREVENT EMPTY PROJECT LINKS
       ===================================================== */

    const projectLinks = document.querySelectorAll(
        '.project-links a[href="#"]'
    );

    projectLinks.forEach((link) => {

        link.addEventListener("click", (event) => {
            event.preventDefault();
        });

    });


    /* =====================================================
       8. SMOOTH SCROLLING
       ===================================================== */

    const anchorLinks = document.querySelectorAll(
        'a[href^="#"]'
    );

    anchorLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#" ||
                targetId.length <= 1
            ) {
                return;
            }


            const targetElement =
                document.querySelector(targetId);


            if (!targetElement) {
                return;
            }


            event.preventDefault();


            const navbar =
                document.querySelector(".navbar");

            const navbarHeight =
                navbar
                    ? navbar.offsetHeight
                    : 0;


            const targetPosition =
                targetElement.getBoundingClientRect().top +
                window.scrollY -
                navbarHeight -
                15;


            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       9. NAVBAR SCROLL EFFECT
       ===================================================== */

    const navbar = document.querySelector(".navbar");

    if (navbar) {

        const updateNavbar = () => {

            if (window.scrollY > 40) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }

        };


        updateNavbar();

        window.addEventListener(
            "scroll",
            updateNavbar,
            { passive: true }
        );
    }


    /* =====================================================
       10. CARD MOUSE GLOW EFFECT
       ===================================================== */

    const glowCards = document.querySelectorAll(
        ".skill-card, .project-card, .timeline-card, .interest-card"
    );


    glowCards.forEach((card) => {

        card.addEventListener("mousemove", (event) => {

            const rect = card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;


            card.style.setProperty(
                "--mouse-x",
                `${x}px`
            );

            card.style.setProperty(
                "--mouse-y",
                `${y}px`
            );
        });

    });


    /* =====================================================
       11. TYPING EFFECT
       ===================================================== */

    const typingElement =
        document.querySelector(".typing-text");


    if (typingElement) {

        const words = [
            "AI & Technology Explorer",
            "Full-Stack Developer",
            "Computer Science Educator",
            "Problem Solver"
        ];


        let wordIndex = 0;
        let characterIndex = 0;
        let deleting = false;


        const typingSpeed = 90;
        const deletingSpeed = 50;
        const pauseAfterWord = 1600;


        function typeEffect() {

            const currentWord =
                words[wordIndex];


            if (!deleting) {

                typingElement.textContent =
                    currentWord.substring(
                        0,
                        characterIndex + 1
                    );


                characterIndex++;


                if (
                    characterIndex ===
                    currentWord.length
                ) {

                    deleting = true;

                    setTimeout(
                        typeEffect,
                        pauseAfterWord
                    );

                    return;
                }

            } else {

                typingElement.textContent =
                    currentWord.substring(
                        0,
                        characterIndex - 1
                    );


                characterIndex--;


                if (characterIndex === 0) {

                    deleting = false;

                    wordIndex =
                        (wordIndex + 1) %
                        words.length;
                }
            }


            setTimeout(
                typeEffect,
                deleting
                    ? deletingSpeed
                    : typingSpeed
            );
        }


        typeEffect();
    }


    /* =====================================================
       12. SCROLL PROGRESS BAR
       ===================================================== */

    const progressBar =
        document.querySelector(".scroll-progress");


    if (progressBar) {

        const updateProgress = () => {

            const scrollTop =
                window.scrollY;

            const documentHeight =
                document.documentElement.scrollHeight -
                window.innerHeight;


            const progress =
                documentHeight > 0
                    ? (scrollTop / documentHeight) * 100
                    : 0;


            progressBar.style.width =
                `${progress}%`;
        };


        window.addEventListener(
            "scroll",
            updateProgress,
            { passive: true }
        );


        updateProgress();
    }


    /* =====================================================
       13. COUNTER ANIMATION
       ===================================================== */

    const counters =
        document.querySelectorAll(
            "[data-counter]"
        );


    if (counters.length > 0) {

        const counterObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        const counter =
                            entry.target;


                        const target =
                            Number(
                                counter.dataset.counter
                            );


                        if (
                            Number.isNaN(target)
                        ) {
                            return;
                        }


                        let current = 0;

                        const duration = 1200;

                        const increment =
                            target /
                            (duration / 16);


                        const updateCounter = () => {

                            current += increment;


                            if (current >= target) {

                                counter.textContent =
                                    Math.round(target);

                                return;
                            }


                            counter.textContent =
                                Math.round(current);


                            requestAnimationFrame(
                                updateCounter
                            );
                        };


                        updateCounter();

                        observer.unobserve(counter);
                    });

                },
                {
                    threshold: 0.5
                }
            );


        counters.forEach((counter) => {
            counterObserver.observe(counter);
        });
    }


    /* =====================================================
       14. CURSOR GLOW
       ===================================================== */

    const cursorGlow =
        document.querySelector(".cursor-glow");


    if (
        cursorGlow &&
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        window.addEventListener(
            "mousemove",
            (event) => {

                cursorGlow.style.left =
                    `${event.clientX}px`;

                cursorGlow.style.top =
                    `${event.clientY}px`;
            }
        );
    }


    /* =====================================================
       15. REDUCED MOTION ACCESSIBILITY
       ===================================================== */

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    if (reducedMotion.matches) {

        document.documentElement.classList.add(
            "reduce-motion"
        );


        if (heroVisual) {

            heroVisual.style.transform =
                `
                perspective(900px)
                rotateY(0deg)
                rotateX(0deg)
                `;
        }
    }


    /* =====================================================
       16. ESCAPE KEY — CLOSE MOBILE MENU
       ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key !== "Escape") {
                return;
            }


            if (
                navLinksContainer &&
                navLinksContainer.classList.contains(
                    "active"
                )
            ) {

                navLinksContainer.classList.remove(
                    "active"
                );


                if (menuToggle) {

                    menuToggle.classList.remove(
                        "active"
                    );


                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );
                }
            }
        }
    );


    /* =====================================================
       17. INITIALIZE
       ===================================================== */

    console.log(
        "%cPortfolio initialized successfully.",
        "font-weight: bold;"
    );

});