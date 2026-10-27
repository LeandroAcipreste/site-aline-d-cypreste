/* Escreve no elemento uma variavel CSS de progresso (0 a 1) enquanto a rolagem passa pelo trecho dado.
   Sem ScrollTrigger nao escreve nada e o CSS fica no valor padrao da variavel (o estado final). */
export function progresso(el, nome, { trigger = el, start, end, aoMudar } = {}) {
  const { ScrollTrigger } = window;
  if (!el || !ScrollTrigger) return null;
  const escrever = (st) => { el.style.setProperty(nome, st.progress.toFixed(4)); aoMudar?.(st.progress); };
  const st = ScrollTrigger.create({ trigger, start, end, onUpdate: escrever, onRefresh: escrever });
  escrever(st);
  return st;
}
