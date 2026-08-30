import { Clock, Facebook, Instagram, MapPin, Phone, Youtube } from "lucide-react";

import { LOJA, waGeral } from "@/lib/whatsapp";
import { Logo } from "./Logo";
import { WhatsAppIcon } from "./WhatsAppIcon";

const pagamentos = ["Pix", "Visa", "Master", "Elo", "Boleto"];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface-2/60">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 text-sm text-muted-foreground">
            Catálogo de consoles novos, seminovos e retrô. Atendimento humano pelo
            WhatsApp e loja física para você testar antes de levar.
          </p>
          <div className="mt-5 flex gap-3">
            {[
              { icon: Instagram, href: LOJA.instagram, label: "Instagram" },
              { icon: Facebook, href: LOJA.facebook, label: "Facebook" },
              { icon: Youtube, href: LOJA.youtube, label: "YouTube" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid size-9 place-items-center rounded-full border border-border bg-surface/70 text-muted-foreground transition-all hover:border-neon-magenta/70 hover:text-neon-magenta"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-title text-sm text-neon-blue">Contato</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <Phone className="mt-0.5 size-4 shrink-0 text-neon-purple" />
              {LOJA.telefone}
            </li>
            <li className="flex gap-2">
              <WhatsAppIcon className="mt-0.5 size-4 shrink-0 text-whatsapp" />
              <a href={waGeral()} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                {LOJA.whatsappExibicao}
              </a>
            </li>
            <li className="flex gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-neon-magenta" />
              {LOJA.endereco}
            </li>
            <li className="flex gap-2">
              <Clock className="mt-0.5 size-4 shrink-0 text-neon-blue" />
              {LOJA.horario}
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-title text-sm text-neon-purple">Institucional</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            {["Sobre a NewGames", "Políticas da loja", "Trocas e devoluções", "Garantia de seminovos"].map(
              (item) => (
                <li key={item}>
                  <a href="#topo" className="transition-colors hover:text-neon-blue">
                    {item}
                  </a>
                </li>
              ),
            )}
          </ul>
        </div>

        <div>
          <h2 className="font-title text-sm text-neon-magenta">Formas de pagamento</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {pagamentos.map((p) => (
              <li
                key={p}
                className="rounded-md border border-border bg-surface/70 px-3 py-2 text-xs font-semibold text-muted-foreground"
              >
                {p}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-muted-foreground">
            Combinamos a forma de pagamento direto no WhatsApp. Este site é um
            catálogo — não realizamos vendas online.
          </p>
        </div>
      </div>

      <div className="neon-divider" />
      <p className="px-4 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} NewGames — Games & Informática. Todos os direitos reservados.
      </p>
    </footer>
  );
}
