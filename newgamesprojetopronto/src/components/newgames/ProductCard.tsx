import { formatarPreco, type Produto } from "@/data/produtos";
import { waProduto } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "./WhatsAppIcon";

const condicaoEstilo: Record<Produto["condicao"], string> = {
  Novo: "border-neon-blue/60 text-neon-blue bg-neon-blue/10",
  Seminovo: "border-neon-purple/60 text-neon-purple bg-neon-purple/10",
  "Retrô": "border-neon-magenta/60 text-neon-magenta bg-neon-magenta/10",
};

export function ProductCard({
  produto,
  retro = false,
}: {
  produto: Produto;
  retro?: boolean;
}) {
  const preco = formatarPreco(produto.preco);

  return (
    <article
      className={cn(
        "glass-card group flex h-full flex-col overflow-hidden rounded-2xl p-3",
        retro && "scanlines rounded-none pixel-border",
      )}
    >
      <div className="relative mb-3 overflow-hidden rounded-xl bg-surface-2/60 p-3">
        <img
          src={produto.imagem}
          alt={produto.nome}
          loading="lazy"
          width={768}
          height={768}
          className="mx-auto aspect-square w-full max-w-44 object-contain transition-transform duration-500 group-hover:scale-105"
        />
        <span
          className={cn(
            "absolute left-2 top-2 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest",
            condicaoEstilo[produto.condicao],
          )}
        >
          {produto.condicao}
        </span>
      </div>

      <h3 className="line-clamp-2 min-h-10 text-sm font-semibold leading-5 text-foreground">
        {produto.nome}
      </h3>
      <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{produto.descricao}</p>

      <div className="mt-3">
        <p className="font-title text-xl text-foreground">{preco}</p>
        {produto.precoPix && (
          <p className="text-xs text-neon-blue">
            {formatarPreco(produto.precoPix)} à vista no Pix
          </p>
        )}
      </div>

      <a
        href={waProduto(produto.nome, preco)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-neon px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-primary-foreground transition-all duration-300 hover:glow-purple"
      >
        <WhatsAppIcon className="size-4" />
        Comprar no WhatsApp
      </a>
    </article>
  );
}
