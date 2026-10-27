/* FACTORY DE ENCAIXE: cada dobra de tela cheia ([data-encaixe]) cabe inteira na tela, de um desktop baixo a um
   celular. Mede a altura natural do conteudo ([data-encaixe-conteudo]) e escreve na dobra o fator --enc (0,55 a 1)
   que faz caber; o CSS multiplica fontes, espacos e o retrato por ele. So mede e escreve a variavel.
   A altura da tela vem de uma regua de 100svh: o innerHeight muda com a barra do celular a cada rolagem. */
const MINIMO = 0.55;

const regua = document.createElement('div');
regua.style.cssText = 'position:fixed;top:0;left:-9px;width:1px;height:100svh;visibility:hidden;pointer-events:none';
document.documentElement.append(regua);

export function iniciarEncaixe(aoMudar) {
  const dobras = [...document.querySelectorAll('[data-encaixe]')];
  if (!dobras.length) return;
  let largura = 0, altura = 0;

  function encaixar(dobra) {
    const conteudo = dobra.querySelector('[data-encaixe-conteudo]') || dobra;
    const css = getComputedStyle(dobra);
    let k = 1;
    // tres passadas: a altura do conteudo nao e proporcional ao fator (o texto quebra diferente)
    for (let i = 0; i < 3; i++) {
      dobra.style.setProperty('--enc', k.toFixed(3));
      const livre = dobra.clientHeight - parseFloat(css.paddingTop) - parseFloat(css.paddingBottom);
      const alto = conteudo.offsetHeight;
      if (alto <= livre + 1) break;
      k = Math.max(MINIMO, Math.min(1, k * (livre / alto)));
    }
  }

  function medir(forcar = false) {
    const w = innerWidth, h = regua.offsetHeight;
    if (!forcar && w === largura && h === altura) return;
    largura = w; altura = h;
    dobras.forEach(encaixar);
    aoMudar?.();
  }

  let pedido = 0;
  const pedir = () => { cancelAnimationFrame(pedido); pedido = requestAnimationFrame(() => medir()); };
  addEventListener('resize', pedir);
  new ResizeObserver(pedir).observe(regua);
  document.fonts?.ready.then(() => medir(true));
  medir(true);
}
