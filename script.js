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
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: scrollContainer.style.transform ? "transform" : "fixed",
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();

  // Make nav links scroll smoothly
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
  Shery.makeMagnet("#nav-part2");
}

function mobileMenuAnimation() {
  const mobileMenuBtn = document.querySelector("#mobile-menu-btn");
  const mobileMenu = document.querySelector("#mobile-menu");
  const mobileMenuClose = document.querySelector("#mobile-menu-close");
  const mobileMenuLinks = document.querySelectorAll("#mobile-menu-links .nav-link");
  
  if (!mobileMenuBtn || !mobileMenu || !mobileMenuClose) return;

  // Open mobile menu
  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.add("show");
    document.body.style.overflow = "hidden"; // Prevent background scrolling
    document.body.classList.add("menu-open");
    
    // Animate menu items
    gsap.fromTo("#mobile-menu-links h4", 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        stagger: 0.1, 
        ease: "power2.out",
        delay: 0.2
      }
    );
  });
  
  // Close mobile menu
  function closeMobileMenu() {
    mobileMenu.classList.remove("show");
    document.body.style.overflow = "auto"; // Restore scrolling
    document.body.classList.remove("menu-open");
  }
  
  mobileMenuClose.addEventListener("click", closeMobileMenu);
  
  // Close menu when clicking on a link
  mobileMenuLinks.forEach(link => {
    link.addEventListener("click", () => {
      setTimeout(closeMobileMenu, 300); // Small delay for smooth transition
    });
  });
  
  // Close menu when clicking outside (on the backdrop)
  mobileMenu.addEventListener("click", (e) => {
    if (e.target === mobileMenu) {
      closeMobileMenu();
    }
  });
  
  // Close menu on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileMenu.classList.contains("show")) {
      closeMobileMenu();
    }
  });
}

function enhancedAnimations() {
  // Enhanced scroll animations for new sections
  gsap.registerPlugin(ScrollTrigger);
  
  // Certifications animation
  gsap.fromTo(".cert-card", 
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#page7",
        start: "top 80%",
        scroller: "#main"
      }
    }
  );
  
  // Enhanced project cards animation
  gsap.fromTo(".project-card", 
    { opacity: 0, scale: 0.9 },
    {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      stagger: 0.15,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: "#page6",
        start: "top 80%",
        scroller: "#main"
      }
    }
  );
  
  // Skills container animation
  gsap.fromTo("#page2 img", 
    { opacity: 0, scale: 0.8, rotation: -10 },
    {
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: 0.5,
      stagger: 0.05,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: "#page2",
        start: "top 70%",
        scroller: "#main"
      }
    }
  );
}

function footerAnimation() {
  var clutter = ""
  var clutter2 = ""
  document.querySelector("#footer h1").textContent.split("").forEach(function (elem) {
    clutter += `<span>${elem}</span>`
  })
  document.querySelector("#footer h1").innerHTML = clutter

  // Enhanced footer hover effect
  document.querySelector("#footer h1").addEventListener("mouseenter", function () {
    gsap.to("#footer h1 span", {
      color: "#38cdfa",
      stagger: 0.05,
      duration: 0.3
    })
  })
  
  document.querySelector("#footer h1").addEventListener("mouseleave", function () {
    gsap.to("#footer h1 span", {
      color: "#fff",
      stagger: 0.05,
      duration: 0.3
    })
  })
}

// Initialize all functions
cursorAnimation()
loadingAnimation()
locomotiveAnimation()
mobileMenuAnimation()
enhancedAnimations()
footerAnimation()