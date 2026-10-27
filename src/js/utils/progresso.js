/* Escreve uma variavel CSS de progresso (0 a 1) enquanto a rolagem passa pelo trecho dado, SO nos elementos que a
   usam (alvos). Escrever numa secao inteira fazia o navegador recalcular todas as letras dela a cada quadro de
   rolagem; as variaveis sao registradas sem heranca (base.css), entao a escrita nao desce para os filhos.
   Sem ScrollTrigger nao escreve nada e o CSS fica no valor inicial da variavel (o estado final). */
export function progresso(alvos, nome, { trigger, start, end, aoMudar } = {}) {
  const { ScrollTrigger } = window;
  const lista = (Array.isArray(alvos) ? alvos : [alvos]).filter(Boolean);
  if (!ScrollTrigger || !trigger) return null;
  let ultimo = '';
  const escrever = (st) => {
    const v = st.progress.toFixed(3);
    if (v !== ultimo) { ultimo = v; for (const el of lista) el.style.setProperty(nome, v); }
    aoMudar?.(st.progress);
  };
  const st = ScrollTrigger.create({ trigger, start, end, onUpdate: escrever, onRefresh: escrever });
  escrever(st);
  return st;
}
