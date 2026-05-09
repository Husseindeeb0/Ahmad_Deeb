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

            <div className="flex flex-col items-center gap-6">
              <div className="flex flex-col items-center">
                <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-4">تاريخ الولادة</span>
                <div className="space-y-4">
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] text-memorial-yellow/40 uppercase tracking-widest mb-1 font-cairo">ميلادي</span>
                    <span className="text-3xl md:text-5xl font-amiri text-white">١ فبراير ١٩٧٧</span>
                  </div>
                  <div className="w-8 h-px bg-white/5 mx-auto" />
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] text-memorial-yellow/40 uppercase tracking-widest mb-1 font-cairo">هجري</span>
                    <span className="text-2xl md:text-4xl font-amiri text-white/60">١٣ صفر ١٣٩٧ هـ.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden md:block w-px h-32 bg-gradient-to-b from-transparent via-memorial-green/50 to-transparent"></div>
            <div className="md:hidden w-32 h-px bg-gradient-to-r from-transparent via-memorial-green/50 to-transparent my-4"></div>

            <div className="flex flex-col items-center gap-6">
              <div className="flex flex-col items-center">
                <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-4">تاريخ الاستشهاد</span>
                <div className="space-y-4">
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] text-memorial-yellow/40 uppercase tracking-widest mb-1 font-cairo">ميلادي</span>
                    <span className="text-3xl md:text-5xl font-amiri text-memorial-yellow">٩ مارس ٢٠٢٦</span>
                  </div>
                  <div className="w-8 h-px bg-memorial-yellow/10 mx-auto" />
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] text-memorial-yellow/40 uppercase tracking-widest mb-1 font-cairo">هجري</span>
                    <span className="text-2xl md:text-4xl font-amiri text-memorial-yellow/60">١٩ رمضان ١٤٤٧ هـ.</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Decorative Line */}
          <div className="w-px h-16 bg-gradient-to-t from-transparent to-memorial-yellow/50 mt-8"></div>
        </motion.div>
      </div>
    </section>
  );
}
