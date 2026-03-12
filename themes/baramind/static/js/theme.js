(() => {
  const storageKey = "baramind-theme";
  const html = document.documentElement;
  const toggles = () => Array.from(document.querySelectorAll("[data-theme-toggle]"));

  const setTheme = (value) => {
    html.setAttribute("data-theme", value);
    localStorage.setItem(storageKey, value);
    const label = value === "auto" ? "Auto" : value.charAt(0).toUpperCase() + value.slice(1);
    toggles().forEach((btn) => {
      const text = btn.querySelector("[data-theme-label]");
      if (text) {
        text.textContent = `Theme: ${label}`;
      }
    });
  };

  const stored = localStorage.getItem(storageKey);
  setTheme(stored || "auto");

  const cycle = () => {
    const current = html.getAttribute("data-theme") || "auto";
    if (current === "auto") { setTheme("light"); return; }
    if (current === "light") { setTheme("dark"); return; }
    setTheme("auto");
  };

  toggles().forEach((btn) => {
    btn.addEventListener("click", cycle);
  });

  /* Mobile nav toggle */
  const navToggle = document.querySelector("[data-nav-toggle]");
  const mobileNav = document.querySelector("[data-mobile-nav]");
  if (navToggle && mobileNav) {
    navToggle.addEventListener("click", () => {
      const open = mobileNav.getAttribute("data-open") === "true";
      mobileNav.setAttribute("data-open", open ? "false" : "true");
    });
    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.setAttribute("data-open", "false");
      });
    });
  }

  /* Header compact on scroll */
  const header = document.querySelector(".site-header");
  if (header) {
    const onScroll = () => {
      header.classList.toggle("compact", window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* PDF export for case studies */
  const pdfBtn = document.querySelector("[data-pdf-export]");
  if (pdfBtn) {
    pdfBtn.addEventListener("click", () => {
      window.print();
    });
  }
})();
