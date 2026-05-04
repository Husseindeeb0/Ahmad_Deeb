import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

// Placeholder images using CSS gradients — replace with actual images later
const images = [
  { id: 1, caption: 'ذكريات لا تُنسى', color: '#0a2e1d' },
  { id: 2, caption: 'تأملات وهدوء', color: '#1a3a2a' },
  { id: 3, caption: 'نور في نهاية الطريق', color: '#0d1f15' },
  { id: 4, caption: 'ابتسامة باقية', color: '#142b1e' },
  { id: 5, caption: 'مواقف خالدة', color: '#0b2418' },
  { id: 6, caption: 'أيام جميلة', color: '#112a1c' },
];

// Heights for masonry effect
const heights = ['h-72', 'h-56', 'h-80', 'h-64', 'h-72', 'h-56'];

export default function Gallery() {
  const [selectedImg, setSelectedImg] = useState<number | null>(null);

  const openModal = (index: number) => setSelectedImg(index);
  const closeModal = () => setSelectedImg(null);
  
  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImg !== null) {
      setSelectedImg((selectedImg + 1) % images.length);
    }
  };
  
  const prevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImg !== null) {
      setSelectedImg((selectedImg - 1 + images.length) % images.length);
    }
  };

  return (
    <section className="py-24 bg-memorial-dark relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-amiri text-white mb-4">معرض الذكريات</h2>
          <div className="w-16 h-px bg-memorial-yellow/50 mx-auto"></div>
        </motion.div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((img, idx) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className={`relative group overflow-hidden rounded-xl cursor-pointer shadow-lg break-inside-avoid ${heights[idx]}`}
              onClick={() => openModal(idx)}
            >
              {/* Placeholder card with gradient — replace with <img> when you have real images */}
              <div 
                className="w-full h-full transition-transform duration-1000 group-hover:scale-110"
                style={{ background: `linear-gradient(135deg, ${img.color} 0%, #050505 100%)` }}
              >
                {/* Decorative SVG element */}
                <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id={`pat-${img.id}`} width="40" height="40" patternUnits="userSpaceOnUse">
                      <circle cx="20" cy="20" r="1" fill="#d4af37" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill={`url(#pat-${img.id})`} />
                </svg>

                {/* Center icon placeholder */}
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="0.8" className="w-16 h-16">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
              </div>

              {/* Hover caption overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-memorial-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                <p className="text-white/90 font-amiri p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {img.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {selectedImg !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-memorial-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <button 
              onClick={closeModal}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
            >
              <X size={32} />
            </button>

            <button 
              onClick={prevImg}
              className="absolute left-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white hover:scale-110 transition-all"
            >
              <ChevronLeft size={48} />
            </button>

            <button 
              onClick={nextImg}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white hover:scale-110 transition-all"
            >
              <ChevronRight size={48} />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="relative max-w-5xl w-full max-h-[80vh] flex flex-col items-center"
              onClick={e => e.stopPropagation()}
            >
              {/* Placeholder enlarged view */}
              <div 
                className="w-full h-[60vh] rounded-lg shadow-2xl"
                style={{ background: `linear-gradient(135deg, ${images[selectedImg].color} 0%, #050505 100%)` }}
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="0.5" className="w-32 h-32">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
              </div>
              <p className="mt-6 text-xl font-amiri text-memorial-yellow/90">
                {images[selectedImg].caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
