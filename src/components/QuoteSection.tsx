import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function QuoteSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const quoteOpacity = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 1, 0]);
  const quoteScale = useTransform(scrollYProgress, [0.3, 0.5], [0.8, 1]);
  const quoteY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={sectionRef} className="py-48 relative bg-memorial-black flex items-center justify-center overflow-hidden">
      {/* Background glow layers */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[800px] bg-memorial-green/5 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute w-[400px] h-[400px] bg-memorial-yellow/5 rounded-full blur-[100px]"></div>
      </div>

      {/* Parallax Quotation Mark */}
      <motion.div 
        style={{ y: quoteY, opacity: 0.1 }}
        className="absolute inset-0 flex items-center justify-center select-none"
      >
        <span className="text-[40rem] font-amiri text-memorial-yellow leading-none transform -translate-y-24">
          "
        </span>
      </motion.div>

      <div className="max-w-5xl mx-auto px-8 text-center relative z-10">
        <motion.div
          style={{ opacity: quoteOpacity, scale: quoteScale }}
        >
          <div className="mb-16 flex justify-center">
             <div className="w-16 h-px bg-gradient-to-r from-transparent via-memorial-yellow/40 to-transparent"></div>
          </div>
          
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-amiri leading-[1.8] md:leading-[2] text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] italic">
            "ولا تحسبنّ الذين قتلوا في سبيل الله أمواتاً بل أحياءٌ عند ربهم يرزقون"
          </h2>
          
          <div className="mt-16 flex justify-center items-center gap-4">
            <div className="w-8 h-px bg-memorial-yellow/30"></div>
            <span className="text-memorial-yellow/60 font-amiri text-xl tracking-widest">سورة آل عمران</span>
            <div className="w-8 h-px bg-memorial-yellow/30"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
