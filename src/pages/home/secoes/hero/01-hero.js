/* Hero: abre o retrato (.is-aberta) e faz os textos entrarem ao carregar (depois das fontes, para o titulo nao
   entrar e depois trocar de letra). Quando o baralho comeca a cobrir (--p passa de .28), os textos saem
   desfazendo o efeito; voltando ao topo, entram de novo. Coberta de todo, sai da renderizacao (.is-coberto). */
import { progresso } from '../../../../js/utils/progresso.js';
import { entrar, sair } from '../../../../js/utils/revelar.js';

export function iniciarHero() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const textos = [...hero.querySelectorAll('[data-fx], [data-revela]')];
  let aberta = false, fora = false;

  const abrir = () => requestAnimationFrame(() => {
    aberta = true;
    hero.classList.add('is-aberta');
    if (!fora) textos.forEach(entrar);
  });
  const fontes = document.fonts?.ready ?? Promise.resolve();
  // no maximo 1,2 s esperando a fonte: depois disso entra com a letra que tiver
  Promise.race([fontes, new Promise((r) => setTimeout(r, 1200))]).then(abrir);

  // o gatilho e o baralho subindo, nunca a propria hero: elemento preso (sticky) engana as medidas do ScrollTrigger
  progresso(hero, '--p', {
    trigger: document.querySelector('.baralho'), start: 'top bottom', end: 'top top',
    aoMudar: (p) => {
      hero.classList.toggle('is-coberto', p >= 0.999);
      const agora = p > 0.28;
      if (agora === fora) return;
      fora = agora;
      if (aberta) textos.forEach(fora ? sair : entrar);
    },
  });
}
