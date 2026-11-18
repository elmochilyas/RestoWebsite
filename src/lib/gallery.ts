/** Native, progressively enhanced gallery: no video requests before opening. */
export function setupGallery(section: HTMLElement) {
  if (section.dataset.galleryReady) return;
  section.dataset.galleryReady = 'true';
  const find = <T extends HTMLElement>(selector: string) => section.querySelector<T>(selector)!;
  const track = find<HTMLElement>('[data-gallery-track]');
  const cards = Array.from(track.querySelectorAll<HTMLAnchorElement>('[data-gallery-item]'));
  const controls = find<HTMLElement>('[data-gallery-controls]');
  const previous = find<HTMLButtonElement>('[data-gallery-prev]');
  const next = find<HTMLButtonElement>('[data-gallery-next]');
  const position = find<HTMLElement>('[data-gallery-position]');
  const markers = section.querySelectorAll<HTMLElement>('[data-gallery-progress]');
  const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let active = 0;

  const sync = () => {
    controls.hidden = track.scrollWidth <= track.clientWidth + 2;
    const start = track.getBoundingClientRect().left;
    active = cards.reduce((nearest, card, index) =>
      Math.abs(card.getBoundingClientRect().left - start) < Math.abs(cards[nearest].getBoundingClientRect().left - start) ? index : nearest, 0);
    previous.disabled = track.scrollLeft < 2;
    next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
    position.textContent = `${String(active + 1).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}`;
    markers.forEach((marker, index) => marker.classList.toggle('is-current', index === active));
  };
  const step = (direction: number) => {
    const card = cards[Math.max(0, Math.min(cards.length - 1, active + direction))];
    track.scrollTo({ left: track.scrollLeft + card.getBoundingClientRect().left - track.getBoundingClientRect().left,
      behavior: reduceMotion() ? 'instant' : 'smooth' });
  };
  previous.addEventListener('click', () => step(-1));
  next.addEventListener('click', () => step(1));
  track.addEventListener('scroll', sync, { passive: true });
  track.addEventListener('keydown', (event) => {
    if (event.target !== track || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    step(event.key === 'ArrowRight' ? 1 : -1);
  });
  new ResizeObserver(sync).observe(track);
  sync();

  const dialog = find<HTMLDialogElement>('[data-gallery-dialog]');
  if (typeof dialog.showModal !== 'function') return;
  const items = Array.from(section.querySelectorAll<HTMLAnchorElement>('[data-gallery-item]'));
  const image = find<HTMLImageElement>('[data-gallery-full-image]');
  const video = find<HTMLVideoElement>('[data-gallery-video]');
  const title = find<HTMLElement>('[data-gallery-viewer-title]');
  const count = find<HTMLElement>('[data-gallery-viewer-count]');
  const error = find<HTMLElement>('[data-gallery-error]');
  const original = find<HTMLAnchorElement>('[data-gallery-original]');
  const viewerPrevious = find<HTMLButtonElement>('[data-gallery-viewer-prev]');
  const viewerNext = find<HTMLButtonElement>('[data-gallery-viewer-next]');
  let current = 0;
  let trigger: HTMLAnchorElement | undefined;
  let previousOverflow = '';

  const clearMedia = () => {
    video.hidden = true;
    video.pause();
    if (video.hasAttribute('src')) {
      video.removeAttribute('src');
      video.querySelectorAll('track').forEach((caption) => caption.remove());
      video.load();
    }
    image.hidden = true;
    image.removeAttribute('src');
    error.hidden = true;
  };
  const show = (index: number) => {
    current = Math.max(0, Math.min(items.length - 1, index));
    const item = items[current];
    clearMedia();
    title.textContent = item.dataset.title ?? '';
    count.textContent = `${item.dataset.video ? 'Vidéo' : 'Photo'} · ${current + 1} / ${items.length}`;
    viewerPrevious.disabled = current === 0;
    viewerNext.disabled = current === items.length - 1;
    original.href = item.href;
    if (item.dataset.video) {
      video.poster = item.dataset.image ?? '';
      video.setAttribute('aria-label', item.dataset.title ?? 'Vidéo de la galerie');
      video.src = item.dataset.video;
      if (item.dataset.captions) {
        const caption = document.createElement('track');
        caption.kind = 'captions';
        caption.src = item.dataset.captions;
        caption.srclang = item.dataset.captionsLang ?? 'fr';
        caption.label = item.dataset.captionsLabel ?? 'Français';
        caption.default = true;
        video.append(caption);
      }
      video.hidden = false;
      // User-initiated only; native controls remain available if play is blocked.
      void video.play().catch(() => {});
    } else {
      image.alt = item.dataset.alt ?? '';
      image.src = item.dataset.image ?? item.href;
      image.hidden = false;
    }
  };
  items.forEach((item, index) => {
    item.addEventListener('click', (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
      event.preventDefault();
      trigger = item;
      previousOverflow = document.documentElement.style.overflow;
      dialog.showModal();
      document.documentElement.style.overflow = 'hidden';
      show(index);
    });
  });
  const onError = () => {
    if (!dialog.open) return;
    image.hidden = true;
    video.hidden = true;
    error.hidden = false;
    error.setAttribute('role', 'status');
  };
  image.addEventListener('error', onError);
  video.addEventListener('error', onError);
  viewerPrevious.addEventListener('click', () => show(current - 1));
  viewerNext.addEventListener('click', () => show(current + 1));
  find<HTMLButtonElement>('[data-gallery-close]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  dialog.addEventListener('keydown', (event) => {
    // Preserve native video seek/volume keyboard shortcuts.
    if (event.target === video || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    show(current + (event.key === 'ArrowRight' ? 1 : -1));
  });
  dialog.addEventListener('close', () => {
    clearMedia();
    document.documentElement.style.overflow = previousOverflow;
    trigger?.focus({ preventScroll: true });
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) video.pause();
  });
}
