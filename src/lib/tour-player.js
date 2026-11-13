// Responsive tour player: picks the mobile or desktop cut from the site's
// own layout breakpoint (650px, see custom.css) when the caller says the
// player is opening, and offers a manual Mobile/Desktop switch. Never
// switches automatically once playback has started; a manual switch keeps
// position and play state. No tracking, no account. Both cuts share one
// captions file. Static src/poster attributes stay the desktop cut so the
// player still works without JavaScript.
export const TOUR_BREAKPOINT = 650;

export function initTourPlayer(root) {
  const video = root.querySelector('video[data-tour-video]');
  if (!video || !video.dataset.srcMobile || !video.dataset.srcDesktop) return null;
  const buttons = [...root.querySelectorAll('[data-tour-cut]')];
  const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
  const currentCut = () => (video.src.endsWith(video.dataset.srcMobile) ? 'mobile' : 'desktop');
  const apply = (cut, preserve) => {
    if (cut === currentCut()) {
      for (const b of buttons) b.setAttribute('aria-pressed', String(b.dataset.tourCut === cut));
      return;
    }
    const t = video.currentTime;
    const resume = preserve && !video.paused && !video.ended;
    video.poster = video.dataset['poster' + cap(cut)] || video.poster;
    video.src = video.dataset['src' + cap(cut)];
    if (preserve && t > 0) video.currentTime = t;
    if (resume) video.play().catch(() => {});
    for (const b of buttons) b.setAttribute('aria-pressed', String(b.dataset.tourCut === cut));
  };
  for (const b of buttons) b.addEventListener('click', () => apply(b.dataset.tourCut, true));
  return { pickAuto: () => apply(window.innerWidth <= TOUR_BREAKPOINT ? 'mobile' : 'desktop', false) };
}
