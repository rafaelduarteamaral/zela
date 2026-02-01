import { motion } from 'framer-motion'
import { FaWhatsapp, FaBrain, FaChartLine, FaCalendarAlt, FaShieldAlt, FaMobileAlt } from 'react-icons/fa'

const features = [
  {
    icon: FaWhatsapp,
    title: 'Registro por WhatsApp',
    description: 'Envie mensagens de texto ou áudio descrevendo suas transações. A IA entende linguagem natural e registra tudo automaticamente.',
    color: 'text-teal-600',
    bgColor: 'bg-teal-100',
  },
  {
    icon: FaBrain,
    title: 'IA Inteligente',
    description: 'Nossa IA extrai automaticamente valor, categoria, tipo e método de pagamento das suas mensagens. Sem formulários complicados.',
    color: 'text-primary-600',
    bgColor: 'bg-primary-100',
  },
  {
    icon: FaChartLine,
    title: 'Análises Detalhadas',
    description: 'Visualize gráficos, relatórios e estatísticas completas no portal web. Entenda para onde vai seu dinheiro.',
    color: 'text-teal-600',
    bgColor: 'bg-teal-100',
  },
  {
    icon: FaCalendarAlt,
    title: 'Agendamentos Inteligentes',
    description: 'Agende pagamentos e recebimentos futuros via WhatsApp. Receba notificações automáticas quando chegar a data.',
    color: 'text-primary-600',
    bgColor: 'bg-primary-100',
  },
  {
    icon: FaShieldAlt,
    title: 'Seguro e Privado',
    description: 'Seus dados financeiros são protegidos com criptografia de ponta a ponta. Sua privacidade é nossa prioridade.',
    color: 'text-teal-600',
    bgColor: 'bg-teal-100',
  },
  {
    icon: FaMobileAlt,
    title: 'Acesse de Qualquer Lugar',
    description: 'Use no WhatsApp do celular ou acesse o portal web no computador. Tudo sincronizado em tempo real.',
    color: 'text-primary-600',
    bgColor: 'bg-primary-100',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Tudo que você precisa para
            <span className="block text-teal-600">gerenciar suas finanças</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Uma solução completa que combina a praticidade do WhatsApp com o poder da inteligência artificial
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all"
              >
                <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6`}>
                  <Icon className={`text-2xl ${feature.color}`} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

