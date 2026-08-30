import { CreditCard, Gamepad2, ShieldCheck, Truck } from "lucide-react";

import loja from "@/assets/loja-fisica.jpg";
import { categorias, type Categoria, type Produto } from "@/data/produtos";
import { LOJA, waGeral, waLink } from "@/lib/whatsapp";
import { ProductCard } from "./ProductCard";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function TrustBar() {
  const selos = [
    { icon: ShieldCheck, texto: "Loja física 100% segura" },
    { icon: Truck, texto: "Entrega nacional" },
    { icon: Gamepad2, texto: "Seminovos com garantia" },
    { icon: CreditCard, texto: "Pagamento facilitado" },
  ];

  return (
    <section className="border-y border-border bg-surface/50">
      <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-6 lg:grid-cols-4">
        {selos.map(({ icon: Icon, texto }) => (
          <li key={texto} className="flex min-w-0 items-center gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-full border border-neon-blue/40 bg-surface-2/70 text-neon-blue">
              <Icon className="size-5" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:text-sm">
              {texto}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function SectionTitle({
  children,
  kicker,
}: {
  children: string;
  kicker?: string | undefined;
}) {
  return (
    <div className="mb-6">
      {kicker && (
        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-neon-magenta">
          {kicker}
        </span>
      )}
      <h2 className="font-title text-2xl sm:text-3xl">{children}</h2>
      <div className="neon-divider mt-3 w-24" />
    </div>
  );
}

export function CategoryGrid() {
  return (
    <section id="categorias" className="retro-grid py-14">
      <div className="mx-auto max-w-7xl px-4">
        <SectionTitle kicker="Escolha sua plataforma">Categorias em destaque</SectionTitle>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          {categorias.map((c) => (
            <a
              key={c.slug}
              href={`#${c.slug}`}
              className="glass-card group relative flex flex-col items-center gap-2 overflow-hidden rounded-2xl p-4 text-center sm:flex-row sm:gap-3 sm:text-left"
            >
              <img
                src={c.imagem}
                alt={c.nome}
                loading="lazy"
                width={768}
                height={768}
                className="size-16 shrink-0 object-contain transition-transform duration-500 group-hover:scale-110 sm:size-20"
              />
              <span className="min-w-0">
                <span className="block font-title text-sm sm:text-lg">{c.nome}</span>
                <span className="block text-xs text-muted-foreground">
                  {c.descricao}
                </span>
              </span>

            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProductSection({
  id,
  titulo,
  kicker,
  categoria,
  produtos,
}: {
  id: string;
  titulo: string;
  kicker?: string;
  categoria: Categoria;
  produtos: Produto[];
}) {
  const lista = produtos.filter((p) => p.categoria === categoria);
  if (lista.length === 0) return null;

  return (
    <section id={id} className="scroll-mt-32 py-12">
      <div className="mx-auto max-w-7xl px-4">
        <SectionTitle kicker={kicker}>{titulo}</SectionTitle>
        <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
          {lista.map((p) => (
            <div key={p.id} className="w-[75vw] max-w-72 shrink-0 snap-start sm:w-auto sm:max-w-none">
              <ProductCard produto={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function RetroSection({ produtos }: { produtos: Produto[] }) {
  const lista = produtos.filter((p) => p.categoria === "retro");
  if (lista.length === 0) return null;

  return (
    <section id="retro" className="retro-grid scroll-mt-32 border-y border-neon-magenta/25 bg-surface-2/50 py-14">
      <div className="mx-auto max-w-7xl px-4">
        <SectionTitle kicker="Retrô & Seminovos">Clássicos que marcaram gerações</SectionTitle>
        <p className="-mt-3 mb-6 max-w-xl text-sm text-muted-foreground">
          Consoles revisados, testados e prontos para jogar. Cada peça passa pela
          bancada da NewGames antes de ir para a prateleira.
        </p>
        <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
          {lista.map((p) => (
            <div key={p.id} className="w-[75vw] max-w-72 shrink-0 snap-start sm:w-auto sm:max-w-none">
              <ProductCard produto={p} retro />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StoreSection() {
  return (
    <section className="py-14">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-border">
          <img
            src={loja}
            alt="Interior da loja física NewGames com iluminação neon"
            loading="lazy"
            width={1280}
            height={853}
            className="size-full object-cover"
          />
        </div>
        <div>
          <SectionTitle kicker="Presencial">Venha visitar nossa loja física</SectionTitle>
          <p className="text-sm text-muted-foreground sm:text-base">
            Teste os consoles, veja os seminovos de perto e conte com a ajuda de
            quem entende de games. Estamos no {LOJA.endereco}, {LOJA.horario}.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={LOJA.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-neon-blue/50 bg-surface/60 px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all hover:-translate-y-0.5 hover:glow-blue"
            >
              Como chegar
            </a>
            <a
              href={waLink("Olá NewGames! Gostaria de saber o horário de funcionamento da loja física.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-neon px-6 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-all hover:-translate-y-0.5 hover:glow-purple"
            >
              <WhatsAppIcon className="size-4" />
              Chamar no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FloatingWhatsApp() {
  return (
    <a
      href={waGeral()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="pulse-wa fixed bottom-5 right-5 z-50 grid size-14 place-items-center rounded-full bg-whatsapp text-primary-foreground shadow-lg transition-transform hover:scale-110"
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}

export function Particles() {
  const pontos = [
    { left: "8%", top: "18%", delay: "0s", color: "bg-neon-blue" },
    { left: "22%", top: "62%", delay: "1.2s", color: "bg-neon-magenta" },
    { left: "48%", top: "28%", delay: "2.4s", color: "bg-neon-purple" },
    { left: "70%", top: "70%", delay: "0.6s", color: "bg-neon-blue" },
    { left: "88%", top: "35%", delay: "1.8s", color: "bg-neon-magenta" },
  ];

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {pontos.map((p, i) => (
        <span
          key={i}
          className={`float-slow absolute size-1.5 rounded-sm ${p.color}`}
          style={{ left: p.left, top: p.top, animationDelay: p.delay }}
        />
      ))}
    </div>
  );
}
