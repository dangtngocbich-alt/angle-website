function moveCategory(direction) {
  const rail = $('#scene-rail');
  if (!rail) return;
  const card = $('.scene-card', rail);
  const gap = parseFloat(getComputedStyle(rail).columnGap) || 20;
  rail.scrollBy({ left: direction * (card.getBoundingClientRect().width + gap),
    behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
}

function initScenes() {
  const rail = $('#scene-rail');
  if (!rail) return;
  const container = rail.closest('.category-carousel');
  const previous = $('[data-scroll="-1"]', container);
  const next = $('[data-scroll="1"]', container);
  const updateControls = () => {
    previous.disabled = rail.scrollLeft <= 2;
    next.disabled = rail.scrollLeft >= rail.scrollWidth - rail.clientWidth - 2;
  };
  requestAnimationFrame(() => {
    rail.scrollLeft = matchMedia('(max-width:760px)').matches ? 0 : Math.max(0, (rail.scrollWidth - rail.clientWidth) / 2);
    updateControls();
  });
  rail.addEventListener('scroll', updateControls, { passive: true });
  if (typeof ResizeObserver !== 'undefined') {
    const observer = new ResizeObserver(() => {
      if (!rail.isConnected) observer.disconnect(); else updateControls();
    });
    observer.observe(rail);
  }
  rail.addEventListener('keydown', event => {
    if (event.target !== rail || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    moveCategory(event.key === 'ArrowLeft' ? -1 : 1);
  });
  let start = 0, scroll = 0, dragging = false, moved = false;
  const stopDragging = () => { dragging = false; rail.classList.remove('dragging'); };
  rail.addEventListener('pointerdown', event => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    start = event.clientX; scroll = rail.scrollLeft; dragging = true; moved = false;
  });
  rail.addEventListener('pointermove', event => {
    if (!dragging) return;
    const delta = event.clientX - start;
    if (Math.abs(delta) > 6) { moved = true; rail.classList.add('dragging'); rail.scrollLeft = scroll - delta; }
  });
  for (const type of ['pointerup', 'pointercancel', 'pointerleave']) rail.addEventListener(type, stopDragging);
  rail.addEventListener('click', event => {
    if (!moved) return;
    event.preventDefault(); event.stopPropagation(); moved = false;
  }, true);
}
