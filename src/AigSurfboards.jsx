import { useState } from "react";

/* ---------- Conteúdo (depois vira dados vindos da API Spring Boot) ---------- */
const INSTAGRAM_URL = "https://www.instagram.com/aigsurfboards/";
const WHATSAPP_URL = "https://wa.me/5511934507754"; // TODO: trocar pelo número real

const MODELOS = [
  { nome: "Pranchinha", faixa: "até 6'2\"", preco: "R$ 1.650", comp: 62 },
  { nome: "Híbrida", faixa: "de 6'3\" até 7'2\"", preco: "R$ 1.950", comp: 72 },
];

const SHAPES = [
  {
    nome: "IS19",
    construcao: "EPS-Epóxi",
    categoria: "Pranchinha",
    texto: "Outline mais largo na altura do bico, espessura central média-alta que acaba em um caimento de borda bem acentuado. Curva de fundo moderada/baixa e um double concave suave na rabeta, que pode ser tanto Swallow quanto Squash. Shape amplamente testado e encaixado na construção EPS-Epóxi, ideal para quem quer uma prancha de resposta rápida, ultra sensível e com aquela sensação de leveza debaixo dos pés. Nesta configuração também é possível aumentar o volume sem grandes perdas de manobrabilidade.",
    medidas: [
      ["5'5\"", "18.5\"", "2.44\"", "25.2L"], ["5'6\"", "18.65\"", "2.44\"", "26L"],
      ["5'7\"", "18.75\"", "2.5\"", "27L"], ["5'8\"", "19\"", "2.55\"", "28.4L"],
      ["5'9\"", "18.9\"", "2.55\"", "29L"], ["5'10\"", "18.9\"", "2.55\"", "29.2L"],
      ["5'11\"", "19\"", "2.6\"", "30.2L"], ["6'0\"", "19\"", "2.6\"", "31L"],
    ],
  },
  {
    nome: "Mago's Model",
    construcao: "PU-Epóxi",
    categoria: "Pranchinha",
    texto: "Outline estreito, afinando ainda mais no bico e na rabeta, espessura central média-baixa, curva de fundo média-alta e concave ligeiramente acentuado na rabeta, que é round. Pensada para a construção PU-Epóxi, tem como característica principal o ataque em curto espaço sem perder controle. Como o bloco de PU vibra e responde mais lentamente, o surfista manobra forte sem que a rabeta fique boba e desgarre fácil. É uma prancha que pede um surf vertical e agressivo.",
    medidas: [
      ["5'7\"", "18\"", "2.38\"", "23L"], ["5'8\"", "18.13\"", "2.38\"", "23.5L"],
      ["5'9\"", "18.25\"", "2.38\"", "24L"], ["5'10\"", "18.5\"", "2.44\"", "25.2L"],
      ["5'11\"", "18.38\"", "2.38\"", "24.8L"], ["6'0\"", "18.44\"", "2.31\"", "24.5L"],
      ["6'1\"", "18.44\"", "2.38\"", "25.6L"], ["6'2\"", "18.65\"", "2.44\"", "27L"],
    ],
  },
  {
    nome: "Híbrida",
    construcao: "PU-Epóxi",
    categoria: "Híbrida",
    texto: "Outline bem largo no geral, espessura central alta com leve caimento de borda, curva de fundo moderada na transição e baixa nas extremidades, concave baixo. Feita para um surf clássico de cutbacks e rasgadas redondas, para quem quer aproveitar o máximo de uma onda ao fazê-la até a beira. Pensada na construção PU-Epóxi, que garante a solidez e a previsibilidade deste surf.",
    medidas: [
      ["6'3\"", "21\"", "2.7\"", "39.4L"], ["6'4\"", "21.13\"", "2.7\"", "40.3L"],
      ["6'5\"", "21.25\"", "2.75\"", "41.2L"], ["6'6\"", "21.31\"", "2.75\"", "42.2L"],
      ["6'7\"", "21.44\"", "2.75\"", "43.1L"], ["6'8\"", "21.65\"", "2.8\"", "44.5L"],
      ["6'9\"", "21.75\"", "2.8\"", "45.6L"], ["6'10\"", "22\"", "2.8\"", "46.8L"],
      ["6'11\"", "22.13\"", "2.85\"", "48.2L"], ["7'0\"", "22.25\"", "2.85\"", "49.4L"],
      ["7'1\"", "22.38\"", "2.88\"", "50.85L"], ["7'2\"", "22.5\"", "2.88\"", "51.8L"],
    ],
  },
];

const ETAPAS = [
  { t: "Conversa", d: "Entendemos o que você quer da prancha nova: velocidade, controle, manobrabilidade, ou algo estrutural como resistência, leveza e flexibilidade. Pedimos altura, peso e imagens de surf." },
  { t: "Sua prancha atual", d: "Medidas, tipo de construção e peso da prancha que você usa hoje ajudam a chegar no shape certo." },
  { t: "Arquivo 3D", d: "Enviamos um arquivo 3D com fotos e medidas da nova prancha. Você analisa e manda o feedback até chegarmos num consenso." },
  { t: "Decisão", d: "Toda essa fase é gratuita e sem compromisso. Se você decidir fazer, informamos prazo e pagamento e começamos a fabricação." },
  { t: "Entrega", d: "Quando a prancha ficar pronta, combinamos a entrega. O resto é surf." },
];

const FOTOS = ["Shape 1", "Shape 2", "Shape 3", "Shape 4", "Shape 5", "Shape 6"]; // TODO: trocar por URLs das fotos

/* ---------- Silhueta de prancha (elemento principal do hero) ---------- */
function Prancha({ comp = 72, className = "" }) {
  const w = 120;
  const h = comp * 5;
  return (
    <svg className={className} viewBox={`0 0 ${w} ${h + 40}`} role="img" aria-label={`Silhueta de prancha de ${Math.floor(comp / 10)}'${comp % 10}"`}>
      <path
        d={`M60 8 C92 ${h * 0.22} 98 ${h * 0.55} 88 ${h * 0.82} C84 ${h * 0.94} 72 ${h + 4} 60 ${h + 4} C48 ${h + 4} 36 ${h * 0.94} 32 ${h * 0.82} C22 ${h * 0.55} 28 ${h * 0.22} 60 8 Z`}
        fill="currentColor"
      />
      <line x1="60" y1="20" x2="60" y2={h - 4} stroke="var(--bg)" strokeWidth="1.5" opacity=".55" />
    </svg>
  );
}

export default function AigSurfboards() {
  const [aberta, setAberta] = useState(0);
  const [modelo, setModelo] = useState(0);
  const shape = SHAPES[modelo];

  return (
    <div className="aig">
      <style>{css}</style>

      <header className="topo">
        <a href="#inicio" className="marca">AIG Surfboards</a>
        <nav aria-label="Principal">
          <a href="#modelos">Modelos</a>
          <a href="#valores">Valores</a>
          <a href="#encomenda">Encomenda</a>
          <a href="#garantia">Garantia</a>
          <a href="#shaper">Shaper</a>
          <a href="#fotos">Fotos</a>
        </nav>
      </header>

      <main id="inicio">
        {/* HERO */}
        <section className="hero">
          <div className="hero-texto">
            <h1>Pranchas feitas sob medida, em Natal.</h1>
            <p className="lead">
              Cada prancha nasce de uma conversa entre shaper e surfista. Você
              aprova o shape em 3D antes de pagar qualquer coisa.
            </p>
            <div className="acoes">
              <a className="btn" href={WHATSAPP_URL} target="_blank" rel="noreferrer">Pedir minha prancha</a>
              <a className="btn ghost" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Ver no Instagram</a>
            </div>
          </div>
          <div className="hero-prancha" aria-hidden="false">
            <Prancha comp={72} className="prancha-svg" />
          </div>
        </section>

        {/* MODELOS */}
        <section id="modelos" className="bloco">
          <h2>Modelos</h2>
          <div className="abas" role="tablist" aria-label="Modelos de prancha">
            {SHAPES.map((m, i) => (
              <button key={m.nome} role="tab" aria-selected={modelo === i} className={modelo === i ? "ativa" : ""} onClick={() => setModelo(i)}>
                {m.nome}
              </button>
            ))}
          </div>
          <article className="shape" role="tabpanel">
            <div className="shape-info">
              <h3>{shape.nome}</h3>
              <p className="faixa">{shape.categoria}, construção {shape.construcao}</p>
              <p className="shape-texto">{shape.texto}</p>
            </div>
            <div className="tabela-wrap">
              <table>
                <caption>Medidas de referência, sujeitas a alteração de acordo com a individualidade de cada surfista.</caption>
                <thead>
                  <tr><th>Comprimento</th><th>Largura</th><th>Espessura</th><th>Volume</th></tr>
                </thead>
                <tbody>
                  {shape.medidas.map((l) => (
                    <tr key={l[0]}>{l.map((c, j) => (j === 0 ? <th scope="row" key={j}>{c}</th> : <td key={j}>{c}</td>))}</tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        </section>

        {/* VALORES */}
        <section id="valores" className="bloco">
          <h2>Valores e prazo</h2>
          <div className="modelos">
            {MODELOS.map((m) => (
              <article key={m.nome} className="modelo">
                <Prancha comp={m.comp} className="mini" />
                <div>
                  <h3>{m.nome}</h3>
                  <p className="faixa">{m.faixa}</p>
                  <p className="preco">{m.preco}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="prazo">Prazo de 2 semanas a 1 mês, mediante consulta.</p>
        </section>

        {/* ENCOMENDA */}
        <section id="encomenda" className="bloco claro">
          <h2>Como funciona a encomenda</h2>
          <ol className="etapas">
            {ETAPAS.map((e, i) => (
              <li key={e.t} className={aberta === i ? "aberta" : ""}>
                <button
                  onClick={() => setAberta(aberta === i ? -1 : i)}
                  aria-expanded={aberta === i}
                  aria-controls={`etapa-${i}`}
                >
                  <span className="n">{i + 1}</span>
                  <span className="tt">{e.t}</span>
                </button>
                {aberta === i && <p id={`etapa-${i}`}>{e.d}</p>}
              </li>
            ))}
          </ol>
        </section>

        {/* GARANTIA */}
        <section id="garantia" className="bloco garantia">
          <h2>Garantia de 7 dias</h2>
          <p className="destaque">
            Se em até 7 dias após a entrega você estiver insatisfeito por qualquer
            motivo, devolve a prancha e recebe o valor total de volta.
          </p>
          <p>
            Nosso método depende da melhor relação possível entre shaper e
            surfista, de mão de obra qualificada e do que há de melhor no mercado
            em matéria-prima. Isso nos permite garantir sua satisfação. É assim
            que pretendemos construir prosperidade e credibilidade para a marca.
          </p>
        </section>

        {/* SHAPER */}
        <section id="shaper" className="bloco shaper">
          <h2>Conheça o shaper</h2>
          <div className="historia">
            <p>
              Cresci na capital paulista, longe da praia. Quando criança, sempre
              que vinha de férias a Natal com meus pais, me apaixonava mais e mais
              pelo mar. Meu pai e meu tio pegavam “jacaré” com uma facilidade que
              me encantava, e foi assim que peguei minha primeira onda. Aquilo foi
              passado de forma tão natural quanto se ensina uma criança a comer e
              rezar, como se eu fosse mais um elo de uma certa “ancestralidade
              surfística”.
            </p>
            <p>
              Aos 4 anos, diz meu pai, eu já ficava em pé no bodyboard. Na
              pré-adolescência comecei a pegar onda de pranchinha, e aos 16
              começaram os bate-volta em SP. Aos 22 me mudei para Natal e passei a
              surfar todo santo dia em Ponta Negra. Ao conhecer novas praias e
              formar novos vínculos, entendi que aqui é o meu lugar.
            </p>
            <p>
              Aos 24 surgiu a oportunidade de trabalhar na confecção de quilhas
              com meu sogro, e aos 25 me passou pela cabeça: “Por que não fazer
              prancha?” Depois da primeira não parei mais. Hoje, aos 28, vivo o
              surf mais do que nunca, e assim pretendo continuar...
            </p>
          </div>
        </section>

        {/* FOTOS */}
        <section id="fotos" className="bloco">
          <h2>No Instagram</h2>
          <div className="grade">
            {FOTOS.map((f, i) => (
              <a key={f} href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className={`foto f${i % 3}`} aria-label={`${f} — abrir Instagram`}>
                <span>{f}</span>
              </a>
            ))}
          </div>
          <p className="prazo">
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">@aigsurfboards</a> — acompanhe os shapes mais recentes.
          </p>
        </section>
      </main>

      <footer className="rodape">
        <p>Vamos desenhar a sua prancha? A conversa é gratuita.</p>
        <a className="btn" href={WHATSAPP_URL} target="_blank" rel="noreferrer">Chamar no WhatsApp</a>
        <small>© {new Date().getFullYear()} AIG Surfboards · Natal, RN</small>
      </footer>
    </div>
  );
}

/* ---------- Estilos ---------- */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,800&family=Newsreader:opsz,wght@6..72,400;6..72,500&display=swap');
.aig{
  --bg:#E6EFEC; --ink:#0A2B31; --mar:#0F4C57; --fundo:#0A2B31; --resina:#E8A317; --espuma:#F7FAF9;
  --sans:'Bricolage Grotesque',system-ui,sans-serif; --serif:'Newsreader',Georgia,serif;
  background:var(--bg); color:var(--ink); font-family:var(--sans); line-height:1.5; min-height:100vh;
}
.aig *{box-sizing:border-box}
.aig a{color:inherit}
.aig :focus-visible{outline:3px solid var(--resina); outline-offset:3px}
.topo{display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap;padding:20px clamp(20px,5vw,64px)}
.marca{font-weight:800;font-size:1.15rem;text-decoration:none;letter-spacing:-.01em}
.topo nav{display:flex;gap:20px;flex-wrap:wrap}
.topo nav a{text-decoration:none;font-weight:600;font-size:.95rem}
.topo nav a:hover{text-decoration:underline;text-underline-offset:4px}

.hero{display:grid;grid-template-columns:1.2fr .8fr;gap:40px;align-items:center;padding:40px clamp(20px,5vw,64px) 80px;min-height:78vh}
.hero h1{font-size:clamp(2.6rem,7vw,5.6rem);line-height:.98;letter-spacing:-.035em;font-weight:800;margin:0 0 24px;max-width:13ch}
.lead{font-family:var(--serif);font-size:1.3rem;max-width:34ch;margin:0 0 32px}
.acoes{display:flex;gap:12px;flex-wrap:wrap}
.btn{display:inline-block;background:var(--ink);color:var(--espuma)!important;padding:14px 24px;border-radius:999px;font-weight:600;text-decoration:none;border:2px solid var(--ink)}
.btn:hover{background:var(--mar);border-color:var(--mar)}
.btn.ghost{background:transparent;color:var(--ink)!important}
.btn.ghost:hover{background:var(--ink);color:var(--espuma)!important}
.hero-prancha{display:flex;justify-content:center;color:var(--mar)}
.prancha-svg{width:min(260px,60%);height:auto;max-height:70vh;transform:rotate(8deg);filter:drop-shadow(18px 24px 0 rgba(10,43,49,.12));animation:entra 1.1s cubic-bezier(.2,.8,.2,1) both}
@keyframes entra{from{opacity:0;transform:translateY(60px) rotate(18deg)}to{opacity:1;transform:rotate(8deg)}}

.bloco{padding:80px clamp(20px,5vw,64px);max-width:1100px;margin:0 auto}
.bloco h2{font-size:clamp(1.8rem,4vw,2.8rem);letter-spacing:-.025em;margin:0 0 32px;font-weight:800}
.claro{background:var(--espuma);max-width:none}
.claro>*{max-width:900px;margin-left:auto;margin-right:auto}

.modelos{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px}
.modelo{display:flex;gap:24px;align-items:center;background:var(--espuma);padding:28px;border-radius:28px 6px 28px 6px}
.mini{height:150px;width:auto;color:var(--mar);flex:none}
.modelo h3{margin:0;font-size:1.5rem}
.faixa{margin:2px 0 12px;color:var(--mar)}
.preco{font-size:2.2rem;font-weight:800;margin:0;letter-spacing:-.03em}
.prazo{margin-top:24px;font-family:var(--serif);font-size:1.15rem}

.abas{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:28px}
.abas button{font:inherit;font-weight:600;padding:10px 20px;border-radius:999px;border:2px solid var(--ink);background:transparent;color:var(--ink);cursor:pointer}
.abas button.ativa{background:var(--ink);color:var(--espuma)}
.shape{display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:start}
.shape h3{margin:0;font-size:2rem;letter-spacing:-.02em}
.shape-texto{font-family:var(--serif);font-size:1.15rem;max-width:60ch}
.tabela-wrap{overflow-x:auto;background:var(--espuma);border-radius:6px 28px 6px 28px;padding:16px 20px}
.aig table{border-collapse:collapse;width:100%;font-variant-numeric:tabular-nums}
.aig caption{caption-side:bottom;text-align:left;font-size:.85rem;padding-top:12px;color:var(--mar)}
.aig th,.aig td{text-align:left;padding:8px 10px;border-bottom:1px solid rgba(10,43,49,.15)}
.aig thead th{font-size:.9rem;color:var(--mar)}
.aig tbody th{font-weight:800}
@media (max-width:760px){.shape{grid-template-columns:1fr}}
.etapas{list-style:none;padding:0;margin:0;border-left:3px solid var(--mar)}
.etapas li{padding:6px 0 6px 24px;position:relative}
.etapas button{all:unset;cursor:pointer;display:flex;gap:14px;align-items:center;font-size:1.2rem;font-weight:600;padding:8px 0}
.etapas .n{display:grid;place-items:center;width:34px;height:34px;border-radius:50%;background:var(--mar);color:var(--espuma);font-size:.95rem;flex:none}
.etapas li.aberta .n{background:var(--resina);color:var(--ink)}
.etapas p{margin:4px 0 12px 48px;font-family:var(--serif);font-size:1.15rem;max-width:60ch}

.garantia{background:var(--fundo);color:var(--espuma);max-width:none}
.garantia>*{max-width:760px;margin-left:auto;margin-right:auto}
.destaque{font-size:clamp(1.4rem,3vw,2rem);line-height:1.25;font-weight:600;color:var(--resina)}
.garantia p:not(.destaque){font-family:var(--serif);font-size:1.15rem;opacity:.92}

.historia{columns:2 320px;column-gap:48px;font-family:var(--serif);font-size:1.15rem;max-width:none}
.historia p{margin:0 0 1.1em;break-inside:avoid-column}

.grade{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.foto{aspect-ratio:1;display:grid;place-items:center;text-decoration:none;font-weight:600;color:var(--espuma);border-radius:6px}
.foto.f0{background:var(--mar)} .foto.f1{background:#2C7480} .foto.f2{background:var(--ink)}
.foto:hover{outline:3px solid var(--resina)}

.rodape{background:var(--ink);color:var(--espuma);text-align:center;padding:72px 20px 40px;display:flex;flex-direction:column;align-items:center;gap:20px}
.rodape p{font-size:1.6rem;font-weight:600;margin:0;max-width:24ch}
.rodape .btn{background:var(--resina);border-color:var(--resina);color:var(--ink)!important}
.rodape small{opacity:.7;margin-top:24px}

@media (max-width:760px){
  .hero{grid-template-columns:1fr;min-height:auto}
  .hero-prancha{order:-1}
  .prancha-svg{max-height:300px}
  .modelo{flex-direction:column;align-items:flex-start}
}
@media (prefers-reduced-motion:reduce){.prancha-svg{animation:none}}
`;
