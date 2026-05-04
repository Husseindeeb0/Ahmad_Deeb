import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';

const videos = [
  {
    id: 1,
    color: '#0a2e1d',
    url: '/videos/video.mp4'
  },
  {
    id: 2,
    color: '#142b1e',
    url: '/videos/video2.mp4'
  },
  {
    id: 3,
    color: '#1e2014',
    url: '/videos/video3.mp4'
  },
  {
    id: 4,
    color: '#1e2014',
    url: '/videos/video4.mp4'
  }
];

export default function VideoSection() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <section className="py-24 bg-memorial-black relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-amiri text-white mb-4">مقاطع مرئية</h2>
          <div className="w-16 h-px bg-memorial-yellow/50 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {videos.map((vid, idx) => (
            <motion.div
              key={vid.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: idx * 0.3 }}
              className="relative group rounded-3xl overflow-hidden cursor-pointer aspect-video shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5"
              onClick={() => vid.url && setSelectedVideo(vid.url)}
            >
              {/* Video Thumbnail (First Frame) */}
              <video 
                src={`${vid.url}#t=0.1`}
                preload="metadata"
                muted
                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
              />

              {/* Decorative SVG Overlay */}
              <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-700">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id={`grad-${vid.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={vid.color} />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                  <path d="M0,0 L100,0 L100,100 Z" fill={`url(#grad-${vid.id})`} />
                </svg>
              </div>

              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700 flex flex-col items-center justify-center">
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-20 h-20 rounded-full bg-memorial-yellow/10 backdrop-blur-xl flex items-center justify-center border border-memorial-yellow/20 group-hover:bg-memorial-yellow/30 transition-all duration-500 shadow-[0_0_30px_rgba(212,175,55,0.2)]"
                >
                  <Play className="text-memorial-yellow fill-memorial-yellow ml-1" size={28} />
                </motion.div>
              </div>

              {/* Corner accent */}
              <div className="absolute top-6 right-6 w-8 h-px bg-memorial-yellow/30 transform origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              <div className="absolute top-6 right-6 h-8 w-px bg-memorial-yellow/30 transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 delay-100" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
          >
            <button 
              onClick={() => setSelectedVideo(null)}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-50"
            >
              <X size={32} />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10"
            >
              <video 
                src={selectedVideo} 
                controls 
                autoPlay 
                className="w-full h-full object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
