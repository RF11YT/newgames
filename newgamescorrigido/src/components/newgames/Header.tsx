import { Clock, MapPin, Menu, Search, Store, X } from "lucide-react";
import { useState } from "react";

import { LOJA, waGeral } from "@/lib/whatsapp";
import { Logo } from "./Logo";
import { WhatsAppIcon } from "./WhatsAppIcon";

const menu = [
  { label: "Consoles", href: "#consoles" },
  { label: "PlayStation", href: "#playstation" },
  { label: "Xbox", href: "#xbox" },
  { label: "Nintendo", href: "#nintendo" },
  { label: "Retrô & Seminovos", href: "#retro" },
  { label: "PC Gamer", href: "#pcgamer" },
  { label: "Acessórios", href: "#acessorios" },
];

export function Header({
  busca,
  onBusca,
}: {
  busca: string;
  onBusca: (v: string) => void;
}) {
  const [aberto, setAberto] = useState(false);

  return (
    <>
      {/* Barra superior fina */}
      <div className="bg-surface-2/80 text-[11px] text-muted-foreground">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-5 gap-y-1 px-4 py-2 sm:justify-between">
          <span className="flex min-w-0 items-center gap-1.5">
            <MapPin className="size-3.5 shrink-0 text-neon-blue" />
            <span className="truncate">{LOJA.endereco}</span>
          </span>
          <span className="flex items-center gap-4">
            <span className="hidden items-center gap-1.5 sm:flex">
              <Clock className="size-3.5 shrink-0 text-neon-purple" />
              {LOJA.horario}
            </span>
            <span className="flex items-center gap-1.5 text-neon-magenta">
              <Store className="size-3.5 shrink-0" />
              Loja física
            </span>
          </span>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-xl">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 lg:grid-cols-[auto_minmax(0,1fr)_auto]">
          <a href="#topo" className="min-w-0">
            <Logo />
          </a>

          <div className="order-3 col-span-2 lg:order-none lg:col-span-1">
            <label className="relative block">
              <span className="sr-only">Buscar produtos</span>
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={busca}
                onChange={(e) => onBusca(e.target.value)}
                type="search"
                placeholder="Buscar console, jogo ou acessório..."
                className="w-full rounded-full border border-border bg-surface/70 py-2.5 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-neon-blue/70 focus:outline-none focus:glow-blue"
              />
            </label>
          </div>

          <div className="flex items-center justify-end gap-2">
            <a
              href={waGeral()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-neon px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-primary-foreground transition-all hover:glow-purple"
            >
              <WhatsAppIcon className="size-4" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
            <button
              type="button"
              onClick={() => setAberto((v) => !v)}
              aria-label="Abrir menu"
              className="grid size-10 shrink-0 place-items-center rounded-full border border-border bg-surface/70 text-foreground lg:hidden"
            >
              {aberto ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {/* Menu desktop */}
        <nav className="hidden border-t border-border lg:block">
          <ul className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider">
            {menu.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-muted-foreground transition-colors hover:text-neon-blue"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Menu mobile */}
        {aberto && (
          <nav className="border-t border-border bg-surface/95 lg:hidden">
            <ul className="mx-auto grid max-w-7xl gap-1 px-4 py-3 text-sm font-semibold">
              {menu.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setAberto(false)}
                    className="block rounded-lg px-3 py-2.5 text-muted-foreground transition-colors hover:bg-surface-2/70 hover:text-neon-blue"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>
    </>
  );
}
