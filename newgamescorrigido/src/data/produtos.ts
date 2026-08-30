// Catálogo da NewGames.
// Os produtos NÃO ficam mais aqui: eles são lidos do arquivo `public/catalogo.json`,
// que pode ser editado por fora do código (basta trocar o conteúdo do arquivo).

import ps5 from "@/assets/prod-ps5.png";
import megadrive from "@/assets/prod-megadrive.png";
import xbox from "@/assets/prod-xbox.png";
import switchImg from "@/assets/prod-switch.png";
import pcgamer from "@/assets/prod-pcgamer.png";
import headset from "@/assets/prod-headset.png";

export type Categoria =
  | "playstation"
  | "xbox"
  | "nintendo"
  | "retro"
  | "pcgamer"
  | "acessorios";

export type Condicao = "Novo" | "Seminovo" | "Retrô";

export interface Produto {
  id: string;
  nome: string;
  categoria: Categoria;
  condicao: Condicao;
  preco: number;
  precoPix?: number;
  imagem: string;
  descricao: string;
}

export const categorias: {
  slug: Categoria;
  nome: string;
  descricao: string;
  imagem: string;
}[] = [
  {
    slug: "playstation",
    nome: "PlayStation",
    descricao: "PS5, PS4 e clássicos",
    imagem: ps5,
  },
  { slug: "xbox", nome: "Xbox", descricao: "Series X|S e One", imagem: xbox },
  {
    slug: "nintendo",
    nome: "Nintendo",
    descricao: "Switch, Switch 2 e Lite",
    imagem: switchImg,
  },
  {
    slug: "retro",
    nome: "Retrô & Seminovos",
    descricao: "Clássicos revisados",
    imagem: megadrive,
  },
  {
    slug: "pcgamer",
    nome: "PC Gamer",
    descricao: "Setups e placas de vídeo",
    imagem: pcgamer,
  },
  {
    slug: "acessorios",
    nome: "Acessórios",
    descricao: "Controles, headsets e mais",
    imagem: headset,
  },
];

const categoriasValidas = new Set<string>(categorias.map((c) => c.slug));

function normalizar(item: Record<string, unknown>): Produto | null {
  const categoria = String(item["categoria"] ?? "").toLowerCase();
  if (!categoriasValidas.has(categoria)) return null;

  const condicaoBruta = String(item["condicao"] ?? "Novo").toLowerCase();
  const condicao: Condicao = condicaoBruta.startsWith("semi")
    ? "Seminovo"
    : condicaoBruta.startsWith("retr")
      ? "Retrô"
      : "Novo";

  const preco = Number(item["preco"]);
  if (!item["id"] || !item["nome"] || Number.isNaN(preco)) return null;

  const precoPixBruto = item["precoPix"];
  const precoPix = Number(precoPixBruto);

  return {
    id: String(item["id"]),
    nome: String(item["nome"]),
    categoria: categoria as Categoria,
    condicao,
    preco,
    ...(precoPixBruto != null && !Number.isNaN(precoPix) ? { precoPix } : {}),
    imagem: String(item["imagem"] ?? ""),
    descricao: String(item["descricao"] ?? ""),
  };
}

/** Lê o catálogo editável em /catalogo.json */
export async function carregarProdutos(): Promise<Produto[]> {
  try {
    const res = await fetch("/catalogo.json", { cache: "no-store" });
    if (!res.ok) return [];
    const json = (await res.json()) as { produtos?: Record<string, unknown>[] };
    const lista = Array.isArray(json.produtos) ? json.produtos : [];
    return lista.map(normalizar).filter((p): p is Produto => p !== null);
  } catch {
    return [];
  }
}

export const formatarPreco = (valor: number) =>
  valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
