import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  '/images/image.jpeg',
  '/images/image2.jpeg',
  '/images/image3.jpeg',
  '/images/image4.jpeg',
  '/images/image5.jpeg',
  '/images/image6.jpeg',
  '/images/image7.jpeg',
  '/images/image8.jpeg',
  '/images/image9.jpeg',
  '/images/ahmad_deeb.jpeg',
];

export default function InfiniteMarqueeGallery() {
  const [index, setIndex] = useState(0);

  // Auto-cycle images
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setIndex((prev) => (prev + 1) % images.length);
  const prev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

  // Calculate indices for a 5-card visible stack
  const getVisibleIndices = () => {
    const indices = [];
    for (let i = -2; i <= 2; i++) {
      indices.push((index + i + images.length) % images.length);
    }
    return indices;
  };

  return (
    <section id="gallery" className="py-24 bg-memorial-black overflow-hidden relative min-h-[600px] flex flex-col items-center justify-center">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-amiri text-white mb-4"
        >
          ألبوم الذكريات
        </motion.h2>
        <div className="w-16 h-px bg-memorial-yellow/50 mx-auto"></div>
      </div>

      <div className="relative w-full max-w-5xl h-[400px] md:h-[500px] flex items-center justify-center">
        {/* Navigation Buttons */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 md:px-10 z-40">
          <button onClick={next} className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-memorial-yellow/20 hover:text-memorial-yellow transition-all">
            <ChevronRight size={32} />
          </button>
          <button onClick={prev} className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-memorial-yellow/20 hover:text-memorial-yellow transition-all">
            <ChevronLeft size={32} />
          </button>
        </div>

        <div className="relative w-full h-full flex items-center justify-center perspective-[1200px]">
          <AnimatePresence initial={false}>
            {getVisibleIndices().map((imgIdx, i) => {
              const position = i - 2; // -2, -1, 0, 1, 2
              const isActive = position === 0;

              return (
                <motion.div
                  key={images[imgIdx]}
                  initial={{ opacity: 0, scale: 0.8, x: position * 200 }}
                  animate={{
                    opacity: 1 - Math.abs(position) * 0.3,
                    scale: 1 - Math.abs(position) * 0.15,
                    x: position * (typeof window !== 'undefined' && window.innerWidth < 768 ? 80 : 220),
                    zIndex: 10 - Math.abs(position),
                    rotateY: position * -15,
                    filter: isActive ? 'blur(0px)' : 'blur(4px)',
                  }}
                  exit={{ opacity: 0, scale: 0.5, x: position * 300 }}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  className="absolute w-[280px] md:w-[450px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-white/10"
                >
                  <img
                    src={images[imgIdx]}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  {/* Glass overlay on non-active cards */}
                  {!isActive && <div className="absolute inset-0 bg-memorial-black/20 backdrop-blur-[2px]" />}
                  {/* Subtle vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="flex gap-2 mt-12 relative z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-1 rounded-full transition-all duration-500 ${index === i ? 'w-8 bg-memorial-yellow' : 'w-2 bg-white/20'}`}
          />
        ))}
      </div>

      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-memorial-yellow/5 rounded-full blur-[150px] pointer-events-none" />
    </section>
  );
}
