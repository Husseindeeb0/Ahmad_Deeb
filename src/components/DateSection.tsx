import { motion } from 'framer-motion';

export default function DateSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-memorial-black to-memorial-dark">
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5 }}
          className="flex flex-col items-center"
        >
          {/* Top Decorative Line */}
          <div className="w-px h-16 bg-gradient-to-b from-transparent to-memorial-yellow/50 mb-8"></div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 w-full">

            <div className="flex flex-col items-center">
              <span className="text-sm tracking-widest text-gray-500 uppercase mb-2">تاريخ الولادة</span>
              <span className="text-3xl md:text-5xl font-amiri text-white">١ فبراير ١٩٧٧</span>
            </div>

            <div className="hidden md:block w-px h-24 bg-memorial-green/50"></div>
            <div className="md:hidden w-24 h-px bg-memorial-green/50"></div>

            <div className="flex flex-col items-center">
              <span className="text-sm tracking-widest text-gray-500 uppercase mb-2">تاريخ الاستشهاد</span>
              <span className="text-3xl md:text-5xl font-amiri text-memorial-yellow">٩ مارس ٢٠٢٦</span>
            </div>

          </div>

          {/* Bottom Decorative Line */}
          <div className="w-px h-16 bg-gradient-to-t from-transparent to-memorial-yellow/50 mt-8"></div>
        </motion.div>
      </div>
    </section>
  );
}
