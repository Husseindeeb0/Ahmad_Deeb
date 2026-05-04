import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function TributeFooter() {
  return (
    <footer className="py-20 relative bg-memorial-black border-t border-white/5 overflow-hidden">
      {/* Background glow accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-memorial-yellow/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        >
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-memorial-yellow/20 rounded-full blur-xl opacity-50" />
              <Heart className="text-memorial-yellow/60 fill-memorial-yellow/10 relative" size={32} />
            </div>
          </div>

          <h3 className="text-3xl md:text-4xl font-amiri text-white mb-6">
            ستبقى ذكراك حيّة في قلوبنا
          </h3>
          
          <p className="text-gray-500 font-cairo text-sm md:text-base leading-loose max-w-lg mx-auto mb-12">
            تم إنشاء هذا المزار الرقمي تخليداً لذكرى الشهيد أحمد ذيب. 
            نسأل الله أن يتغمده بواسع رحمته ويسكنه فسيح جناته.
          </p>

          <div className="flex flex-col items-center gap-6">
             <div className="w-12 h-px bg-white/10" />
             <div className="text-[10px] uppercase tracking-[0.2em] text-gray-600 font-cairo">
               ٢٠٢٦ - مزار الشهيد أحمد ذيب الرقمي
             </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
