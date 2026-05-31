/** Smoothly scroll to a section id, using Lenis when available. */
export function scrollToId(id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  if (window.__lenis) {
    window.__lenis.scrollTo(target, { offset: -10, duration: 1.2 });
  } else {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}
