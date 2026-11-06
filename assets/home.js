(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const slides = [
    {
      title: "NUMERON",
      kicker: "ANDROID GAME · PUZZLE SURVIVAL",
      description: "숫자 연쇄로 은하를 지키고, 무너지는 전장을 뒤집으세요.",
      href: "/go/numeron/",
      alt: "NUMERON의 우주 숫자 전투 아트",
    },
    {
      title: "집값의 신",
      kicker: "ANDROID GAME · ECONOMY SIMULATION",
      description: "가상 도시의 시장을 읽고, 나만의 부동산 포트폴리오를 만드세요.",
      href: "/go/apt-market/",
      alt: "집값의 신: 한 달만 더의 도시 투자 시뮬레이션 아트",
    },
    {
      title: "밤티월드",
      kicker: "LIVE WEB WORLD · SOCIAL MINIHOME",
      description: "미니룸을 꾸미고, 미니미와 친구들의 방명록으로 이어지는 작은 웹 세계.",
      href: "/go/bamtiworld/",
      alt: "밤티월드의 노을 진 미니룸",
    },
  ];

  const feature = document.querySelector(".feature-visual");
  const featureArts = [...document.querySelectorAll(".feature-art")];
  const dots = [...document.querySelectorAll(".slide-dot")];
  const title = document.getElementById("feature-title");
  const kicker = document.getElementById("feature-kicker");
  const description = document.getElementById("feature-description");
  const featureLink = document.getElementById("feature-link");
  const featureCaption = document.querySelector(".feature-caption");
  let announcementTimer;
  const featureIndex = document.getElementById("feature-index");
  const toggle = document.getElementById("carousel-toggle");
  let activeSlide = 0;
  let pointerFrame = 0;
  let hovered = false;
  let focused = false;
  let manuallyPaused = reduceMotion.matches;

  function setSlide(nextIndex, announce = false) {
    featureCaption.setAttribute("aria-live", announce ? "polite" : "off");
    if (announcementTimer) window.clearTimeout(announcementTimer);
    activeSlide = (nextIndex + slides.length) % slides.length;
    const slide = slides[activeSlide];
    featureArts.forEach((art, index) => {
      const active = index === activeSlide;
      art.classList.toggle("is-active", active);
      art.setAttribute("aria-hidden", String(!active));
    });
    dots.forEach((dot, index) => {
      const active = index === activeSlide;
      dot.classList.toggle("is-active", active);
      dot.setAttribute("aria-current", String(active));
      dot.tabIndex = active ? 0 : -1;
    });
    title.textContent = slide.title;
    kicker.textContent = slide.kicker;
    description.textContent = slide.description;
    featureLink.href = slide.href;
    featureIndex.innerHTML = `${String(activeSlide + 1).padStart(2, "0")} <i>/</i> ${String(slides.length).padStart(2, "0")}`;
    feature.setAttribute("aria-label", `${slide.title}: ${slide.description}`);
    if (announce) announcementTimer = window.setTimeout(() => featureCaption.setAttribute("aria-live", "off"), 1800);
  }

  function updateToggle() {
    toggle.classList.toggle("is-paused", manuallyPaused);
    toggle.setAttribute("aria-pressed", String(manuallyPaused));
    toggle.setAttribute("aria-label", manuallyPaused ? "슬라이드 자동 재생 시작" : "슬라이드 자동 재생 멈춤");
  }

  dots.forEach((dot) => dot.addEventListener("click", () => setSlide(Number(dot.dataset.goSlide), true)));
  document.querySelectorAll("[data-slide-step]").forEach((button) => {
    button.addEventListener("click", () => setSlide(activeSlide + Number(button.dataset.slideStep), true));
  });
  dots.forEach((dot, index) => dot.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === "Home" ? 0 : event.key === "End" ? slides.length - 1 : index + (event.key === "ArrowRight" ? 1 : -1);
    setSlide(next, true);
    dots[activeSlide].focus();
  }));
  toggle.addEventListener("click", () => { manuallyPaused = !manuallyPaused; updateToggle(); });
  feature.addEventListener("mouseenter", () => { hovered = true; });
  feature.addEventListener("mouseleave", () => { hovered = false; });
  feature.addEventListener("focusin", () => { focused = true; });
  feature.addEventListener("focusout", (event) => { if (!feature.contains(event.relatedTarget)) focused = false; });
  reduceMotion.addEventListener?.("change", (event) => {
    if (event.matches) manuallyPaused = true;
    updateToggle();
  });
  updateToggle();
  window.setInterval(() => {
    if (!manuallyPaused && !hovered && !focused && document.visibilityState === "visible") setSlide(activeSlide + 1);
  }, 7200);

  const filterButtons = [...document.querySelectorAll(".filter-button")];
  const cards = [...document.querySelectorAll(".project-card")];
  const search = document.getElementById("project-search");
  const status = document.getElementById("filter-status");
  const emptyState = document.getElementById("empty-state");
  let currentFilter = "all";

  function applyFilters() {
    const query = search.value.trim().toLocaleLowerCase("ko");
    let visible = 0;
    cards.forEach((card) => {
      const platforms = card.dataset.platform.split(/\s+/);
      const platformMatch = currentFilter === "all" || (currentFilter === "preparing" ? card.dataset.stage === "preparing" : platforms.includes(currentFilter));
      const text = `${card.dataset.search} ${card.textContent}`.toLocaleLowerCase("ko");
      const textMatch = !query || text.includes(query);
      const show = platformMatch && textMatch;
      card.hidden = !show;
      if (show) visible += 1;
    });
    emptyState.hidden = visible > 0;
    status.textContent = query ? `검색 결과 ${visible}개 표시` : `프로젝트 ${visible}개 표시`;
  }

  function chooseFilter(filter) {
    currentFilter = filter;
    filterButtons.forEach((button) => {
      const active = button.dataset.filter === filter;
      button.classList.toggle("is-selected", active);
      button.setAttribute("aria-pressed", String(active));
    });
    applyFilters();
  }

  filterButtons.forEach((button) => button.addEventListener("click", () => chooseFilter(button.dataset.filter)));
  emptyState.querySelector("[data-filter]").addEventListener("click", () => {
    search.value = "";
    chooseFilter("all");
  });
  search.addEventListener("input", applyFilters);
  document.querySelectorAll("[data-count]").forEach((count) => {
    const filter = count.dataset.count;
    count.textContent = cards.filter((card) => filter === "all" || (filter === "preparing" ? card.dataset.stage === "preparing" : card.dataset.platform.split(/\s+/).includes(filter))).length;
  });
  document.querySelectorAll("[data-metric]").forEach((metric) => {
    metric.textContent = String((metric.dataset.metric === "all" ? cards.length : cards.filter((card) => card.dataset.platform.split(/\s+/).includes(metric.dataset.metric)).length)).padStart(2, "0");
  });

  const header = document.querySelector(".header");
  const progress = document.getElementById("scroll-progress");
  function updateScroll() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${maxScroll > 0 ? Math.min(100, (window.scrollY / maxScroll) * 100) : 0}%`;
    header.classList.toggle("is-scrolled", window.scrollY > 15);
  }
  window.addEventListener("scroll", updateScroll, { passive: true });
  window.addEventListener("resize", updateScroll, { passive: true });
  updateScroll();

  document.documentElement.classList.add("js-motion");
  if ("IntersectionObserver" in window && !reduceMotion.matches) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in-view");
        currentObserver.unobserve(entry.target);
      });
    }, { threshold: 0.11, rootMargin: "0px 0px -24px 0px" });
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
  } else {
    document.querySelectorAll(".reveal").forEach((element) => element.classList.add("in-view"));
  }

  if (feature && window.matchMedia("(pointer:fine)").matches && !reduceMotion.matches) {
    feature.addEventListener("pointermove", (event) => {
      const rect = feature.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * -9;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * -7;
      if (pointerFrame) cancelAnimationFrame(pointerFrame);
      pointerFrame = requestAnimationFrame(() => {
        feature.style.setProperty("--feature-x", `${x}px`);
        feature.style.setProperty("--feature-y", `${y}px`);
      });
    });
    feature.addEventListener("pointerleave", () => {
      feature.style.setProperty("--feature-x", "0px");
      feature.style.setProperty("--feature-y", "0px");
    });
  }
})();
