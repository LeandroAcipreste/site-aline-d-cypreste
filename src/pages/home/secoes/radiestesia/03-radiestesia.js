/* Radiestesia: --c enquanto o titulo chega (as linhas se encontram no centro) e --r enquanto a foto chega
   (ela abre). Cada variavel vai so nos elementos que a usam. */
import { progresso } from '../../../../js/utils/progresso.js';

export function iniciarRadiestesia() {
  const secao = document.querySelector('.radiestesia');
  if (!secao) return;
  const cabeca = secao.querySelector('.radiestesia__cabeca');
  const imagem = secao.querySelector('.radiestesia__imagem');
  progresso([...secao.querySelectorAll('.radiestesia__linha, .radiestesia__ritmo path')], '--c', { trigger: cabeca, start: 'top 95%', end: 'top 40%' });
  progresso([imagem, imagem?.querySelector('img'), imagem?.querySelector('figcaption')], '--r', { trigger: imagem, start: 'top 92%', end: 'center 58%' });
}
