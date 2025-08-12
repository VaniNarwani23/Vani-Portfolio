function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  const scrollContainer = document.querySelector("#main");
  if (!scrollContainer) return;

  // Initialize Locomotive Scroll
  const locoScroll = new LocomotiveScroll({
    el: scrollContainer,
    smooth: true,
    lerp: 0.1,
    getDirection: true,
    smartphone: { smooth: true },
    tablet: { smooth: true }
  });

  scrollContainer.locomotive = locoScroll;
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

  ScrollTrigger.defaults({ scroller: scrollContainer });
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();

  // Mobile menu toggle
  const menuToggle = document.querySelector('#menu-toggle');
  const mobileMenu = document.querySelector('#mobile-menu');
  
  const closeMenu = () => {
    mobileMenu.setAttribute('aria-hidden', 'true');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };
  
  const openMenu = () => {
    mobileMenu.setAttribute('aria-hidden', 'false');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };
  
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = mobileMenu.getAttribute('aria-hidden') === 'false';
      if (isOpen) closeMenu(); else openMenu();
    });
    
    mobileMenu.addEventListener('click', (e) => {
      if (e.target === mobileMenu) closeMenu();
    });
  }

  // Smooth scrolling for nav links
  const scrollToSection = (targetElement) => {
    if (!targetElement) return;
    
    const offset = 100; // Adjust based on your navbar height
    
    if (locoScroll) {
      locoScroll.scrollTo(targetElement, {
        offset: -offset,
        duration: 1000,
        disableLerp: false
      });
    } else {
      const targetPosition = targetElement.offsetTop - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
    
    closeMenu();
  };

  // Handle nav link clicks
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetSelector = link.getAttribute('data-target');
      const targetElement = document.querySelector(targetSelector);
      scrollToSection(targetElement);
    });
  });

  // Update active nav link on scroll
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('[data-scroll-section]');
  
  function updateActiveLink() {
    let fromTop = locoScroll ? locoScroll.scroll.instance.scroll.y : window.scrollY;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = `#${section.id}`;
      
      if (fromTop >= sectionTop - 200 && fromTop < sectionTop + sectionHeight - 200) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('data-target') === sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  
  // Listen to scroll events
  if (locoScroll) {
    locoScroll.on('scroll', updateActiveLink);
  } else {
    window.addEventListener('scroll', updateActiveLink);
  }
  
  // Initialize active link
  updateActiveLink();

  // Refresh on resize
  window.addEventListener('resize', () => {
    setTimeout(() => {
      locoScroll.update();
      ScrollTrigger.refresh();
    }, 100);
  });

  // Ensure project cards open in new tab
  document.querySelectorAll('.project-card[href]').forEach(card => {
    card.addEventListener('click', (e) => {
      if (!e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        window.open(card.getAttribute('href'), '_blank', 'noopener');
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
  tl.from("#hero1 h1,#hero2 h1,#hero3 h1,#hero4 h2,#hero5 h3", {
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

function footerAnimation() {
  const footerH1 = document.querySelector("#footer h1");
  if (!footerH1) return;
  let clutter = "";
  footerH1.textContent.split("").forEach(function (elem) {
    clutter += `<span>${elem}</span>`
  });
  footerH1.innerHTML = clutter;
  // Make the hover interaction optional/safe
  const footerText = document.querySelector('#footer-text');
  const footerH2 = document.querySelector('#footer h2');
  if (footerText && footerH2) {
    let clutter2 = "";
    footerH2.textContent.split("").forEach(function (elem) {
      clutter2 += `<span>${elem}</span>`
    });
    footerH2.innerHTML = clutter2;
    footerText.addEventListener('mouseenter', function(){
      gsap.to('#footer h1 span', { opacity: 0, stagger: 0.05 });
      gsap.to('#footer h2 span', { delay: 0.35, opacity: 1, stagger: 0.1 });
    });
    footerText.addEventListener('mouseleave', function(){
      gsap.to('#footer h1 span', { opacity: 1, stagger: 0.1, delay: 0.35 });
      gsap.to('#footer h2 span', { opacity: 0, stagger: 0.05 });
    });
  }
}

cursorAnimation()
loadingAnimation()
locomotiveAnimation()
footerAnimation()

// Ensure mail links are not blocked by smooth scroll
['#mailto-link', '#gmail-link'].forEach((sel) => {
  const el = document.querySelector(sel);
  if (!el) return;
  el.addEventListener('click', (e) => {
    e.stopPropagation();
  });
});
