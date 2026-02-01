import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useToast } from '../contexts/ToastContext';
import { api } from '../services/api';
import { 
  FaTimes,
  FaLock,
  FaCheckCircle,
  FaSpinner,
  FaCopy,
  FaExternalLinkAlt,
  FaQrcode
} from 'react-icons/fa';

interface ModalPagamentoProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  plano: {
    id: string;
    nome: string;
    preco: number;
    periodo: string;
  } | null;
}

type StatusPagamento = 'inicial' | 'gerado' | 'aguardando' | 'pago';

export function ModalPagamento({ isOpen, onClose, onSuccess, plano }: ModalPagamentoProps) {
  const { theme } = useTheme();
  const { showError, showSuccess, showInfo } = useToast();
  const isDark = theme === 'dark';

  const [billingId, setBillingId] = useState<string | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<StatusPagamento>('inicial');
  const [gerando, setGerando] = useState(false);
  const [verificando, setVerificando] = useState(false);
  const [copiado, setCopiado] = useState(false);

  if (!isOpen || !plano) return null;

  const reset = () => {
    setBillingId(null);
    setCheckoutUrl(null);
    setStatus('inicial');
    setGerando(false);
    setVerificando(false);
    setCopiado(false);
  };

  const fecharModal = () => {
    if (gerando || verificando) return;
    reset();
    onClose();
  };

  const gerarLinkPagamento = async () => {
    if (!plano) return;
    setGerando(true);
    try {
      const resp = await api.criarPagamentoAssinatura(plano.id);
      if (!resp.success) {
        throw new Error(resp.error || 'Falha ao criar cobrança');
      }

      setBillingId(resp.billingId);
      setCheckoutUrl(resp.checkoutUrl);
      setStatus('gerado');
      showInfo('Abrimos o Abacate Pay em uma nova aba. Conclua o PIX e depois clique em "Verificar pagamento".');
      if (resp.checkoutUrl) {
        window.open(resp.checkoutUrl, '_blank', 'noopener,noreferrer');
      }
    } catch (error: any) {
      showError(`Não foi possível gerar o pagamento: ${error.message}`);
    } finally {
      setGerando(false);
    }
  };

  const verificarPagamento = async () => {
    if (!billingId) {
      showError('Gere o link primeiro para conseguirmos checar o pagamento.');
      return;
    }

    setVerificando(true);
    try {
      const resp = await api.statusPagamentoAssinatura(billingId);
      setStatus(resp.status === 'paid' ? 'pago' : 'aguardando');

      if (resp.status === 'paid') {
        showSuccess('Pagamento confirmado pelo Abacate Pay! Ativando assinatura...');
        await onSuccess();
      } else {
        showInfo('Pagamento ainda não compensado. Aguarde alguns segundos e tente novamente.');
      }
    } catch (error: any) {
      showError(`Erro ao verificar pagamento: ${error.message}`);
    } finally {
      setVerificando(false);
    }
  };

  const copiarLink = async () => {
    if (!checkoutUrl) return;
    await navigator.clipboard.writeText(checkoutUrl);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={fecharModal}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className={`relative w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden ${
            isDark ? 'bg-slate-800' : 'bg-white'
          }`}
        >
          <div className={`p-6 border-b ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
            <div className="flex items-center justify-between">
              <div>
                <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Finalizar pelo Abacate Pay (PIX)
                </h2>
                <p className={`text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Plano {plano.nome} — R$ {plano.preco.toFixed(2)}/{plano.periodo}
                </p>
              </div>
              <button
                onClick={fecharModal}
                disabled={gerando || verificando}
                className={`p-2 rounded-lg transition-colors ${
                  isDark 
                    ? 'hover:bg-slate-700 text-slate-400' 
                    : 'hover:bg-slate-100 text-slate-500'
                } ${gerando || verificando ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <FaTimes size={20} />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-5">
            <div className={`p-4 rounded-xl ${isDark ? 'bg-slate-700/60' : 'bg-slate-50'} border ${isDark ? 'border-slate-600' : 'border-slate-200'}`}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                  <FaQrcode />
                </div>
                <div>
                  <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Pagamentos via Abacate Pay</p>
                  <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Cobrança segura por PIX. Você será redirecionado para concluir o pagamento.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <motion.button
                whileHover={!gerando ? { scale: 1.01 } : {}}
                whileTap={!gerando ? { scale: 0.99 } : {}}
                onClick={gerarLinkPagamento}
                disabled={gerando}
                className={`w-full py-4 rounded-xl font-semibold text-white transition-colors flex items-center justify-center gap-2 ${
                  gerando ? 'bg-slate-500 cursor-not-allowed' : 'bg-primary-600 hover:bg-primary-700'
                }`}
              >
                {gerando ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    Gerando cobrança...
                  </>
                ) : (
                  <>
                    <FaLock size={14} />
                    Gerar link de pagamento (PIX)
                  </>
                )}
              </motion.button>

              {checkoutUrl && (
                <div className={`p-4 rounded-lg border ${isDark ? 'border-slate-600 bg-slate-700/50' : 'border-slate-200 bg-slate-50'}`}>
                  <p className={`text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Link da cobrança</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-xs break-all">{checkoutUrl}</code>
                    <button
                      onClick={copiarLink}
                      className={`px-3 py-2 rounded-lg text-sm font-medium ${
                        copiado
                          ? 'bg-emerald-500 text-white'
                          : isDark
                          ? 'bg-slate-600 text-white hover:bg-slate-500'
                          : 'bg-slate-200 text-slate-800 hover:bg-slate-300'
                      }`}
                    >
                      {copiado ? <FaCheckCircle /> : <FaCopy />}
                    </button>
                    <a
                      href={checkoutUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-3 py-2 rounded-lg text-sm font-medium inline-flex items-center gap-2 ${
                        isDark ? 'bg-primary-600 text-white hover:bg-primary-500' : 'bg-primary-600 text-white hover:bg-primary-700'
                      }`}
                    >
                      Abrir
                      <FaExternalLinkAlt size={12} />
                    </a>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Status</p>
              <div className="flex flex-wrap gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  status === 'pago'
                    ? 'bg-emerald-500/15 text-emerald-500 border border-emerald-400/40'
                    : status === 'gerado'
                    ? 'bg-amber-500/15 text-amber-500 border border-amber-400/40'
                    : 'bg-slate-500/15 text-slate-500 border border-slate-400/40'
                }`}>
                  {status === 'pago' ? 'Pagamento confirmado' : status === 'gerado' ? 'Cobrança criada' : 'Aguardando geração'}
                </span>
                {billingId && (
                  <span className={`px-3 py-1 rounded-full text-xs ${isDark ? 'bg-slate-700 text-slate-200' : 'bg-slate-100 text-slate-700'}`}>
                    Billing ID: {billingId}
                  </span>
                )}
              </div>
            </div>

            <motion.button
              whileHover={!verificando ? { scale: 1.01 } : {}}
              whileTap={!verificando ? { scale: 0.99 } : {}}
              onClick={verificarPagamento}
              disabled={verificando}
              className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 ${
                verificando
                  ? 'bg-slate-500 text-white cursor-not-allowed'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700'
              }`}
            >
              {verificando ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Checando pagamento...
                </>
              ) : (
                <>
                  <FaCheckCircle />
                  Verificar pagamento
                </>
              )}
            </motion.button>

            <p className={`text-xs text-center flex items-center justify-center gap-1 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
              <FaLock size={10} />
              O processamento acontece pelo Abacate Pay. Seus dados ficam protegidos.
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
