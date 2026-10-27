/* Baralho: os temas abrem um por vez e --p (0 a 1) enquanto a dobra atravessa a tela (foto e anel do selo). */
import { progresso } from '../../../../js/utils/progresso.js';

export function iniciarBaralho() {
  const secao = document.querySelector('.baralho');
  if (!secao) return;

  const temas = [...secao.querySelectorAll('.tema')];
  for (const tema of temas) {
    const botao = tema.querySelector('.tema__botao');
    botao.addEventListener('click', () => {
      const abrir = !tema.classList.contains('is-aberto');
      for (const outro of temas) {
        const aberto = outro === tema && abrir;
        outro.classList.toggle('is-aberto', aberto);
        outro.querySelector('.tema__botao').setAttribute('aria-expanded', String(aberto));
      }
    });
  }

  progresso(secao, '--p', { start: 'top bottom', end: 'bottom top' });
}
