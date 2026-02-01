import { motion } from 'framer-motion'
import { FaStar } from 'react-icons/fa'

const testimonials = [
  {
    name: 'Maria Silva',
    role: 'Empresária',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    text: 'Finalmente uma solução que funciona! Consigo registrar meus gastos enquanto estou na rua, só mandando uma mensagem no WhatsApp. A IA entende perfeitamente o que eu quero dizer.',
    rating: 5,
  },
  {
    name: 'João Santos',
    role: 'Freelancer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    text: 'Como trabalho com vários clientes, preciso controlar bem minhas finanças. O Zela me ajuda a não perder nenhuma receita ou gasto. O melhor é que funciona direto no WhatsApp!',
    rating: 5,
  },
  {
    name: 'Ana Costa',
    role: 'Estudante',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    text: 'Sou muito esquecida e sempre esquecia de anotar meus gastos. Agora é só mandar um áudio no WhatsApp e pronto! A IA organiza tudo. Mudou completamente minha relação com o dinheiro.',
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            O que nossos usuários
            <span className="block text-teal-600">estão dizendo</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Milhares de pessoas já estão usando o Zela para transformar sua relação com o dinheiro
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-lg" />
                ))}
              </div>
              
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center space-x-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

