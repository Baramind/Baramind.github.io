(() => {
  const html = document.documentElement;
  const KEY = "baramind-theme";
  const order = ["auto", "light", "dark"];

  /* Theme: auto → light → dark */
  const setTheme = (t) => {
    html.setAttribute("data-theme", t);
    try { localStorage.setItem(KEY, t); } catch (e) {}
    document.querySelectorAll("[data-theme-toggle]").forEach((b) => b.setAttribute("aria-label", `Colour theme: ${t}`));
  };
  setTheme(html.getAttribute("data-theme") || "auto");
  document.querySelectorAll("[data-theme-toggle]").forEach((b) =>
    b.addEventListener("click", () => {
      const cur = html.getAttribute("data-theme") || "auto";
      setTheme(order[(order.indexOf(cur) + 1) % order.length]);
    })
  );

  /* Mobile nav */
  const toggle = document.querySelector("[data-nav-toggle]");
  const menu = document.querySelector("[data-mobile-nav]");
  if (toggle && menu) {
    const set = (open) => {
      menu.setAttribute("data-open", String(open));
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    };
    toggle.addEventListener("click", () => set(menu.getAttribute("data-open") !== "true"));
    menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => set(false)));
  }

  /* Reveal on scroll */
  const items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && items.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -10% 0px" });
    items.forEach((el) => io.observe(el));
  } else {
    items.forEach((el) => el.classList.add("is-in"));
  }

  /* Contact form: posts to the configured endpoint, otherwise opens an email */
  const form = document.querySelector("[data-contact]");
  if (form) {
    const status = form.querySelector("[data-status]");
    form.addEventListener("submit", async (ev) => {
      ev.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      if (data.get("_gotcha")) return;
      const endpoint = form.getAttribute("action") || "";
      if (endpoint.startsWith("http")) {
        status.textContent = "Sending…";
        try {
          const res = await fetch(endpoint, { method: "POST", body: data, headers: { Accept: "application/json" } });
          if (!res.ok) throw new Error(String(res.status));
          form.reset();
          status.textContent = "Thanks — we'll be in touch within one business day.";
        } catch (e) {
          status.textContent = `That didn't send. Please email ${form.dataset.email}.`;
        }
        return;
      }
      const body =
        `Hi, I'm ${data.get("name")} from ${data.get("company")}.\n` +
        `We'd like help with ${data.get("topic")}.\n\n` +
        `${data.get("message") || ""}\n\nReach me at ${data.get("email")}.`;
      const subject = `Enquiry: ${data.get("topic")}`;
      window.location.href = `mailto:${form.dataset.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }
})();
