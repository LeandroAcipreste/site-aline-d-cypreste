/* Radiestesia: --c enquanto o titulo chega (as linhas se encontram no centro) e --r enquanto a foto chega
   (ela abre). As duas variaveis ficam na secao, que o titulo e a foto herdam. */
import { progresso } from '../../../../js/utils/progresso.js';

export function iniciarRadiestesia() {
  const secao = document.querySelector('.radiestesia');
  if (!secao) return;
  const cabeca = secao.querySelector('.radiestesia__cabeca');
  const imagem = secao.querySelector('.radiestesia__imagem');
  progresso(secao, '--c', { trigger: cabeca, start: 'top 95%', end: 'top 40%' });
  progresso(secao, '--r', { trigger: imagem, start: 'top 92%', end: 'center 58%' });
}
