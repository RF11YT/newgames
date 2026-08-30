import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { waGeral, waLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./WhatsAppIcon";

const banners = [
  {
    imagem: "/banner-retro-futuro.png",
    titulo: "Do clássico ao lançamento",
    subtitulo: "Todas as gerações. Toda a diversão.",
    cta: waGeral(),
    ctaLabel: "Fale no WhatsApp",
  },
  {
    imagem: "/banner-geracoes.png",
    titulo: "Jogos que marcaram gerações",
    subtitulo: "Consoles retrô revisados e com garantia.",
    cta: waLink("Olá NewGames! Quero ver os consoles retrô disponíveis."),
    ctaLabel: "Ver retrô no WhatsApp",
  },
];

export function Hero() {
  const [atual, setAtual] = useState(0);

  const proximo = useCallback(() => setAtual((i) => (i + 1) % banners.length), []);
  const anterior = () => setAtual((i) => (i - 1 + banners.length) % banners.length);

  useEffect(() => {
    const t = setInterval(proximo, 7000);
    return () => clearInterval(t);
  }, [proximo]);

  return (
    <section id="topo" className="relative overflow-hidden border-b border-border">
      <div className="relative mx-auto max-w-[1600px]">
        {banners.map((b, i) => (
          <div
            key={b.titulo}
            className={`transition-opacity duration-700 ${
              i === atual ? "opacity-100" : "pointer-events-none absolute inset-0 opacity-0"
            }`}
          >
            <div className="relative">
              <img
                src={b.imagem}
                alt={b.titulo}
                width={1600}
                height={840}
                className="block w-full object-contain"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background to-transparent" />
              <div className="relative flex flex-wrap justify-center gap-3 px-4 pb-12 pt-6">
                <a
                  href={b.cta}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-neon px-5 py-3 text-xs font-bold uppercase tracking-wider text-primary-foreground transition-all hover:-translate-y-0.5 hover:glow-purple sm:px-6 sm:text-sm"
                >
                  <WhatsAppIcon className="size-4" />
                  {b.ctaLabel}
                </a>
                <a
                  href="#categorias"
                  className="inline-flex items-center gap-2 rounded-full border border-neon-blue/50 bg-surface/70 px-5 py-3 text-xs font-bold uppercase tracking-wider backdrop-blur transition-all hover:border-neon-magenta/70 hover:glow-magenta sm:px-6 sm:text-sm"
                >
                  Ver catálogo
                </a>
              </div>
            </div>
          </div>
        ))}


        <button
          type="button"
          onClick={anterior}
          aria-label="Banner anterior"
          className="absolute left-3 top-1/2 z-10 hidden size-10 sm:grid -translate-y-1/2 place-items-center rounded-full border border-border bg-background/60 backdrop-blur transition-colors hover:border-neon-blue"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          onClick={proximo}
          aria-label="Próximo banner"
          className="absolute right-3 top-1/2 z-10 hidden size-10 sm:grid -translate-y-1/2 place-items-center rounded-full border border-border bg-background/60 backdrop-blur transition-colors hover:border-neon-blue"
        >
          <ChevronRight className="size-5" />
        </button>

        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {banners.map((b, i) => (
            <button
              key={b.titulo}
              type="button"
              onClick={() => setAtual(i)}
              aria-label={`Ir para o banner ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === atual ? "w-8 bg-gradient-neon" : "w-3 bg-muted-foreground/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
