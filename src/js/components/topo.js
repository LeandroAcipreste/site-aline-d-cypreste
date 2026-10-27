/* Topo: .is-rolado depois de sair do alto da pagina, menu do celular (.is-aberto) e a barra de leitura (--p). */
export function iniciarTopo(lenis) {
  const topo = document.querySelector('.topo');
  const barra = document.querySelector('.progresso');
  if (!topo) return;
  const botao = topo.querySelector('.topo__menu');

  let pedido = 0;
  const atualizar = () => {
    pedido = 0;
    const y = scrollY, limite = document.documentElement.scrollHeight - innerHeight;
    topo.classList.toggle('is-rolado', y > 40);
    barra?.style.setProperty('--p', (limite > 0 ? y / limite : 0).toFixed(4));
  };
  const pedir = () => { if (!pedido) pedido = requestAnimationFrame(atualizar); };
  if (lenis) lenis.on('scroll', pedir); else addEventListener('scroll', pedir, { passive: true });
  addEventListener('resize', pedir);
  atualizar();

  const fechar = () => { topo.classList.remove('is-aberto'); botao?.setAttribute('aria-expanded', 'false'); };
  botao?.addEventListener('click', () => {
    const aberto = topo.classList.toggle('is-aberto');
    botao.setAttribute('aria-expanded', String(aberto));
  });
  topo.querySelectorAll('.topo__nav a').forEach((a) => a.addEventListener('click', fechar));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') fechar(); });
}
