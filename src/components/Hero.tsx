import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Cinematic Background Image with Slow Zoom */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1.25 }}
        transition={{
          duration: 30,
          ease: "linear",
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute inset-0"
      >
        <img
          src="/images/image8.jpeg"
          alt=""
          className="w-full h-full object-cover object-[center_30%] opacity-55"
        />
        {/* Deep cinematic gradient layers on top of image */}
        <div className="absolute inset-0 bg-memorial-black/20" />
        <div
          className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full opacity-30"
          style={{
            background: "radial-gradient(ellipse, #0a2e1d 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(ellipse, #0a2e1d 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full opacity-15"
          style={{
            background: "radial-gradient(ellipse, #d4af37 0%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Deep cinematic transitions */}
      <div className="absolute inset-0 bg-gradient-to-t from-memorial-black/80 via-transparent to-memorial-black/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-memorial-black/40" />

      <div className="relative z-10 flex flex-col items-center text-center px-4 mt-10">
        {/* Portrait with Glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, filter: "blur(12px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          className="relative mb-10"
        >
          {/* Outer glow ring */}
          <div className="absolute -inset-6 bg-memorial-yellow/10 blur-3xl rounded-full" />

          {/* Portrait placeholder — replace src with actual photo */}
          <div className="relative w-48 h-48 md:w-60 md:h-60 rounded-full border-2 border-memorial-yellow/25 shadow-[0_0_60px_rgba(212,175,55,0.12)] overflow-hidden">
            <img
              src="/images/ahmad_deeb.jpeg"
              alt="صورة الشهيد أحمد ذيب"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-amiri text-white mb-5 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]"
        >
          الشهيد أحمد ذيب
        </motion.h1>

        {/* Dates */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.8 }}
          className="flex items-center gap-4 text-sm md:text-base text-gray-500 mb-10"
        >
          <span className="font-cairo">١٩٧٧</span>
          <span className="w-8 h-px bg-memorial-yellow/40"></span>
          <span className="font-cairo">٢٠٢٦</span>
        </motion.div>

        {/* Quote */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 2.5, ease: "easeOut" }}
          className="text-xl md:text-2xl font-amiri text-memorial-yellow/80 max-w-2xl leading-relaxed"
        >
          "حيٌّ في قلوبنا، خالدٌ في ذاكرتنا"
        </motion.p>
      </div>

      {/* Animated Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-cairo">اسحب لأسفل</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-memorial-yellow/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}
