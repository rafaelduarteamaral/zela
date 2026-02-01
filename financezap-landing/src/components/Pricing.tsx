import { motion } from 'framer-motion'
import { FaCheck, FaWhatsapp, FaRocket } from 'react-icons/fa'

const plans = [
  {
    name: 'Gratuito',
    price: 'R$ 0',
    period: 'sempre',
    description: 'Perfeito para começar a organizar suas finanças',
    features: [
      'Registro de transações via WhatsApp',
      'Até 50 transações por mês',
      'Categorização automática',
      'Dashboard básico',
      'Suporte por email',
    ],
    cta: 'Começar Grátis',
    popular: false,
    icon: FaWhatsapp,
  },
  {
    name: 'Premium',
    price: 'R$ 29',
    period: 'mês',
    description: 'Para quem quer controle total das finanças',
    features: [
      'Transações ilimitadas',
      'Agendamentos inteligentes',
      'Relatórios detalhados',
      'Chat de IA financeira',
      'Análises avançadas',
      'Suporte prioritário',
      'Exportação de dados',
    ],
    cta: 'Assinar Agora',
    popular: true,
    icon: FaRocket,
  },
]

export default function Pricing() {
  return (
    <section id="precos" className="py-20 md:py-32 bg-gradient-to-br from-teal-50 to-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Planos que cabem
            <span className="block text-teal-600">no seu bolso</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comece grátis e atualize quando precisar de mais recursos
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative bg-white p-8 rounded-2xl shadow-xl border-2 ${
                  plan.popular
                    ? 'border-teal-600 scale-105 md:scale-110'
                    : 'border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-teal-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Mais Popular
                  </div>
                )}

                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-4">
                    <Icon className="text-2xl text-teal-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600 ml-2">/{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <FaCheck className="text-teal-600 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.a
                  href="https://app.usezela.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`block w-full text-center py-4 rounded-full font-semibold text-lg transition-all ${
                    plan.popular
                      ? 'bg-teal-600 text-white hover:bg-teal-700 shadow-lg hover:shadow-xl'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {plan.cta}
                </motion.a>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600">
            ✨ Todos os planos incluem teste grátis de 14 dias • Cancele quando quiser
          </p>
        </motion.div>
      </div>
    </section>
  )
}

