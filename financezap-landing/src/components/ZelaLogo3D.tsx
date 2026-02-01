import { motion } from 'framer-motion'

interface ZelaLogo3DProps {
  size?: number
  className?: string
}

export function ZelaLogo3D({ size = 400, className = '' }: ZelaLogo3DProps) {
  const logoSize = size * 0.85
  
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {/* Container com perspectiva 3D */}
      <motion.div
        initial={{ rotateY: -20, rotateX: 8 }}
        animate={{ rotateY: [-20, -12, -20], rotateX: [8, 4, 8] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          perspective: '1200px',
          transformStyle: 'preserve-3d',
          width: '100%',
          height: '100%',
        }}
        className="relative"
      >
        {/* Fundo arredondado com gradiente 3D profundo */}
        <motion.div
          className="absolute inset-0 rounded-[2rem]"
          style={{
            background: `
              linear-gradient(135deg, 
                hsl(160, 70%, 18%) 0%, 
                hsl(160, 70%, 22%) 30%,
                hsl(160, 70%, 25%) 50%,
                hsl(160, 70%, 28%) 70%,
                hsl(160, 70%, 30%) 100%
              )
            `,
            boxShadow: `
              inset 0 4px 20px rgba(0, 0, 0, 0.4),
              inset 0 -4px 20px rgba(0, 0, 0, 0.3),
              0 30px 80px rgba(0, 0, 0, 0.5),
              0 0 0 1px rgba(255, 255, 255, 0.08),
              0 0 40px rgba(20, 184, 166, 0.2)
            `,
            transform: 'translateZ(20px)',
          }}
        />

        {/* Letra Z com efeito 3D e brilho metálico */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: 'translateZ(50px)',
          }}
        >
          <svg
            width={logoSize * 0.65}
            height={logoSize * 0.65}
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="relative z-10"
          >
            <defs>
              {/* Gradiente branco com brilho metálico */}
              <linearGradient id="zGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 1)" />
                <stop offset="30%" stopColor="rgba(255, 255, 255, 0.98)" />
                <stop offset="50%" stopColor="rgba(255, 255, 255, 0.95)" />
                <stop offset="70%" stopColor="rgba(255, 255, 255, 0.92)" />
                <stop offset="100%" stopColor="rgba(255, 255, 255, 0.88)" />
              </linearGradient>
              
              {/* Filtro de brilho */}
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Letra Z com gradiente e brilho */}
            <path
              d="M 30 50 L 170 50 L 30 150 L 170 150"
              stroke="url(#zGradient)"
              strokeWidth="20"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              filter="url(#glow)"
              style={{
                filter: 'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.4)) drop-shadow(0 0 20px rgba(255, 255, 255, 0.3))',
              }}
            />
          </svg>
        </motion.div>

        {/* Reflexos de luz no topo esquerdo (estilo Netflix) */}
        <motion.div
          className="absolute top-0 left-0 w-2/3 h-2/5 rounded-tl-[2rem]"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.08) 50%, transparent 100%)',
            transform: 'translateZ(35px)',
          }}
        />

        {/* Reflexo inferior direito */}
        <motion.div
          className="absolute bottom-0 right-0 w-1/2 h-1/3 rounded-br-[2rem]"
          style={{
            background: 'linear-gradient(315deg, rgba(0, 0, 0, 0.25) 0%, transparent 100%)',
            transform: 'translateZ(15px)',
          }}
        />

        {/* Brilho sutil no centro */}
        <motion.div
          className="absolute inset-0 rounded-[2rem]"
          style={{
            background: 'radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.1) 0%, transparent 60%)',
            transform: 'translateZ(25px)',
          }}
        />

        {/* Sombra projetada no chão (estilo Netflix) */}
        <motion.div
          className="absolute -bottom-12 left-1/2 transform -translate-x-1/2"
          style={{
            width: '90%',
            height: '40px',
            background: 'radial-gradient(ellipse, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.2) 40%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(20px)',
          }}
        />
      </motion.div>
    </div>
  )
}

