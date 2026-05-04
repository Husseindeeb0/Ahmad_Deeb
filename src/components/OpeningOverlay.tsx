import { motion, AnimatePresence } from 'framer-motion';

interface OpeningOverlayProps {
  hasEntered: boolean;
  onEnter: () => void;
}

export default function OpeningOverlay({ hasEntered, onEnter }: OpeningOverlayProps) {
  return (
    <AnimatePresence>
      {!hasEntered && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)", transition: { duration: 1.5, ease: "easeInOut" } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Layer 1: Background Image — fills the entire screen */}
          <img
            src="/images/ahmad_deeb.jpeg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-[center_30%]"
          />

          {/* Layer 2: Heavy dark overlay so content stays readable */}
          <div className="absolute inset-0 bg-black/75" />

          {/* Layer 3: Dark green radial glow — top */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[900px] h-[600px] rounded-full opacity-30"
            style={{ background: 'radial-gradient(ellipse, #0a2e1d 0%, transparent 70%)' }}
          />

          {/* Layer 4: Warm yellow glow — center bottom */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/4 w-[700px] h-[400px] rounded-full opacity-15"
            style={{ background: 'radial-gradient(ellipse, #d4af37 0%, transparent 70%)' }}
          />

          {/* Layer 5: Vignette edges */}
          <div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)' }}
          />

          {/* Content — on top of everything */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1.2, ease: "easeOut" }}
            className="relative z-10 text-center px-6"
          >
            {/* Decorative top line */}
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.2, duration: 1.5, ease: "easeOut" }}
              className="w-20 h-px bg-memorial-yellow/40 mx-auto mb-10"
            />

            <h1 className="text-5xl md:text-7xl font-amiri text-memorial-yellow mb-6 drop-shadow-[0_0_40px_rgba(212,175,55,0.2)]">
              ذكرى خالدة
            </h1>

            <p className="text-lg md:text-xl text-gray-400 mb-14 max-w-md mx-auto leading-relaxed font-cairo">
              هذا الفضاء الرقمي مخصص لإحياء ذكرى الشهيد أحمد ذيب.
              <br />
              مكان لنستذكر فيه حضوره، صوته، وكلماته التي لا تموت.
            </p>
            
            <button
              onClick={onEnter}
              className="group relative px-10 py-3.5 overflow-hidden rounded-full bg-transparent border border-memorial-yellow/30 hover:border-memorial-yellow/70 transition-all duration-700"
            >
              {/* Hover fill sweep */}
              <div className="absolute inset-0 bg-memorial-yellow/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out origin-right" />
              <span className="relative z-10 tracking-widest text-sm text-memorial-yellow/80 group-hover:text-memorial-yellow transition-colors duration-500 font-cairo">
                الدخول إلى المزار
              </span>
            </button>

            {/* Decorative bottom line */}
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.5, duration: 1.5, ease: "easeOut" }}
              className="w-20 h-px bg-memorial-yellow/40 mx-auto mt-10"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
