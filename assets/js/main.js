(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled
   */
  function toggleScrolled() {
    const selectBody = document.body;
    const selectHeader = document.querySelector("#header");
    if (
      !selectHeader?.classList.contains("scroll-up-sticky") &&
      !selectHeader?.classList.contains("sticky-top") &&
      !selectHeader?.classList.contains("fixed-top")
    )
      return;
    window.scrollY > 100
      ? selectBody.classList.add("scrolled")
      : selectBody.classList.remove("scrolled");
  }

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");
  function mobileNavToggle() {
    if (!mobileNavToggleBtn) return;
    document.body.classList.toggle("mobile-nav-active");
    mobileNavToggleBtn.classList.toggle("bi-list");
    mobileNavToggleBtn.classList.toggle("bi-x");
  }
  mobileNavToggleBtn?.addEventListener("click", mobileNavToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll("#navmenu a").forEach((navmenu) => {
    navmenu.addEventListener("click", () => {
      if (document.body.classList.contains("mobile-nav-active")) {
        mobileNavToggle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll(".navmenu .toggle-dropdown").forEach((navmenu) => {
    navmenu.addEventListener("click", function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle("active");
      this.parentNode.nextElementSibling?.classList.toggle("dropdown-active");
      e.stopImmediatePropagation();
    });
  });

  /**
   * Scroll top button
   */
  const scrollTop = document.querySelector(".scroll-top");
  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    }
  }
  scrollTop?.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /**
   * Animation on scroll (AOS) initialization
   */
  function aosInit() {
    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: 600,
        easing: "ease-in-out",
        once: true,
        mirror: false,
      });
    }
  }

  /**
   * Initiate glightbox
   */
  function initGlightbox() {
    if (typeof GLightbox !== "undefined") {
      GLightbox({ selector: ".glightbox" });
    }
  }

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach((swiperElement) => {
      const configElement = swiperElement.querySelector(".swiper-config");
      if (!configElement) return;
      try {
        const config = JSON.parse(configElement.innerHTML.trim());
        if (swiperElement.classList.contains("swiper-tab")) {
          initSwiperWithCustomPagination(swiperElement, config);
        } else {
          new Swiper(swiperElement, config);
        }
      } catch (error) {
        console.error("Failed to parse Swiper config:", error);
      }
    });
  }

  /**
   * Initiate Pure Counter
   */
  function initPureCounter() {
    if (typeof PureCounter !== "undefined") {
      new PureCounter();
    }
  }

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll(".faq-item h3, .faq-item .faq-toggle").forEach((faqItem) => {
    faqItem.addEventListener("click", () => {
      faqItem.parentNode.classList.toggle("faq-active");
    });
  });

  /**
   * Correct scrolling position for hash links on page load
   */
  function correctHashScroll() {
    if (window.location.hash) {
      const section = document.querySelector(window.location.hash);
      if (section) {
        setTimeout(() => {
          const scrollMarginTop = parseInt(getComputedStyle(section).scrollMarginTop) || 0;
          window.scrollTo({
            top: section.offsetTop - scrollMarginTop,
            behavior: "smooth",
          });
        }, 100);
      }
    }
  }

  /**
   * Navmenu Scrollspy
   */
  const navmenulinks = document.querySelectorAll(".navmenu a");
  function navmenuScrollspy() {
    navmenulinks.forEach((navmenulink) => {
      if (!navmenulink.hash) return;
      const section = document.querySelector(navmenulink.hash);
      if (!section) return;
      const position = window.scrollY + 200;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        document
          .querySelectorAll(".navmenu a.active")
          .forEach((link) => link.classList.remove("active"));
        navmenulink.classList.add("active");
      } else {
        navmenulink.classList.remove("active");
      }
    });
  }

  /**
   * Accordion icon toggle
   */
  document.querySelectorAll(".accordion-button").forEach((button) => {
    button.addEventListener("click", () => {
      const icon = button.querySelector(".accordion-icon");
      if (icon) {
        icon.textContent = button.classList.contains("collapsed") ? "+" : "-";
      }
    });
  });


  /**
   * Initialize all features on load and scroll
   */
  function initAll() {
    toggleScrolled();
    toggleScrollTop();
    aosInit();
    initGlightbox();
    initSwiper();
    initPureCounter();
    correctHashScroll();
    navmenuScrollspy();
  }

  window.addEventListener("load", initAll);
  document.addEventListener("scroll", () => {
    toggleScrolled();
    toggleScrollTop();
    navmenuScrollspy();
  });
})();