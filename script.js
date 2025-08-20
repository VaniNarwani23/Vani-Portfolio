function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  const scrollContainer = document.querySelector("#main");

  const locoScroll = new LocomotiveScroll({
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

  // ✅ Smooth scroll nav links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetSelector = link.getAttribute('data-target');
      const targetElement = document.querySelector(targetSelector);
      if (targetElement) {
        locoScroll.scrollTo(targetElement);
      }
    });
  });
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

cursorAnimation();
loadingAnimation();
locomotiveAnimation();
footerAnimation();

// ✅ Mobile Menu Toggle
const mobileMenuBtn = document.querySelector("#mobile-menu-btn");
const mobileMenu = document.querySelector("#mobile-menu");
const mobileMenuClose = document.querySelector("#mobile-menu-close");

mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.add("show");
});
mobileMenuClose.addEventListener("click", () => {
  mobileMenu.classList.remove("show");
});
document.querySelectorAll("#mobile-menu-links .nav-link").forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("show");
  });
});
