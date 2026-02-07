import crypto from 'crypto';

const API_BASE = process.env.ABACATEPAY_API_BASE || 'https://api.abacatepay.com/v1';
const API_KEY = process.env.ABACATEPAY_API_KEY || '';

export interface BillingResult {
  id: string;
  url: string;
  status: string;
  amount: number;
  metadata?: Record<string, any>;
}

function getHeaders() {
  if (!API_KEY) {
    throw new Error('ABACATEPAY_API_KEY não configurada');
  }

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  };
}

export async function criarCobrancaAbacatePay(input: {
  title: string;
  amount: number; // em centavos
  methods?: string[];
  metadata?: Record<string, any>;
  returnUrl?: string;
  callbackUrl?: string;
}): Promise<BillingResult> {
  const payload = {
    title: input.title,
    amount: input.amount,
    methods: input.methods || ['PIX'],
    metadata: input.metadata || {},
    returnUrl: input.returnUrl,
    callbackUrl: input.callbackUrl,
    frequency: 'ONE_TIME',
  };

  const response = await fetch(`${API_BASE}/billing/create`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Abacate Pay retornou ${response.status}: ${errorText}`);
  }

  const data: any = await response.json();
  return {
    id: data?.data?.id || data?.id,
    url: data?.data?.url || data?.url,
    status: data?.data?.status || data?.status,
    amount: data?.data?.amount || data?.amount,
    metadata: data?.data?.metadata || data?.metadata,
  };
}

export async function buscarCobrancaAbacatePay(billingId: string): Promise<BillingResult> {
  const response = await fetch(`${API_BASE}/billing/get?billingId=${encodeURIComponent(billingId)}`, {
    method: 'GET',
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Não foi possível buscar cobrança ${billingId}: ${errorText}`);
  }

  const data: any = await response.json();
  const billing = data?.data || data;

  return {
    id: billing.id,
    url: billing.url,
    status: billing.status,
    amount: billing.amount,
    metadata: billing.metadata,
  };
}

export function validarAssinaturaWebhook(rawBody: string, assinaturaHeader?: string): boolean {
  if (!assinaturaHeader) return false;

  const publicKey = process.env.ABACATEPAY_WEBHOOK_PUBLIC_KEY || 'ABACATE_WEBHOOK_PUBLIC_KEY';
  const hmac = crypto.createHmac('sha256', publicKey);
  hmac.update(rawBody);
  const assinaturaCalculada = hmac.digest('base64');

  return assinaturaCalculada === assinaturaHeader;
}
