import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaChevronDown } from 'react-icons/fa'

const faqs = [
  {
    question: 'Como funciona o registro de transações?',
    answer: 'É muito simples! Você envia uma mensagem no WhatsApp descrevendo sua transação, como "gastei 50 reais com almoço". Nossa IA analisa a mensagem e extrai automaticamente o valor, categoria, tipo (entrada/saída) e método de pagamento. Tudo é registrado automaticamente sem você precisar preencher formulários.',
  },
  {
    question: 'Preciso instalar algum aplicativo?',
    answer: 'Não! O Zela funciona diretamente no WhatsApp que você já usa. Não precisa instalar nada. Você também pode acessar o portal web no navegador para ver gráficos e relatórios detalhados.',
  },
  {
    question: 'Meus dados estão seguros?',
    answer: 'Sim! Utilizamos criptografia de ponta a ponta para proteger seus dados financeiros. Sua privacidade é nossa prioridade e nunca compartilhamos suas informações com terceiros.',
  },
  {
    question: 'Posso usar áudio ao invés de texto?',
    answer: 'Claro! Você pode enviar mensagens de texto ou áudio no WhatsApp. Nossa IA transcreve os áudios automaticamente e processa da mesma forma. Perfeito para quando você está na rua ou dirigindo.',
  },
  {
    question: 'Como funciona o agendamento de pagamentos?',
    answer: 'Você pode agendar pagamentos e recebimentos futuros enviando uma mensagem como "tenho que pagar 300 reais de aluguel no dia 5". O sistema cria o agendamento e você recebe notificações quando chegar a data.',
  },
  {
    question: 'Posso cancelar a qualquer momento?',
    answer: 'Sim! Não há fidelidade. Você pode cancelar sua assinatura a qualquer momento sem nenhuma multa ou taxa adicional. Seus dados permanecerão acessíveis durante o período pago.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="py-20 md:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Perguntas
            <span className="block text-teal-600">Frequentes</span>
          </h2>
          <p className="text-xl text-gray-600">
            Tire suas dúvidas sobre o Zela
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaChevronDown className="text-teal-600 flex-shrink-0" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 py-4 text-gray-600 leading-relaxed border-t border-gray-100">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

