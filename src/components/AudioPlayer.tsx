import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Music, ListMusic } from 'lucide-react';

const tracks = [
  { id: 1, name: 'موسيقى الخلفية', url: '/music.mp3' },
];

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [currentTrackIdx, setCurrentTrackIdx] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [showTracks, setShowTracks] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play().catch(e => console.log("Autoplay prevented:", e));
      audioRef.current.volume = volume;
    }
  }, [currentTrackIdx, isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
    if (parseFloat(e.target.value) > 0) setIsMuted(false);
  };

  const selectTrack = (idx: number) => {
    setCurrentTrackIdx(idx);
    setIsPlaying(true);
    setShowTracks(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-start flex-col-reverse gap-4">
      <audio 
        ref={audioRef} 
        src={tracks[currentTrackIdx].url} 
        loop 
      />

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-memorial-dark border border-memorial-yellow/20 rounded-full flex items-center justify-center text-memorial-yellow/80 hover:text-memorial-yellow hover:border-memorial-yellow/50 transition-colors shadow-lg"
      >
        <Music size={20} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
            exit={{ opacity: 0, y: 20, scale: 0.9, x: 20 }}
            className="bg-memorial-dark/95 backdrop-blur-md border border-memorial-green/30 p-5 rounded-2xl shadow-2xl flex flex-col gap-4 w-64 origin-bottom-right"
          >
            <div className="text-xs text-gray-400 font-amiri text-center mb-1 border-b border-white/10 pb-2">
              التحكم بالصوت
            </div>

            {/* Current Track Info */}
            <div className="flex flex-col items-center gap-1">
              <span className="text-xs text-memorial-yellow font-amiri truncate w-full text-center">
                {tracks[currentTrackIdx].name}
              </span>
            </div>
            
            <div className="flex items-center justify-between gap-4">
              <button onClick={togglePlay} className="p-2 text-white hover:text-memorial-yellow transition-colors">
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>
              
              <div className="flex items-center gap-2 flex-1">
                <button onClick={toggleMute} className="text-gray-400 hover:text-white transition-colors">
                  {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
                <input 
                  type="range" 
                  min="0" 
                  max="1" 
                  step="0.01" 
                  value={isMuted ? 0 : volume} 
                  onChange={handleVolumeChange}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-memorial-yellow"
                />
              </div>

              {tracks.length > 1 && (
                <button 
                  onClick={() => setShowTracks(!showTracks)} 
                  className={`p-2 transition-colors ${showTracks ? 'text-memorial-yellow' : 'text-white hover:text-memorial-yellow'}`}
                >
                  <ListMusic size={20} />
                </button>
              )}
            </div>

            {/* Track Selector Panel */}
            <AnimatePresence>
              {showTracks && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden bg-black/40 rounded-xl"
                >
                  <div className="p-2 flex flex-col gap-1">
                    {tracks.map((track, idx) => (
                      <button
                        key={track.id}
                        onClick={() => selectTrack(idx)}
                        className={`text-right px-3 py-2 text-xs rounded-lg transition-colors font-amiri ${currentTrackIdx === idx ? 'bg-memorial-yellow/20 text-memorial-yellow' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                      >
                        {track.name}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
