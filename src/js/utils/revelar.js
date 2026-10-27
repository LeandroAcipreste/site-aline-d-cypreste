/* ENTRADA E SAIDA. Liga .is-in quando o texto esta na faixa de leitura da tela e desliga quando ele sai dela.
   A faixa termina 14% abaixo do alto da tela: o texto sai (desfaz o proprio efeito) ainda visivel, antes de sumir
   por cima; rolando de volta, ele entra de novo. A travessia e CSS (revelar.css e efeitos.css).
   O topo entra uma vez ao carregar; a hero cuida dos proprios textos (01-hero.js). */
import { decifrar } from './efeitos.js';

export const entrar = (el) => {
  if (el.classList.contains('is-in')) return;
  el.classList.add('is-in');
  if (el.dataset.fx === 'decifra') decifrar(el);
};
export const sair = (el) => el.classList.remove('is-in');

export function iniciarRevelar() {
  const todos = [...document.querySelectorAll('[data-revela], [data-fx]')];
  const doTopo = todos.filter((el) => el.closest('.topo'));
  const alvos = todos.filter((el) => !el.closest('.topo') && !el.closest('.hero'));
  requestAnimationFrame(() => doTopo.forEach(entrar));

  if (!('IntersectionObserver' in window)) { alvos.forEach(entrar); return; }
  const olho = new IntersectionObserver((itens) => {
    for (const item of itens) (item.isIntersecting ? entrar : sair)(item.target);
  }, { rootMargin: '-14% 0px -4% 0px', threshold: 0.1 });
  alvos.forEach((el) => olho.observe(el));
}
