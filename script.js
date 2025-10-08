let locoScroll;

function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  const scrollContainer = document.querySelector("#main");

  locoScroll = new LocomotiveScroll({
    el: scrollContainer,
    smooth: true,
    lerp: 0.1,
    getDirection: true
  });

  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy(scrollContainer, {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    pinType: scrollContainer.style.transform ? "transform" : "fixed",
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
      setInterval(function () {
        if (grow < 100) {
          h5timer.innerHTML = grow++;
        } else {
          h5timer.innerHTML = grow;
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
    gsap.to("#footer h1 span", { opacity: 0, stagger: 0.05 })
    gsap.to("#footer h2 span", { delay: 0.35, opacity: 1, stagger: 0.1 })
  })
  document.querySelector("#footer-text").addEventListener("mouseleave", function () {
    gsap.to("#footer h1 span", { opacity: 1, stagger: 0.1, delay: 0.35 })
    gsap.to("#footer h2 span", { opacity: 0, stagger: 0.05 })
  })
}

function initMobileMenu() {
  const mobileMenuBtn = document.querySelector("#mobile-menu-btn");
  const mobileMenu = document.querySelector("#mobile-menu");
  const mobileMenuClose = document.querySelector("#mobile-menu-close");
  const mobileMenuOverlay = document.querySelector("#mobile-menu-overlay");

  if (mobileMenuBtn && mobileMenu && mobileMenuClose && mobileMenuOverlay) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.add("show");
      mobileMenuOverlay.classList.add("show");
      document.body.style.overflow = 'hidden';
    });

    const closeMenu = () => {
      mobileMenu.classList.remove("show");
      mobileMenuOverlay.classList.remove("show");
      document.body.style.overflow = '';
    };

    mobileMenuClose.addEventListener("click", closeMenu);
    mobileMenuOverlay.addEventListener("click", closeMenu);
  }
}

function initNavLinks() {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      const mobileMenu = document.querySelector('#mobile-menu');
      const mobileMenuOverlay = document.querySelector('#mobile-menu-overlay');

      if (mobileMenu && mobileMenu.classList.contains('show')) {
        mobileMenu.classList.remove('show');
        if (mobileMenuOverlay) {
          mobileMenuOverlay.classList.remove('show');
        }
        document.body.style.overflow = '';
      }

      const targetSelector = link.getAttribute('data-target');
      const targetElement = document.querySelector(targetSelector);

      if (targetElement && locoScroll) {
        setTimeout(() => {
          locoScroll.scrollTo(targetElement, {
            offset: 0,
            duration: 1000,
            easing: [0.25, 0.0, 0.35, 1.0]
          });
        }, 300);
      }
    });
  });
}

cursorAnimation();
loadingAnimation();
locomotiveAnimation();
footerAnimation();
initMobileMenu();
initNavLinks();
