import { motion } from 'framer-motion'
import { FaCommentDots, FaRobot, FaCheckCircle } from 'react-icons/fa'

const steps = [
  {
    number: '01',
    title: 'Envie uma Mensagem',
    description: 'Abra o WhatsApp e envie uma mensagem simples descrevendo sua transação. Pode ser texto ou áudio!',
    example: '"Gastei 50 reais com almoço hoje"',
    icon: FaCommentDots,
  },
  {
    number: '02',
    title: 'IA Processa Automaticamente',
    description: 'Nossa inteligência artificial analisa sua mensagem e extrai todas as informações necessárias.',
    example: 'Valor: R$ 50,00 | Categoria: Alimentação | Tipo: Saída',
    icon: FaRobot,
  },
  {
    number: '03',
    title: 'Pronto! Tudo Organizado',
    description: 'Sua transação é registrada automaticamente e você pode visualizar tudo no portal web.',
    example: 'Dashboard atualizado em tempo real',
    icon: FaCheckCircle,
  },
]

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-20 md:py-32 bg-gradient-to-br from-teal-50 to-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Simples assim:
            <span className="block text-teal-600">3 passos para começar</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Não precisa instalar nada. Não precisa aprender nada novo. Use o WhatsApp que você já conhece.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative"
              >
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-20 left-full w-full h-0.5 bg-teal-200 -z-10" style={{ width: 'calc(100% - 4rem)' }}>
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-teal-600 rounded-full"></div>
                  </div>
                )}

                <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 h-full">
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-6xl font-bold text-teal-100">{step.number}</div>
                    <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
                      <Icon className="text-2xl text-teal-600" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{step.description}</p>
                  
                  <div className="bg-teal-50 p-4 rounded-lg border-l-4 border-teal-600">
                    <p className="text-sm text-teal-800 font-medium">{step.example}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <motion.a
            href="https://app.usezela.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-teal-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all hover:bg-teal-700"
          >
            Começar Agora - É Grátis!
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

