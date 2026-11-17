
/* =========================================================
   NAYA GONZÁLEZ
   PORTAFOLIO CINEMATOGRÁFICO
   JavaScript · Navegación entre sueños
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    // ================================================
    // 01. ELEMENTOS PRINCIPALES
    // ================================================

    const sections = [
        ...document.querySelectorAll(".level-section")
    ];

    const transitionScreen = document.getElementById("transitionScreen");
    const transitionText = document.getElementById("transitionText");

    const levelButtons = document.querySelectorAll(".level-button");
    const navLinks = document.querySelectorAll(".nav-link");

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    let currentLevel = 0;
    let isTransitioning = false;
    let transitionTimeout;


    // ================================================
    // 02. TRANSICIÓN ENTRE NIVELES
    // ================================================

    function goToLevel(targetId) {

        const target = document.getElementById(targetId);

        if (!target || isTransitioning) return;

        const targetLevel = Number(target.dataset.level);

        if (targetLevel === currentLevel) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
            return;
        }

        isTransitioning = true;

        document.body.classList.add("transitioning");

        const messages = [
            "Regresando al origen...",
            "Entrando en un nuevo nivel...",
            "Explorando otro universo...",
            "Profundizando en el sueño...",
            "Conectando con la realidad..."
        ];

        if (transitionText) {
            transitionText.textContent =
                messages[targetLevel] || "Cambiando de nivel...";
        }

        if (transitionScreen) {
            transitionScreen.classList.add("active");
        }

        const duration = reducedMotion ? 100 : 950;

        clearTimeout(transitionTimeout);

        transitionTimeout = setTimeout(() => {

            target.scrollIntoView({
                behavior: "instant",
                block: "start"
            });

            currentLevel = targetLevel;

            updateNavigation(targetId);

            setTimeout(() => {

                if (transitionScreen) {
                    transitionScreen.classList.remove("active");
                }

                document.body.classList.remove("transitioning");

                isTransitioning = false;

            }, reducedMotion ? 0 : 350);

        }, duration);
    }


    // ================================================
    // 03. BOTONES DEL NAVEGADOR DE NIVELES
    // ================================================

    levelButtons.forEach(button => {

        button.addEventListener("click", () => {

            const targetId = button.dataset.target;

            goToLevel(targetId);

        });

    });


    // ================================================
    // 04. BOTÓN ENTRAR AL ORIGEN
    // ================================================

    const enterButton = document.querySelector(".enter-origin");

    if (enterButton) {

        enterButton.addEventListener("click", () => {

            goToLevel(enterButton.dataset.target);

        });

    }


    // ================================================
    // 05. ACTUALIZAR NAVEGACIÓN
    // ================================================

    function updateNavigation(sectionId) {

        levelButtons.forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.target === sectionId
            );

        });

        navLinks.forEach(link => {

            const href = link.getAttribute("href");

            link.classList.toggle(
                "active",
                href === `#${sectionId}`
            );

        });

    }


    // ================================================
    // 06. DETECTAR NIVEL VISIBLE AL DESPLAZARSE
    // ================================================

    const sectionObserver = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const sectionId = entry.target.id;

                currentLevel = Number(entry.target.dataset.level);

                updateNavigation(sectionId);

                entry.target.classList.add("visible");

                if (sectionId === "habilidades") {
                    animateSkills();
                }

            }

        });

    }, {
        threshold: 0.55
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });


    // ================================================
    // 07. ENLACES DEL MENÚ SUPERIOR
    // ================================================

    navLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href").substring(1);

            if (document.getElementById(targetId)) {

                event.preventDefault();

                goToLevel(targetId);

            }

        });

    });


    // ================================================
    // 08. ANIMACIÓN DE HABILIDADES
    // ================================================

    let skillsAnimated = false;

    function animateSkills() {

        if (skillsAnimated) return;

        skillsAnimated = true;

        document.querySelectorAll(".skill-progress").forEach(bar => {

            const percentage = bar.dataset.progress;

            bar.style.setProperty(
                "--skill-width",
                `${percentage}%`
            );

        });

    }


    // ================================================
    // 09. CURSOR PERSONALIZADO
    // ================================================

    const cursor = document.querySelector(".cursor");
    const cursorRing = document.querySelector(".cursor-ring");

    const desktopPointer = window.matchMedia("(pointer: fine)").matches;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let ringX = mouseX;
    let ringY = mouseY;

    if (desktopPointer && cursor && cursorRing) {

        document.addEventListener("mousemove", event => {

            mouseX = event.clientX;
            mouseY = event.clientY;

            cursor.style.left = `${mouseX}px`;
            cursor.style.top = `${mouseY}px`;

        });

        function moveCursor() {

            ringX += (mouseX - ringX) * 0.13;
            ringY += (mouseY - ringY) * 0.13;

            cursorRing.style.left = `${ringX}px`;
            cursorRing.style.top = `${ringY}px`;

            requestAnimationFrame(moveCursor);

        }

        moveCursor();

        document.querySelectorAll(
            "a, button, .universe-card, .skill-row"
        ).forEach(element => {

            element.addEventListener("mouseenter", () => {
                cursorRing.classList.add("hovered");
            });

            element.addEventListener("mouseleave", () => {
                cursorRing.classList.remove("hovered");
            });

        });

    }


    // ================================================
    // 10. PARALLAX DE LOS ESCENARIOS
    // ================================================

    const sceneImages = document.querySelectorAll(".scene-image");

    if (desktopPointer && !reducedMotion) {

        let animationFrame;

        document.addEventListener("mousemove", event => {

            cancelAnimationFrame(animationFrame);

            animationFrame = requestAnimationFrame(() => {

                const x =
                    (event.clientX / window.innerWidth - 0.5) * 12;

                const y =
                    (event.clientY / window.innerHeight - 0.5) * 8;

                sceneImages.forEach(image => {

                    image.style.transform =
                        `scale(1.06) translate(${x}px, ${y}px)`;

                });

            });

        });

        document.addEventListener("mouseleave", () => {

            sceneImages.forEach(image => {
                image.style.transform = "";
            });

        });

    }


    // ================================================
    // 11. EFECTO 3D EN LOS UNIVERSOS
    // ================================================

    const universeCards = document.querySelectorAll(".universe-card");

    if (desktopPointer && !reducedMotion) {

        universeCards.forEach(card => {

            card.addEventListener("mousemove", event => {

                const rect = card.getBoundingClientRect();

                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateY =
                    ((x - centerX) / centerX) * 5;

                const rotateX =
                    ((centerY - y) / centerY) * 5;

                card.style.transform =
                    `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;

            });

            card.addEventListener("mouseleave", () => {

                card.style.transform = "";

            });

        });

    }


    // ================================================
    // 12. PANTALLA COMPLETA
    // ================================================

    const fullscreenButton = document.getElementById("fullscreenButton");

    if (fullscreenButton) {

        fullscreenButton.addEventListener("click", async () => {

            try {

                if (!document.fullscreenElement) {

                    await document.documentElement.requestFullscreen();

                } else {

                    await document.exitFullscreen();

                }

            } catch (error) {

                console.error(
                    "No fue posible cambiar la pantalla:",
                    error
                );

            }

        });

    }


    // ================================================
    // 13. SONIDO AMBIENTAL
    // ================================================

    const soundButton = document.getElementById("soundButton");

    let audioContext = null;
    let masterGain = null;
    let soundEnabled = false;

    function createAmbientSound() {

        if (audioContext) return;

        const AudioContextClass =
            window.AudioContext || window.webkitAudioContext;

        if (!AudioContextClass) return;

        audioContext = new AudioContextClass();

        masterGain = audioContext.createGain();

        masterGain.gain.value = 0;

        masterGain.connect(audioContext.destination);

        const oscillatorOne = audioContext.createOscillator();
        const oscillatorTwo = audioContext.createOscillator();

        const volumeOne = audioContext.createGain();
        const volumeTwo = audioContext.createGain();

        oscillatorOne.type = "sine";
        oscillatorTwo.type = "triangle";

        oscillatorOne.frequency.value = 55;
        oscillatorTwo.frequency.value = 82.4;

        volumeOne.gain.value = 0.12;
        volumeTwo.gain.value = 0.035;

        oscillatorOne.connect(volumeOne);
        oscillatorTwo.connect(volumeTwo);

        volumeOne.connect(masterGain);
        volumeTwo.connect(masterGain);

        oscillatorOne.start();
        oscillatorTwo.start();

    }

    if (soundButton) {

        soundButton.addEventListener("click", async () => {

            try {

                createAmbientSound();

                if (!audioContext || !masterGain) return;

                if (audioContext.state === "suspended") {
                    await audioContext.resume();
                }

                soundEnabled = !soundEnabled;

                masterGain.gain.setTargetAtTime(
                    soundEnabled ? 0.12 : 0,
                    audioContext.currentTime,
                    0.5
                );

                soundButton.classList.toggle(
                    "active",
                    soundEnabled
                );

                soundButton.setAttribute(
                    "aria-label",
                    soundEnabled ? "Desactivar sonido" : "Activar sonido"
                );

            } catch (error) {

                console.error("No se pudo activar el sonido:", error);

            }

        });

    }


    // ================================================
    // 14. AÑO AUTOMÁTICO
    // ================================================

    const year = document.getElementById("currentYear");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    // ================================================
    // 15. ENTRADA DE LA EXPERIENCIA
    // ================================================

    document.body.classList.add("experience-ready");

    console.log(
        "%c NAYA GONZÁLEZ ",
        "background: #1c3036; color: #f2dfbd; padding: 12px; font-size: 18px;"
    );

    console.log(
        "%c Bienvenido a otro nivel del sueño.",
        "color: #d6c3a0; font-size: 13px;"
    );

});
