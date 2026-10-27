/* EFEITOS DE TEXTO: cada texto com data-fx ganha a sua propria entrada (a lista e as animacoes estao em
   efeitos.css). Aqui o texto e quebrado em palavras (.fx-w) e letras (.fx-l, com --i e, no elemento, --n);
   data-fx-modo="palavras" quebra so em palavras (.fx-p) e "bloco" nao quebra. O <em> e o <br> sao mantidos;
   o que tem aria-hidden (setas) fica inteiro.
   O unico efeito que precisa de JS alem da classe e o "decifra": as letras passam por sinais ate assentar. */
let semente = 11;
const sorteio = () => (semente = (semente * 16807) % 2147483647) / 2147483647;
const SINAIS = 'ABCDEFGHIJKLMNOPRSTUVXZ0123456789';

function quebrar(el) {
  const modo = el.dataset.fxModo || 'letras';
  if (modo === 'bloco') return;
  // titulo e link: o leitor de tela le o texto inteiro, nao letra por letra
  if (/^(H1|H2|H3|A)$/.test(el.tagName) && !el.hasAttribute('aria-label')) {
    el.setAttribute('aria-label', el.textContent.replace(/[↗↓↑]/g, '').replace(/\s+/g, ' ').trim());
  }
  let i = 0;
  const percorrer = (no) => {
    for (const filho of [...no.childNodes]) {
      if (filho.nodeType === 1) {
        if (filho.getAttribute('aria-hidden') !== 'true' && filho.tagName !== 'BR') percorrer(filho);
        continue;
      }
      if (filho.nodeType !== 3 || !filho.textContent.trim()) continue;
      // um invólucro so por trecho de texto: dentro de flex (botoes, links, temas, rotulos) cada palavra solta
      // virava um item separado e o gap espalhava as palavras pela linha
      const pedacos = document.createElement('span');
      pedacos.className = 'fx-t';
      for (const parte of filho.textContent.split(/(\s+)/)) {
        if (!parte) continue;
        if (/^\s+$/.test(parte)) { pedacos.append(' '); continue; }
        const palavra = document.createElement('span');
        if (modo === 'palavras') {
          palavra.className = 'fx-p';
          palavra.style.setProperty('--i', i++);
          palavra.textContent = parte;
        } else {
          palavra.className = 'fx-w';
          for (const letra of parte) {
            const l = document.createElement('span');
            l.className = 'fx-l';
            l.textContent = letra;
            l.style.setProperty('--i', i++);
            l.style.setProperty('--dx', ((sorteio() - .5) * 4).toFixed(2));
            l.style.setProperty('--dy', ((sorteio() - .5) * 3).toFixed(2));
            l.style.setProperty('--dr', ((sorteio() - .5) * 90).toFixed(1));
            palavra.append(l);
          }
        }
        if (/^(H1|H2|H3|A)$/.test(el.tagName)) palavra.setAttribute('aria-hidden', 'true');
        pedacos.append(palavra);
      }
      filho.replaceWith(pedacos);
    }
  };
  percorrer(el);
  el.style.setProperty('--n', Math.max(1, i - 1));
}

export function iniciarEfeitos() {
  document.querySelectorAll('[data-fx]').forEach(quebrar);
}

/* decifra: cada letra mostra sinais trocando ate a sua vez, da esquerda para a direita */
export function decifrar(el) {
  const letras = [...el.querySelectorAll('.fx-l')];
  if (!letras.length) return;
  const reais = letras.map((l) => l.textContent);
  const reduzido = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const atraso = (parseFloat(el.style.getPropertyValue('--d')) || 0) * 1000;
  const duracao = reduzido ? 450 : 1100;
  const inicio = performance.now() + atraso;
  const passo = (agora) => {
    const t = agora - inicio;
    let falta = false;
    letras.forEach((l, k) => {
      if (reais[k] === ' ' || /[\s/]/.test(reais[k])) return;
      const vez = (k / letras.length) * duracao * 0.75 + 120;
      if (t >= vez) { if (l.textContent !== reais[k]) l.textContent = reais[k]; }
      else { falta = true; if (t > 0) l.textContent = SINAIS[Math.floor(sorteio() * SINAIS.length)]; }
    });
    if (falta) requestAnimationFrame(passo);
  };
  requestAnimationFrame(passo);
}
