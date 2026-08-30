import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

import { Footer } from "@/components/newgames/Footer";
import { Header } from "@/components/newgames/Header";
import { Hero } from "@/components/newgames/Hero";
import { ProductCard } from "@/components/newgames/ProductCard";
import {
  CategoryGrid,
  FloatingWhatsApp,
  Particles,
  ProductSection,
  RetroSection,
  SectionTitle,
  StoreSection,
  TrustBar,
} from "@/components/newgames/Sections";
import { carregarProdutos, type Produto } from "@/data/produtos";
import { waGeral } from "@/lib/whatsapp";

const TITULO = "NewGames — Consoles, Games Retrô e PC Gamer";
const DESCRICAO =
  "Catálogo NewGames: PlayStation, Xbox, Nintendo, consoles retrô e PC Gamer. Loja física em Pará de Minas/MG, seminovos com garantia e atendimento direto no WhatsApp.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITULO },
      { name: "description", content: DESCRICAO },
      { property: "og:title", content: TITULO },
      { property: "og:description", content: DESCRICAO },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [busca, setBusca] = useState("");
  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    let ativo = true;
    void carregarProdutos().then((lista) => {
      if (ativo) setProdutos(lista);
    });
    return () => {
      ativo = false;
    };
  }, []);

  const resultados = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    if (!termo) return [];
    return produtos.filter(
      (p) =>
        p.nome.toLowerCase().includes(termo) ||
        p.descricao.toLowerCase().includes(termo) ||
        p.categoria.includes(termo),
    );
  }, [busca, produtos]);

  return (
    <div className="min-h-screen bg-background">
      <Particles />
      <Header busca={busca} onBusca={setBusca} />

      <main className="relative z-10">
        {busca.trim() ? (
          <section className="mx-auto max-w-7xl px-4 py-10">
            <SectionTitle kicker={`${resultados.length} resultado(s)`}>
              {`Busca por "${busca.trim()}"`}
            </SectionTitle>
            {resultados.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Nada encontrado. Fale com a gente no WhatsApp que procuramos para você.
              </p>
            ) : (
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {resultados.map((p) => (
                  <ProductCard key={p.id} produto={p} />
                ))}
              </div>
            )}
          </section>
        ) : (
          <>
            <Hero />
            <TrustBar />
            <CategoryGrid />
            <div id="consoles" className="scroll-mt-32" />
            {produtos.length === 0 && (
              <section className="mx-auto max-w-3xl px-4 py-16 text-center">
                <SectionTitle kicker="Catálogo">Produtos chegando em breve</SectionTitle>
                <p className="text-sm text-muted-foreground">
                  Estamos atualizando o catálogo. Enquanto isso, fale com a gente no
                  WhatsApp e diga o que você procura — temos muito mais na loja física.
                </p>
                <a
                  href={waGeral()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex rounded-full bg-gradient-neon px-6 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-all hover:-translate-y-0.5 hover:glow-purple"
                >
                  Falar no WhatsApp
                </a>
              </section>
            )}
            <ProductSection
              id="playstation"
              kicker="Sony"
              titulo="Consoles PlayStation"
              categoria="playstation"
              produtos={produtos}
            />
            <ProductSection
              id="xbox"
              kicker="Microsoft"
              titulo="Consoles Xbox"
              categoria="xbox"
              produtos={produtos}
            />
            <ProductSection
              id="nintendo"
              kicker="Nintendo"
              titulo="Consoles Nintendo"
              categoria="nintendo"
              produtos={produtos}
            />
            <RetroSection produtos={produtos} />
            <ProductSection
              id="pcgamer"
              kicker="Setup completo"
              titulo="PC Gamer e placas de vídeo"
              categoria="pcgamer"
              produtos={produtos}
            />
            <ProductSection
              id="acessorios"
              kicker="Complete o setup"
              titulo="Acessórios gamer"
              categoria="acessorios"
              produtos={produtos}
            />
            <StoreSection />
          </>
        )}
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
