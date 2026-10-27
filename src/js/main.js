/* Globais (rolagem suave, encaixe, topo, entradas) e depois o JS da pagina, por body[data-page].
   GSAP, ScrollTrigger e Lenis vem do CDN (index.html); se nao chegarem, o site funciona com a rolagem nativa e
   sem os efeitos presos a rolagem. */
import { criarLenis } from './libs/lenis-setup.js';
import { iniciarEncaixe } from './utils/encaixe.js';
import { iniciarRevelar } from './utils/revelar.js';
import { iniciarEfeitos } from './utils/efeitos.js';
import { iniciarTopo } from './components/topo.js';

// o ano entra antes da quebra em letras, para tambem ganhar o efeito da linha final
const ano = document.querySelector('[data-ano]');
if (ano) ano.textContent = String(new Date().getFullYear());

const lenis = criarLenis();
// recarregou (ou voltou do historico com a pagina guardada): comeca na hero
const paraOTopo = () => { if (lenis) lenis.scrollTo(0, { immediate: true }); else window.scrollTo(0, 0); };
paraOTopo();
addEventListener('pageshow', (e) => { if (e.persisted) paraOTopo(); });
iniciarEfeitos();                    // quebra os textos em letras antes de medir e de qualquer entrada
iniciarEncaixe(() => window.ScrollTrigger?.refresh());
iniciarTopo(lenis);
iniciarRevelar();


const pagina = document.body.dataset.page;
if (pagina) {
  const { init } = await import(`../pages/${pagina}/${pagina}.js`);
  init({ lenis });
}
