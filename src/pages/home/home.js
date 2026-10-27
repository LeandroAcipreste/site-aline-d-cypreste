/* Home: cada dobra liga o seu proprio JS. */
import { iniciarHero } from './secoes/hero/01-hero.js';
import { iniciarBaralho } from './secoes/baralho/02-baralho.js';
import { iniciarRadiestesia } from './secoes/radiestesia/03-radiestesia.js';

export function init() {
  iniciarHero();
  iniciarBaralho();
  iniciarRadiestesia();
  window.ScrollTrigger?.refresh();
}
