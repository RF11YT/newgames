// Único canal de compra do site: WhatsApp.
// Formato do número: 55 + DDD + número.
export const WHATSAPP_NUMERO = "5537999944308";

export const LOJA = {
  nome: "NewGames",
  telefone: "(37) 99994-4308",
  whatsappExibicao: "(37) 99994-4308",
  endereco:
    "Rua Lucília Marinho de Aguiar Amorim, 737 — Redentor, Pará de Minas/MG · CEP 35660-361",
  horario: "Seg a Sex 9h às 19h · Sáb 9h às 14h",
  maps: "https://maps.google.com/?q=Rua+Lucilia+Marinho+de+Aguiar+Amorim,+737,+Para+de+Minas+MG,+35660-361",
  instagram: "https://instagram.com/",
  facebook: "https://facebook.com/",
  youtube: "https://youtube.com/",
};

export function waLink(mensagem: string) {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagem)}`;
}

export function waProduto(nome: string, precoFormatado: string) {
  return waLink(
    `Olá NewGames! Tenho interesse no ${nome} (${precoFormatado}). Está disponível?`,
  );
}

export const waGeral = () =>
  waLink("Olá NewGames! Vim pelo site e gostaria de mais informações.");
