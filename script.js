function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  const scrollContainer = document.querySelector("#main");
  if (!scrollContainer) return;

  // Mobile menu toggle and integration (runs on all devices)
  const menuToggle = document.querySelector('#menu-toggle');
  const mobileMenu = document.querySelector('#mobile-menu');
  const closeMenu = () => {
    if (!mobileMenu) return;
    mobileMenu.setAttribute('aria-hidden', 'true');
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };
  const openMenu = () => {
    if (!mobileMenu) return;
    mobileMenu.setAttribute('aria-hidden', 'false');
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'true');
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
    document.querySelectorAll('.mobile-menu-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetSelector = link.getAttribute('data-target');
        const targetElement = document.querySelector(targetSelector);
        if (!targetElement) return;
        closeMenu();
        // Use native smooth scroll for reliability on phones
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  // Fallback to native scroll on small screens to ensure reliability
  const useLoco = window.matchMedia('(min-width: 768px)').matches;
  if (!useLoco) {
    document.body.classList.remove('has-locomotive');
    // Native smooth scroll for nav links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetSelector = link.getAttribute('data-target');
        const targetElement = document.querySelector(targetSelector);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
    // Project links should just open normally
    return;
  }

  const locoScroll = new LocomotiveScroll({
    el: scrollContainer,
    smooth: true,
    lerp: 0.1,
    getDirection: true,
    smartphone: { smooth: true },
    tablet: { smooth: true }
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
  document.body.classList.add('has-locomotive');

  // Ensure updates after load and late-loading assets
  window.addEventListener('load', () => {
    locoScroll.update();
    ScrollTrigger.refresh();
  });
  document.querySelectorAll('img').forEach((img) => {
    if (!img.complete) {
      img.addEventListener('load', () => {
        locoScroll.update();
        ScrollTrigger.refresh();
      }, { once: true });
    }
  });

  // ✅ Add this to make nav links work
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault(); // prevent default behavior

      const targetSelector = link.getAttribute('data-target');
      const targetElement = document.querySelector(targetSelector);
      
      if (targetElement) {
        locoScroll.scrollTo(targetElement, { offset: 0, duration: 800 }); // smooth scroll
      }
    });
  });

  // Mobile stability refreshes
  window.addEventListener('load', () => {
    setTimeout(() => { locoScroll.update(); ScrollTrigger.refresh(); }, 0);
  });
  ['orientationchange','resize'].forEach(evt => {
    window.addEventListener(evt, () => {
      setTimeout(() => { locoScroll.update(); ScrollTrigger.refresh(); }, 120);
    });
  });

  // Ensure project cards always open their links in a new tab
  document.querySelectorAll('.project-card[href]').forEach((card) => {
    card.addEventListener('click', (e) => {
      const href = card.getAttribute('href');
      if (!href || href === '#') return; // nothing to open
      // If Locomotive or any other handler blocks default, force open
      if (!e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        window.open(href, '_blank', 'noopener');
      }
      e.stopPropagation();
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
