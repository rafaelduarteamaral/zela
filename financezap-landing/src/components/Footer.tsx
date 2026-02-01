import { FaWhatsapp, FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-teal-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <FaWhatsapp className="text-2xl" />
              <span className="text-2xl font-bold">Zela</span>
            </div>
            <p className="text-teal-200">
              Suas finanças no WhatsApp. Gestão financeira inteligente e simples.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Produto</h3>
            <ul className="space-y-2 text-teal-200">
              <li><a href="#features" className="hover:text-white transition-colors">Funcionalidades</a></li>
              <li><a href="#como-funciona" className="hover:text-white transition-colors">Como Funciona</a></li>
              <li><a href="#precos" className="hover:text-white transition-colors">Preços</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="https://app.usezela.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors font-semibold">Acessar App</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Suporte</h3>
            <ul className="space-y-2 text-teal-200">
              <li><a href="#" className="hover:text-white transition-colors">Central de Ajuda</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacidade</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contato</h3>
            <ul className="space-y-2 text-teal-200">
              <li className="flex items-center space-x-2">
                <FaEnvelope />
                <span>contato@zela.com.br</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaWhatsapp />
                <span>+55 (11) 99999-9999</span>
              </li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-teal-200 hover:text-white transition-colors">
                <FaGithub className="text-xl" />
              </a>
              <a href="#" className="text-teal-200 hover:text-white transition-colors">
                <FaLinkedin className="text-xl" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-teal-800 pt-8 text-center text-teal-200">
          <p>&copy; {new Date().getFullYear()} Zela. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

