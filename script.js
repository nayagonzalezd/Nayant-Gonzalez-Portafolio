
/* =====================================
   NAYA GONZALEZ — INTERACTIVE EFFECTS
===================================== */

// 01. CUSTOM CURSOR

const cursor = document.querySelector(".cursor");
const follower = document.querySelector(".cursor-follower");

if (window.matchMedia("(pointer: fine)").matches) {

    let mouseX = 0;
    let mouseY = 0;

    let followerX = 0;
    let followerY = 0;

    document.addEventListener("mousemove", (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;

        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
    });

    function animateCursor() {

        followerX += (mouseX - followerX) * 0.12;
        followerY += (mouseY - followerY) * 0.12;

        follower.style.left = `${followerX}px`;
        follower.style.top = `${followerY}px`;

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Cursor interaction

    const interactiveElements = document.querySelectorAll(
        "a, button, .skill-card, .project-card"
    );

    interactiveElements.forEach((element) => {

        element.addEventListener("mouseenter", () => {
            follower.classList.add("active");
        });

        element.addEventListener("mouseleave", () => {
            follower.classList.remove("active");
        });

    });
}


// 02. FLOATING PARTICLES

const particlesContainer = document.getElementById("particles");

if (particlesContainer) {

    const totalParticles = 35;

    for (let i = 0; i < totalParticles; i++) {

        const particle = document.createElement("span");

        particle.classList.add("particle");

        particle.style.left = `${Math.random() * 100}%`;

        particle.style.animationDuration =
            `${8 + Math.random() * 15}s`;

        particle.style.animationDelay =
            `${Math.random() * 10}s`;

        const size = 1 + Math.random() * 3;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        particlesContainer.appendChild(particle);
    }

}


// 03. REVEAL SECTIONS ON SCROLL

const sections = document.querySelectorAll(".reveal-section");

const observer = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.15
    }
);

sections.forEach((section) => {
    observer.observe(section);
});


// 04. MOBILE NAVIGATION

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("open");

    });

    const links = navLinks.querySelectorAll("a");

    links.forEach((link) => {

        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
        });

    });

}


// 05. PROJECT CARD TILT EFFECT

const cards = document.querySelectorAll(
    ".project-card, .skill-card"
);

if (window.matchMedia("(pointer: fine)").matches) {

    cards.forEach((card) => {

        card.addEventListener("mousemove", (event) => {

            const rect = card.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (centerY - y) / 20;
            const rotateY = (x - centerX) / 20;

            card.style.transform =
                `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform =
                "perspective(700px) rotateX(0) rotateY(0) translateY(0)";

        });

    });

}


// 06. CURRENT YEAR

const year = document.getElementById("year");

if (year) {
    year.textContent = new Date().getFullYear();
}


// 07. CONSOLE MESSAGE

console.log(
    "%cWELCOME TO NAYA'S DIGITAL UNIVERSE",
    "color: #C084FC; font-size: 16px; font-weight: bold;"
);

console.log(
    "%cEvery great project starts with an idea.",
    "color: #E11D8D; font-size: 12px;"
);
