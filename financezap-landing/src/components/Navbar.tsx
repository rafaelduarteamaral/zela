import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Logo } from './Logo'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <div className="flex items-center space-x-3">
            <Logo size={40} />
            <span className="text-2xl font-bold" style={{ color: '#10b981' }}>Zela</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-700 hover:text-teal-600 transition-colors">
              Funcionalidades
            </a>
            <a href="#como-funciona" className="text-gray-700 hover:text-teal-600 transition-colors">
              Como Funciona
            </a>
            <a href="#precos" className="text-gray-700 hover:text-teal-600 transition-colors">
              Preços
            </a>
            <a href="#faq" className="text-gray-700 hover:text-teal-600 transition-colors">
              FAQ
            </a>
          </div>

          <div className="flex items-center space-x-3">
            <motion.a
              href="https://app.usezela.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-700 hover:text-teal-600 px-4 py-2.5 font-semibold transition-colors"
            >
              Já tenho uma conta
            </motion.a>
            <motion.a
              href="https://app.usezela.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-teal-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-teal-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Começar Agora
            </motion.a>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}


