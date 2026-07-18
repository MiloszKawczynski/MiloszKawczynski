const artworks = [
  {
    src: "./PixelartCV2025.gif",
    alt: "Character Sheet",
    title: "Character Sheet",
    date: "2025",
    description: "Inspired by RPG character sheets, specifically Call of Cthulu, and the form of a CV, this work showcases my artistic and programming skills, recognizable attributes, and achievements. Originally created in 2024 in several color variations, it was then updated in 2025.\n\n210 x 297\n156 frames\n10 fps",
    size: 2
  },
  {
    src: "./EatThemAll.gif",
    alt: "Eat 'Em All",
    title: "Eat 'Em All",
    date: "2024",
    description: "The work was created in collaboration with the Gastromachina restaurant. Inspired by the effect of throwing a Poké Ball from Pokémon.\n\n202 x 268\n154 frames\n20 fps",
    size: 2
  },
  {
    src: "./gastromachinaAudioriver.gif",
    alt: "Gastromachina x Audioriver",
    title: "Gastromachina x Audioriver",
    date: "2024",
    description: "The work was created in collaboration with the Gastromachina restaurant and advertised their presence at the Audioriver event.\n\n176 x 132\n8 frames\n10 fps",
    size: 2
  },
  {
    src: "./SikeSpiegel.gif",
    alt: "Spike Spiegel",
    title: "Spike Spiegel",
    date: "2024",
    description: "The work presents the main character of the anime Cowboy Bebop and his starship. For me, this piece was an experiment ground for picking color palettes and overshooting the animation.\n\n170 x 124\n34 frames\n10 fps",
    size: 2
  },
  {
    src: "./RandomClearBurger.gif",
    alt: "Burger Construct",
    title: "Burger Construct",
    date: "2024",
    description: "The work was created in collaboration with the Gastromachina restaurant.\n\n202 x 268\n141 frames\n12.5 fps",
    size: 2
  },
  {
    src: "./LetsAllLoveLain.gif",
    alt: "Let's All Love Lain",
    title: "Let's All Love Lain",
    date: "2024",
    description: "The work presents the main character of the anime Serial Experiments Lain and the iconic line from the series 'Let's All Love Lain'\n\n156 x 108\n24 frames\n10 fps",
    size: 2
  },
  {
    src: "./TheLittleFight.gif",
    alt: "The Little Ones – Little Fight",
    title: "The Little Ones – Little Fight",
    date: "2022",
    description: "The work was created as a mockup of a GameBoy Advance-style game. It was followed up by a [simple game](https://gamejolt.com/games/TheLittleOnes/745037) using this animation as a cutscene and part of it as assets.\n\n240 x 160\n100 frames\n10 fps",
    size: 2
  },
  {
    src: "./TheLittleOnesVsDog.gif",
    alt: "The Little Ones – Vs Dog",
    title: "The Little Ones – Vs Dog",
    date: "2025",
    description: "The work was created as a challenge to create pixel art with a convergence perspective.\n\n240 x 160\n28 frames\n10 fps",
    size: 4
  },
  {
    src: "./TheLittleOnesCharacters.gif",
    alt: "The Little Ones – Characters",
    title: "The Little Ones – Characters",
    date: "2022 – …",
    description: "This work was created as a learning experience in character design and animation. New characters and scenes are added regularly.\n\n599 x 413\n24 frames\n10 fps",
    size: 4
  },
  {
    src: "./gastromachina_mobile.gif",
    alt: "Gastrotruck",
    title: "Gastrotruck",
    date: "2024",
    description: "The work was created in collaboration with the Gastromachina restaurant.\n\n268 x 133\n80 frames\n10 fps",
    size: 4
  }
];

const GRID_COLUMNS = 12;
const ROW_UNIT = 2;
const GAP = 8;
const DEFAULT_RATIO = 1;

const LOAD_ROOT_MARGIN = "400px 0px";
const MAX_CONCURRENT_LOADS = 4;

const galleryEl = document.getElementById("pixelGallery");
let loadedItems = [];

function getBaseSpan() {
  const w = window.innerWidth;
  if (w <= 700) return 6;
  if (w <= 1100) return 4;
  return 3;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

const loadQueue = [];
let activeLoads = 0;

function enqueueLoad(entry) {
  if (entry.status !== "pending") return;
  entry.status = "queued";
  loadQueue.push(entry);
  processQueue();
}

function processQueue() {
  while (activeLoads < MAX_CONCURRENT_LOADS && loadQueue.length) {
    const entry = loadQueue.shift();
    startLoading(entry);
  }
}

function startLoading(entry) {
  entry.status = "loading";
  activeLoads++;

  const finish = () => {
    activeLoads--;
    processQueue();
  };

  entry.imgEl.addEventListener("load", () => {
    entry.ratio = entry.imgEl.naturalWidth / entry.imgEl.naturalHeight || DEFAULT_RATIO;
    entry.status = "loaded";
    scheduleRelayout();
    finish();
  }, { once: true });

  entry.imgEl.addEventListener("error", () => {
    entry.status = "error";
    finish();
  }, { once: true });

  entry.imgEl.src = entry.data.src;
}

function buildItemElement(item, index) {
  const wrap = document.createElement("div");
  wrap.className = "pixel-item bounce-target";
  wrap.setAttribute("role", "button");
  wrap.setAttribute("tabindex", "0");
  wrap.setAttribute("aria-label", `Otwórz w powiększeniu: ${item.title}`);

  const img = document.createElement("img");
  img.alt = item.alt || item.title || "";

  const overlay = document.createElement("div");
  overlay.className = "pixel-item__overlay";
  const overlayTitle = document.createElement("span");
  overlayTitle.className = "pixel-item__overlay-title";
  overlayTitle.textContent = item.title || "";
  overlay.appendChild(overlayTitle);

  wrap.appendChild(img);
  wrap.appendChild(overlay);

  const open = () => openLightbox(index);
  wrap.addEventListener("click", open);
  wrap.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      open();
    }
  });

  return { wrapEl: wrap, imgEl: img };
}

function layoutGallery() {
  if (!loadedItems.length) return;

  const containerWidth = galleryEl.clientWidth;
  const baseSpan = getBaseSpan();
  const colWidth = (containerWidth - GAP * (GRID_COLUMNS - 1)) / GRID_COLUMNS;

  loadedItems.forEach(({ wrapEl, ratio, data }) => {
    const size = data.size && data.size > 0 ? data.size : 1;
    const colSpan = clamp(Math.round(size * baseSpan), 1, GRID_COLUMNS);

    const itemWidthPx = colSpan * colWidth + GAP * (colSpan - 1);
    const itemHeightPx = itemWidthPx / (ratio || DEFAULT_RATIO);
    const rowSpan = Math.max(1, Math.round((itemHeightPx + GAP) / (ROW_UNIT + GAP)));

    wrapEl.style.gridColumn = `span ${colSpan}`;
    wrapEl.style.gridRow = `span ${rowSpan}`;
  });
}

let relayoutScheduled = false;
function scheduleRelayout() {
  if (relayoutScheduled) return;
  relayoutScheduled = true;
  requestAnimationFrame(() => {
    relayoutScheduled = false;
    layoutGallery();
  });
}

function initGallery() {
  loadedItems = artworks.map((item, i) => {
    const { wrapEl, imgEl } = buildItemElement(item, i);
    galleryEl.appendChild(wrapEl);
    return { data: item, ratio: DEFAULT_RATIO, wrapEl, imgEl, status: "pending" };
  });

  layoutGallery();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((observerEntry) => {
        if (!observerEntry.isIntersecting) return;
        const entry = loadedItems.find((it) => it.wrapEl === observerEntry.target);
        if (!entry) return;
        enqueueLoad(entry);
        observer.unobserve(observerEntry.target);
      });
    },
    { rootMargin: LOAD_ROOT_MARGIN }
  );

  loadedItems.forEach((entry) => observer.observe(entry.wrapEl));
}

let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(layoutGallery, 120);
});

initGallery();

const lightboxEl = document.getElementById("pixelLightbox");
const lightboxImage = document.getElementById("pixelLightboxImage");
const lightboxImageWrap = lightboxImage.parentElement;
const lightboxTitle = document.getElementById("pixelLightboxTitle");
const lightboxDate = document.getElementById("pixelLightboxDate");
const lightboxDescription = document.getElementById("pixelLightboxDescription");
const lightboxClose = document.getElementById("pixelLightboxClose");
const lightboxPrev = document.getElementById("pixelLightboxPrev");
const lightboxNext = document.getElementById("pixelLightboxNext");

let currentIndex = 0;

function sizeLightboxImage() {
  const naturalWidth = lightboxImage.naturalWidth;
  const naturalHeight = lightboxImage.naturalHeight;
  if (!naturalWidth || !naturalHeight) return;

  const availableWidth = lightboxImageWrap.clientWidth;
  const availableHeight = lightboxImageWrap.clientHeight;
  if (!availableWidth || !availableHeight) return;

  const ratio = naturalWidth / naturalHeight;
  let displayWidth = availableWidth;
  let displayHeight = displayWidth / ratio;

  if (displayHeight > availableHeight) {
    displayHeight = availableHeight;
    displayWidth = displayHeight * ratio;
  }

  lightboxImage.style.width = `${displayWidth}px`;
  lightboxImage.style.height = `${displayHeight}px`;
}

lightboxImage.addEventListener("load", sizeLightboxImage);

window.addEventListener("resize", () => {
  if (lightboxEl.classList.contains("is-open")) sizeLightboxImage();
});

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatDescription(str) {
  const escaped = escapeHtml(str || "");
  return escaped.replace(
    /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener" class="pixel-lightbox__desc-link">$1</a>'
  );
}

function renderLightbox(index) {
  const item = artworks[index];
  if (!item) return;

  currentIndex = index;
  lightboxImage.src = item.src;
  lightboxImage.alt = item.alt || item.title || "";
  lightboxTitle.textContent = item.title || "";
  lightboxDate.textContent = item.date || "";
  lightboxDescription.innerHTML = formatDescription(item.description);
}

function setGridBounceEnabled(enabled) {
  loadedItems.forEach(({ wrapEl }) => {
    wrapEl.classList.toggle("bounce-target", enabled);
  });
}

function openLightbox(index) {
  renderLightbox(index);
  lightboxEl.classList.add("is-open");
  document.body.style.overflow = "hidden";
  setGridBounceEnabled(false);
}

function closeLightbox() {
  lightboxEl.classList.remove("is-open");
  document.body.style.overflow = "";
  lightboxImage.src = "";
  setGridBounceEnabled(true);
}

function showRelative(offset) {
  const next = (currentIndex + offset + artworks.length) % artworks.length;
  renderLightbox(next);
}

lightboxClose.addEventListener("click", closeLightbox);
lightboxPrev.addEventListener("click", () => showRelative(-1));
lightboxNext.addEventListener("click", () => showRelative(1));

lightboxEl.addEventListener("click", (e) => {
  const clickedImage = e.target.closest(".pixel-lightbox__image");
  const clickedPanel = e.target.closest(".pixel-lightbox__panel");
  const clickedControl = e.target.closest(".pixel-lightbox__close, .pixel-lightbox__nav");
  if (!clickedImage && !clickedPanel && !clickedControl) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (e) => {
  if (!lightboxEl.classList.contains("is-open")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") showRelative(-1);
  if (e.key === "ArrowRight") showRelative(1);
});