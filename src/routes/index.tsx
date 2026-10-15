import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Apple, ChevronDown, ChevronLeft, ChevronRight, Dumbbell, Flower2, Heart, Instagram, Laptop, Leaf, Menu, MessageCircle, Scale, Star, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { siteConfig, trackWhatsapp, whatsappUrl } from "@/lib/site-config";
import hero from "@/assets/upload-hero.jpeg.asset.json";
import about from "@/assets/upload-about.jpeg.asset.json";
import p1 from "@/assets/upload-p1.jpeg.asset.json";
import p2 from "@/assets/upload-p2.jpeg.asset.json";
import p3 from "@/assets/upload-p3.jpeg.asset.json";
import p4 from "@/assets/upload-p4.jpeg.asset.json";

const title = "Nutricionista em Brasília | Edineide Araújo – CRN-127932";
const description = "Nutrição estratégica com plano alimentar feito para o seu estilo de vida. Atendimento presencial em Brasília/DF e online.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title }, { name: "description", content: description },
      { property: "og:title", content: "Nutricionista em Brasília | Edineide Araújo" },
      { property: "og:description", content: "Mais do que dietas, um plano alimentar feito para a sua realidade." },
      { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Nutritionist", name: "Edineide Araújo - Naturalmente Você", telephone: "+5561981018687", address: { "@type": "PostalAddress", addressLocality: "Brasília", addressRegion: "DF", addressCountry: "BR" }, sameAs: ["https://instagram.com/natural.mentevoce"] }) }],
  }),
  component: Index,
});

const nav = [["inicio", "Início"], ["sobre", "Sobre mim"], ["servicos", "Serviços"], ["conteudos", "Conteúdos"], ["depoimentos", "Depoimentos"], ["contato", "Contato"]];
const services = [
  [Scale, "Emagrecimento saudável", "Cuidado com a sua saúde, sem dietas restritivas.", "Um plano construído com você, respeitando sua rotina, suas preferências e seu histórico, com foco em hábitos que se mantêm ao longo do tempo."],
  [Apple, "Reeducação alimentar", "Novos hábitos para uma vida mais equilibrada.", "Aprenda a organizar refeições, fazer escolhas no dia a dia e se relacionar melhor com a comida, sem proibições."],
  [Dumbbell, "Nutrição esportiva", "Mais energia e disposição para o seu treino.", "Estratégias alimentares para antes, durante e depois do treino, alinhadas ao seu objetivo e à sua modalidade."],
  [Flower2, "Saúde da mulher", "Cuidados nutricionais em todas as fases da vida.", "Acompanhamento nutricional considerando ciclo menstrual, gestação, pós-parto e menopausa, sempre de forma individual."],
] as const;
const posts = [
  [p1.url, "Receitas", "Salada colorida com proteína e fibras", "Monte uma base de folhas variadas, acrescente uma fonte de proteína e legumes de cores diferentes. Finalize com uma gordura boa, como azeite ou sementes."],
  [p2.url, "Dicas", "Como montar um prato equilibrado", "Metade com legumes e verduras, um quarto com proteína e um quarto com carboidrato. As porções ideais mudam de pessoa para pessoa e devem ser definidas em consulta."],
  [p3.url, "Saúde", "A importância da proteína na sua rotina", "A proteína participa da manutenção dos músculos, da produção de hormônios e da recuperação do corpo. A quantidade adequada deve ser individualizada."],
  [p4.url, "Nutrição", "Alimentos que ajudam na saciedade", "Aveia, frutas com casca, leguminosas, ovos, iogurte natural e legumes costumam deixar a refeição mais duradoura. Comer devagar também ajuda."],
];
const testimonials = [
  ["Juliana S.", "Me senti acolhida desde a primeira consulta. Aprendi a me alimentar melhor sem sofrimento.", "Paciente há 6 meses"],
  ["Carla M.", "Atendimento atencioso e muito competente. O plano se encaixou na minha rotina.", "Paciente há 3 meses"],
  ["Fernanda L.", "Método leve e prático, que faz diferença no dia a dia.", "Paciente há 1 ano"],
  ["Renata A.", "Explicações claras e muita paciência. Hoje planejo minhas refeições com mais tranquilidade.", "Paciente há 8 meses"],
  ["Aline T.", "Consultas online muito práticas, com acompanhamento próximo.", "Paciente há 2 meses"],
];
const legal = {
  bio: ["Prazer, sou Edineide", "Sou nutricionista e acredito que a alimentação é uma ferramenta poderosa para transformar sua saúde, sua energia e sua qualidade de vida. Meu atendimento é acolhedor, individualizado e pensado para a sua rotina."],
  priv: ["Política de Privacidade", "Nome, telefone e mensagem são usados apenas para responder ao seu contato pelo WhatsApp e não ficam armazenados neste site. Você pode pedir acesso, correção ou exclusão dos seus dados conforme a LGPD. Cookies de medição só são ativados se você aceitar."],
  terms: ["Termos de uso", "O conteúdo deste site tem caráter educativo e não substitui consulta individual com nutricionista. Planos alimentares são elaborados somente após avaliação."],
};

function WhatsButton({ children = "Agendar pelo WhatsApp", inverse = false, className = "" }: { children?: ReactNode; inverse?: boolean; className?: string }) {
  return <Button asChild variant={inverse ? "inverse" : "whatsapp"} className={className}><a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" onClick={trackWhatsapp}><MessageCircle />{children}</a></Button>;
}
function Brand() {
  return <a href="#inicio" className="brand" aria-label="Naturalmente Você, início"><Leaf className="brand-leaf" /><span className="brand-name">Naturalmente <span>Você</span><small className="brand-byline">Edineide Araújo · Nutricionista {siteConfig.crn}</small></span></a>;
}

function Index() {
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState("inicio");
  const [dialog, setDialog] = useState<null | { title: string; body: string; img?: string; cta?: boolean }>(null);
  const [slide, setSlide] = useState(0);
  const [cookies, setCookies] = useState(false);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCookies(!localStorage.getItem("naturalmente-cookies"));
    const obs = new IntersectionObserver((items) => items.forEach((i) => i.isIntersecting && setActive(i.target.id)), { rootMargin: "-45% 0px -50% 0px" });
    document.querySelectorAll("section[id]").forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);
  const go = (i: number) => {
    const n = (i + testimonials.length) % testimonials.length;
    setSlide(n);
    const card = track.current?.children[n] as HTMLElement | undefined;
    track.current?.scrollTo({ left: card?.offsetLeft ?? 0, behavior: "smooth" });
  };
  const consent = (v: string) => { localStorage.setItem("naturalmente-cookies", v); setCookies(false); };
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const extra = String(f.get("mensagem") || "");
    const text = `Olá, Edineide! Meu nome é ${f.get("nome")} (${f.get("telefone")}). Objetivo: ${f.get("objetivo")}.${extra ? ` ${extra}` : ""}`;
    trackWhatsapp();
    window.open(`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  };
  const show = (k: keyof typeof legal) => setDialog({ title: legal[k][0], body: legal[k][1] });

  return <>
    <header className="site-header"><div className="site-container header-inner"><Brand />
      <nav aria-label="Menu principal" className={`nav-list ${menu ? "open" : ""}`}>{nav.map(([id, label]) => <a key={id} href={`#${id}`} className={active === id ? "active" : ""} onClick={() => setMenu(false)}>{label}</a>)}</nav>
      <div className="header-actions"><WhatsButton className="header-cta">Agendar</WhatsButton><Button variant="ghost" className="mobile-menu" aria-label="Abrir menu" aria-expanded={menu} onClick={() => setMenu(!menu)}><Menu /></Button></div>
    </div></header>
    <main>
      <section id="inicio" className="hero"><Leaf className="leaf-decoration hero-leaves" /><div className="site-container hero-grid">
        <div className="hero-copy"><span className="eyebrow">SAÚDE • EQUILÍBRIO • BEM-ESTAR</span><h1>Nutrição estratégica para transformar <span className="script">sua saúde</span></h1><p className="hero-description">Mais do que dietas, um plano alimentar feito para o seu estilo de vida, seus objetivos e a sua realidade.</p><div className="hero-actions"><WhatsButton /><a className="text-link" href="#sobre">Como funciona a consulta <ChevronDown size={16} /></a></div></div>
        <div className="portrait-wrap"><img className="hero-portrait" src={hero.url} alt="Edineide Araújo, nutricionista, de jaleco branco" width="700" height="800" /><div className="portrait-label"><Leaf /><div><strong>Edineide Araújo</strong><small>Nutricionista {siteConfig.crn}</small></div></div></div>
      </div></section>
      <section className="benefits" aria-label="Diferenciais"><div className="site-container benefits-grid">{[[Leaf, "Atendimento personalizado", "Respeito ao seu ritmo e às suas necessidades."], [Target, "Foco em hábitos sustentáveis", "Mais saúde, energia e qualidade de vida."], [Heart, "Acompanhamento contínuo", "Você não está sozinha nessa jornada."], [Laptop, "Presencial e online", "Mais praticidade e flexibilidade para você."]].map(([Icon, h, p]) => { const I = Icon as typeof Leaf; return <div className="benefit" key={h as string}><I /><div><h3>{h as string}</h3><p>{p as string}</p></div></div>; })}</div></section>
      <section id="sobre" className="section"><div className="site-container about-grid"><div className="about-image-wrap"><img className="about-photo" src={about.url} alt="Retrato de Edineide Araújo" loading="lazy" /><Leaf className="leaf-decoration" /></div><div className="about-text"><span className="eyebrow">SOBRE MIM</span><h2>Prazer, sou <span className="script">Edineide</span></h2><p>Sou nutricionista e acredito que a alimentação é uma ferramenta poderosa para transformar sua saúde, sua energia e sua qualidade de vida.</p><Button variant="link" className="inline-action" onClick={() => show("bio")}>Saiba mais sobre mim →</Button></div></div></section>
      <section id="servicos" className="section services"><div className="site-container"><div className="section-heading"><span className="eyebrow">COMO POSSO AJUDAR VOCÊ?</span><h2>Meu foco é o seu bem-estar</h2></div><div className="service-grid">{services.map(([Icon, h, p, more]) => <article className="service-card" key={h}><Icon className="service-icon" /><h3>{h}</h3><p>{p}</p><Button variant="link" className="inline-action" onClick={() => setDialog({ title: h, body: more, cta: true })}>Saiba mais</Button></article>)}</div></div></section>
      <section id="conteudos" className="section"><div className="site-container"><div className="section-heading"><span className="eyebrow">CONTEÚDOS</span><h2>Dicas, receitas e muito mais</h2><p>Receitas saudáveis, orientações nutricionais e conteúdos para inspirar o seu dia a dia.</p></div><div className="article-grid">{posts.map(([img, cat, h, body]) => <article className="article-card" key={h}><img src={img} alt={h} loading="lazy" /><div className="article-text"><span className="article-category">{cat}</span><h3>{h}</h3><Button variant="link" className="inline-action" onClick={() => setDialog({ title: h, body: `${body} Conteúdo educativo; não substitui avaliação individual.`, img, cta: true })}>Ler mais →</Button></div></article>)}</div><div className="instagram-band"><Instagram size={20} />Acompanhe no Instagram <a href={`https://instagram.com/${siteConfig.instagram}`} target="_blank" rel="noopener noreferrer">@{siteConfig.instagram}</a></div></div></section>
      <section id="depoimentos" className="section testimonials"><div className="site-container"><div className="section-heading"><span className="eyebrow">DEPOIMENTOS</span><h2>O que dizem sobre o atendimento</h2></div><div className="testimonial-viewport" ref={track} tabIndex={0} aria-label="Depoimentos" onKeyDown={(e) => { if (e.key === "ArrowRight") go(slide + 1); if (e.key === "ArrowLeft") go(slide - 1); }}><div className="testimonial-track">{testimonials.map(([n, q, t]) => <figure className="testimonial-card" key={n}><div className="stars" aria-label="5 de 5 estrelas">{Array.from({ length: 5 }, (_, i) => <Star key={i} />)}</div><blockquote>“{q}”</blockquote><figcaption className="patient"><span className="patient-avatar">{n[0]}</span><span><strong>{n}</strong><small>{t}</small></span></figcaption></figure>)}</div></div><div className="carousel-controls"><Button variant="ghost" className="carousel-arrow" aria-label="Depoimento anterior" onClick={() => go(slide - 1)}><ChevronLeft /></Button><div className="carousel-dots">{testimonials.map((_, i) => <Button variant="ghost" key={i} aria-label={`Ir ao depoimento ${i + 1}`} className={`carousel-dot ${slide === i ? "selected" : ""}`} onClick={() => go(i)} />)}</div><Button variant="ghost" className="carousel-arrow" aria-label="Próximo depoimento" onClick={() => go(slide + 1)}><ChevronRight /></Button></div><p className="example-note">Depoimentos ilustrativos, sem promessa de resultados.</p></div></section>
      <section id="contato" className="section contact"><div className="site-container contact-grid"><div><span className="eyebrow">CONTATO</span><h2>Vamos conversar?</h2><p className="contact-copy">Atendimento presencial em {siteConfig.city} e online.</p><div className="contact-channel"><MessageCircle /><span><small>WhatsApp</small><a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" onClick={trackWhatsapp}>(61) 98101-8687</a></span></div><div className="contact-channel"><Instagram /><span><small>Instagram</small><a href={`https://instagram.com/${siteConfig.instagram}`} target="_blank" rel="noopener noreferrer">@{siteConfig.instagram}</a></span></div></div>
        <form className="contact-form" onSubmit={submit}><p><strong>Prefere enviar uma mensagem?</strong> Preencha e continue pelo WhatsApp.</p><div className="form-row"><label className="field">Nome<input name="nome" required autoComplete="name" /></label><label className="field">Telefone<input name="telefone" type="tel" required autoComplete="tel" /></label></div><label className="field">Objetivo<select name="objetivo">{services.map((s) => <option key={s[1]}>{s[1]}</option>)}<option>Outro</option></select></label><label className="field">Mensagem (opcional)<textarea name="mensagem" rows={3} /></label><label className="consent-label"><input type="checkbox" required /><span>Concordo com o uso dos meus dados para contato, conforme a <a href="#" onClick={(e) => { e.preventDefault(); show("priv"); }}>Política de Privacidade</a> (LGPD).</span></label><Button type="submit" variant="whatsapp"><MessageCircle />Enviar mensagem</Button></form></div></section>
      <section className="final-cta"><Leaf className="leaf-decoration" /><h2 className="script">Vamos juntos?</h2><p>Sua saúde merece um cuidado especial. Dê o primeiro passo.</p><WhatsButton inverse /></section>
    </main>
    <footer className="site-footer"><div className="site-container"><div className="footer-top"><Brand /><p className="footer-motto">Nutrição é a chave para a sua melhor versão ♡</p><div className="footer-socials"><a href={`https://instagram.com/${siteConfig.instagram}`} aria-label="Instagram" target="_blank" rel="noopener noreferrer"><Instagram /></a><a href={whatsappUrl()} aria-label="WhatsApp" target="_blank" rel="noopener noreferrer" onClick={trackWhatsapp}><MessageCircle /></a></div></div><div className="footer-bottom"><span>Todos os direitos reservados | Naturalmente Você | {siteConfig.crn}</span><div className="footer-legal"><a href="#" onClick={(e) => { e.preventDefault(); show("priv"); }}>Política de Privacidade</a><a href="#" onClick={(e) => { e.preventDefault(); show("terms"); }}>Termos</a></div></div><p className="educational-note">As informações deste site têm caráter educativo e não substituem uma consulta individual.</p></div></footer>
    <WhatsButton className="floating-whatsapp"><span className="sr-only">Fale comigo pelo WhatsApp</span></WhatsButton>
    {cookies && <div className="cookie-banner" role="dialog" aria-label="Aviso de cookies"><p>Usamos cookies para medir o desempenho do site. Você pode aceitar ou recusar. <a href="#" onClick={(e) => { e.preventDefault(); show("priv"); }}>Saiba mais</a></p><div className="cookie-actions"><Button variant="ghost" onClick={() => consent("declined")}>Recusar</Button><Button onClick={() => consent("accepted")}>Aceitar</Button></div></div>}
    <Dialog open={!!dialog} onOpenChange={(o) => !o && setDialog(null)}><DialogContent className="content-dialog">{dialog && <>{dialog.img && <img src={dialog.img} alt="" />}<DialogTitle>{dialog.title}</DialogTitle><p>{dialog.body}</p>{dialog.cta && <WhatsButton />}</>}</DialogContent></Dialog>
  </>;
}
