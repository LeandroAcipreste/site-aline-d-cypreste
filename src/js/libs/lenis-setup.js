/* Lenis + ScrollTrigger num relogio so (o do GSAP). No toque fica a rolagem nativa (syncTouch desligado): no iOS o
   Lenis brigava com o dedo. Links internos (#) andam pelo Lenis, descontando o topo fixo. */
export function criarLenis() {
  const { gsap, ScrollTrigger, Lenis } = window;
  if (!gsap || !ScrollTrigger) return null;
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
  if (!Lenis) return null;

  const reduzido = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lenis = new Lenis({ lerp: reduzido ? 0.14 : 0.08, smoothWheel: true, wheelMultiplier: 0.8, syncTouch: false });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const alvo = document.querySelector(a.getAttribute('href'));
    if (!alvo) return;
    e.preventDefault();
    const topo = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--topo-h')) || 80;
    lenis.scrollTo(alvo, { offset: alvo.id === 'inicio' ? 0 : -topo + 1 });
  });
  return lenis;
}
