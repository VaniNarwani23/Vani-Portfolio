function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  const scrollContainer = document.querySelector("#main");
  const locoScroll = new LocomotiveScroll({
    el: scrollContainer,
    smooth: true,
    lerp: 0.08,
    multiplier: 1.1,
    smartphone: { smooth: true },
    tablet: { smooth: true }
  });

  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy(scrollContainer, {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, { duration: 0, disableLerp: true })
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight
      };
    },
    pinType: scrollContainer.style.transform ? "transform" : "fixed"
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();

  // Mobile menu elements
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileMenuClose = document.getElementById("mobile-menu-close");
  const mainContent = document.getElementById("main");

  // Toggle mobile menu
  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.add("show");
    mainContent.classList.add("main-blur");
    document.body.style.overflow = "hidden";
  });

  mobileMenuClose.addEventListener("click", () => {
    mobileMenu.classList.remove("show");
    mainContent.classList.remove("main-blur");
    document.body.style.overflow = "";
  });

  // Navigation handling for both desktop and mobile
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", function(e) {
      e.preventDefault();
      const target = this.getAttribute("data-target");
      
      // Close mobile menu if open
      if (mobileMenu.classList.contains("show")) {
        mobileMenu.classList.remove("show");
        mainContent.classList.remove("main-blur");
        document.body.style.overflow = "";
      }
      
      // Use vanilla JS scroll for mobile
      if (window.innerWidth <= 768) {
        const targetElement = document.querySelector(target);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // Use locomotive scroll for desktop
        setTimeout(() => {
          locoScroll.scrollTo(target, {
            offset: -100,
            duration: 1000,
            easing: [0.25, 0.0, 0.35, 1.0]
          });
        }, 300);
      }
    });
  });
}

function loadingAnimation() {
  var tl = gsap.timeline();
  tl.from(".line h1", {
    y: 150,
    stagger: 0.25,
    duration: 0.6,
    delay: 0.5,
  });
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
  tl.to(".line h2", {
    animationName: "loaderAnime",
    opacity: 1
  });
  tl.to("#loader", {
    opacity: 0,
    duration: 0.2,
    delay: 3,
  });
  tl.from("#page1", {
    delay: 0.2,
    y: -1600,
    opacity: 0,
    duration: 0.6,
    ease: "power4"
  });
  tl.to("#loader", {
    display: "none",
  });
  tl.from("#nav", {
    opacity: 0
  });
  tl.from("#hero h1,#hero2 h1 ,#hero3  h1,#hero4 h2,#hero5 h3", {
    y: 120,
    stagger: 0.2,
  });
}

function cursorAnimation() {
  document.addEventListener("mousemove", function (dets) {
    gsap.to("#crsr", {
      left: dets.x,
      top: dets.y
    });
  });
  
  const interactiveElements = document.querySelectorAll('a, button, .nav-link, #mobile-menu-btn, #mobile-menu-close');
  
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      document.getElementById('crsr').classList.add('hover-effect');
    });
    el.addEventListener('mouseleave', () => {
      document.getElementById('crsr').classList.remove('hover-effect');
    });
  });
}

function footerAnimation() {
  var clutter = ""
  var clutter2 = ""
  document.querySelector("#footer h1").textContent.split("").forEach(function (elem) {
    clutter += `<span>${elem}</span>`
  })
  document.querySelector("#footer h1").innerHTML = clutter
  document.querySelector("#footer h2").textContent.split("").forEach(function (elem) {
    clutter2 += `<span>${elem}</span>`
  })
  document.querySelector("#footer h2").innerHTML = clutter2

  document.querySelector("#footer-text").addEventListener("mouseenter", function () {
    gsap.to("#footer h1 span", {
      opacity: 0,
      stagger: 0.05
    })
    gsap.to("#footer h2 span", {
      delay: 0.35,
      opacity: 1,
      stagger: 0.1
    })
  })
  document.querySelector("#footer-text").addEventListener("mouseleave", function () {
    gsap.to("#footer h1 span", {
      opacity: 1,
      stagger: 0.1,
      delay: 0.35,
    })
    gsap.to("#footer h2 span", {
      opacity: 0,
      stagger: 0.05
    })
  })
}

// Initialize all functions
document.addEventListener("DOMContentLoaded", function() {
  cursorAnimation();
  loadingAnimation();
  locomotiveAnimation();
  footerAnimation();
});