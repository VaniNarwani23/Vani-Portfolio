
function locomotiveAnimation() {
    gsap.registerPlugin(ScrollTrigger);

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true,
        lerp: 0.1
    });

    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
        },
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });

    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();

    return locoScroll;
}

function loadingAnimation() {
    var tl = gsap.timeline();
    tl.from(".line h1", { y: 150, stagger: 0.25, duration: 0.6, delay: 0.5 });
    tl.from("#line1-part1", {
        opacity: 0,
        onStart: function () {
            var h5timer = document.querySelector("#line1-part1 h5");
            var grow = 0;
            var interval = setInterval(function () {
                if (grow < 100) {
                    h5timer.innerHTML = grow++;
                } else {
                    h5timer.innerHTML = grow;
                    clearInterval(interval);
                }
            }, 33);
        }
    });
    tl.to("#loader", { opacity: 0, duration: 0.2, delay: 3 });
    tl.from("#page1", { y: -1600, opacity: 0, duration: 0.6, ease: "power4" });
    tl.to("#loader", { display: "none" });
    tl.from("#nav", { opacity: 0 });
}

function cursorAnimation() {
    document.addEventListener("mousemove", function (dets) {
        gsap.to("#crsr", { left: dets.x, top: dets.y });
    });
}

function footerAnimation() {
    var clutter = "", clutter2 = "";
    document.querySelector("#footer h1").textContent.split("").forEach(function (elem) {
        clutter += `<span>${elem}</span>`
    })
    document.querySelector("#footer h1").innerHTML = clutter;
    document.querySelector("#footer h2").textContent.split("").forEach(function (elem) {
        clutter2 += `<span>${elem}</span>`
    })
    document.querySelector("#footer h2").innerHTML = clutter2;

    document.querySelector("#footer-text").addEventListener("mouseenter", function () {
        gsap.to("#footer h1 span", { opacity: 0, stagger: 0.05 });
        gsap.to("#footer h2 span", { delay: 0.35, opacity: 1, stagger: 0.1 });
    });
    document.querySelector("#footer-text").addEventListener("mouseleave", function () {
        gsap.to("#footer h1 span", { opacity: 1, stagger: 0.1, delay: 0.35 });
        gsap.to("#footer h2 span", { opacity: 0, stagger: 0.05 });
    });
}

function initMobileMenu(locoScroll) {
    const mobileMenuBtn = document.querySelector("#mobile-menu-btn");
    const mobileMenu = document.querySelector("#mobile-menu");
    const mobileMenuClose = document.querySelector("#mobile-menu-close");
    const mobileMenuOverlay = document.querySelector("#mobile-menu-overlay");

    if (mobileMenuBtn && mobileMenu && mobileMenuClose && mobileMenuOverlay) {
        mobileMenuBtn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            mobileMenu.classList.add("show");
            mobileMenuOverlay.classList.add("show");
            document.body.style.overflow = 'hidden';
            if (locoScroll) {
                locoScroll.stop();
            }
        });

        const closeMenu = (e) => {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            mobileMenu.classList.remove("show");
            mobileMenuOverlay.classList.remove("show");
            document.body.style.overflow = '';
            if (locoScroll) {
                locoScroll.start();
            }
        };

        mobileMenuClose.addEventListener("click", closeMenu);
        mobileMenuOverlay.addEventListener("click", closeMenu);
    }
}

function initNavLinks(locoScroll) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSelector = link.getAttribute('data-target');
            const targetElement = document.querySelector(targetSelector);

            const isMobileMenuOpen = document.querySelector('#mobile-menu.show');
            if (isMobileMenuOpen) {
                document.querySelector('#mobile-menu-close').click();
            }

            if (targetElement && locoScroll) {
                locoScroll.scrollTo(targetElement, {
                    duration: 1200,
                    easing: [0.25, 0.0, 0.35, 1.0]
                });
            } else if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    loadingAnimation();
    const locoScroll = locomotiveAnimation();
    cursorAnimation();
    footerAnimation();
    initMobileMenu(locoScroll);
    initNavLinks(locoScroll);
});
