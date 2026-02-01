// Formatação de mensagens de transação para WhatsApp

import { formatarMoeda } from './formatadorMensagens';

export interface DadosTransacao {
  descricao: string;
  valor: number;
  categoria: string;
  tipo: 'entrada' | 'saida';
  metodo: 'credito' | 'debito';
  carteiraNome?: string;
  data?: string;
  id?: number; // ID da transação para gerar identificador
}

/**
 * Gera identificador único baseado no ID da transação
 */
function gerarIdentificador(id: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let resultado = '';
  let num = id;
  for (let i = 0; i < 5; i++) {
    resultado += chars[num % chars.length];
    num = Math.floor(num / chars.length);
  }
  return resultado.split('').reverse().join('');
}

/**
 * Capitaliza primeira letra de cada palavra
 */
function capitalizar(texto: string): string {
  return texto
    .split(' ')
    .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Retorna emoji baseado na categoria
 */
function obterEmojiCategoria(categoria: string): string {
  const emojis: { [key: string]: string } = {
    'alimentação': '🍔',
    'alimentacao': '🍔',
    'transporte': '🚗',
    'saúde': '🏥',
    'saude': '🏥',
    'educação': '📚',
    'educacao': '📚',
    'lazer': '🎮',
    'moradia': '🏠',
    'compras': '🛒',
    'outros': '📦',
  };
  
  return emojis[categoria.toLowerCase()] || '📦';
}

/**
 * Formata mensagem de transação registrada seguindo o padrão especificado
 */
export function formatarMensagemTransacao(transacao: DadosTransacao): string {
  const categoriaCapitalizada = capitalizar(transacao.categoria);
  const carteiraNome = transacao.carteiraNome || '—';
  const emojiCategoria = obterEmojiCategoria(transacao.categoria);
  
  const dataFormatada = transacao.data 
    ? new Date(transacao.data + 'T00:00:00').toLocaleDateString('pt-BR')
    : new Date().toLocaleDateString('pt-BR');
  
  // Gera identificador se tiver ID
  const identificador = transacao.id ? gerarIdentificador(transacao.id) : 'N/A';
  
  let mensagem = `${transacao.descricao}\n`;
  mensagem += `${formatarMoeda(transacao.valor)}\n`;
  mensagem += `${dataFormatada}\n`;
  mensagem += `${categoriaCapitalizada} ${emojiCategoria}\n\n`;
  mensagem += `Registrado no perfil: *${carteiraNome}*\n\n`;
  mensagem += `Acesse seus registros em:\nhttps://app.usezela.com`;
  
  return mensagem;
}

/**
 * Formata mensagem para múltiplas transações
 */
export function formatarMensagemMultiplasTransacoes(transacoes: DadosTransacao[]): string {
  let mensagem = `*${transacoes.length} Transações Registradas*\n\n`;
  
  transacoes.forEach((t, index) => {
    const categoriaCapitalizada = capitalizar(t.categoria);
    const carteiraNome = t.carteiraNome || '—';
    const emojiCategoria = obterEmojiCategoria(t.categoria);
    const identificador = t.id ? gerarIdentificador(t.id) : 'N/A';
    
    const dataFormatada = t.data 
      ? new Date(t.data + 'T00:00:00').toLocaleDateString('pt-BR')
      : new Date().toLocaleDateString('pt-BR');
    
    mensagem += `${t.descricao}\n`;
    mensagem += `${formatarMoeda(t.valor)}\n`;
    mensagem += `${dataFormatada}\n`;
    mensagem += `${categoriaCapitalizada} ${emojiCategoria}\n`;
    mensagem += `Registrado no perfil: *${carteiraNome}*\n\n`;
  });
  
  return mensagem.trim();
}

/**
 * Gera identificador a partir do ID (exportado para uso externo)
 */
export function gerarIdentificadorTransacao(id: number | undefined): string {
  return id ? gerarIdentificador(id) : 'N/A';
}

/**
 * Decodifica ID da transação a partir do identificador
 * Nota: Esta função é uma aproximação, pois o identificador é gerado de forma não reversível
 * Para uso real, devemos armazenar o mapeamento identificador -> ID ou usar o ID diretamente
 */
export function decodificarIdentificador(identificador: string): number | null {
  // Como o identificador não é totalmente reversível, retornamos null
  // A lógica de exclusão deve usar o ID diretamente ou buscar por identificador
  return null;
}
