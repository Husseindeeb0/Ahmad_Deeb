import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Mic2, Volume2 } from 'lucide-react';
import { event } from '../lib/analytics';

interface VoiceClip {
  id: number;
  title: string;
  duration: string;
  seconds: number;
  url: string;
}

const clips: VoiceClip[] = [
  { id: 1, title: 'اخر مقطع من دعاء كميل بصوت الشهيد', duration: '٢:١٩', seconds: 139, url: '/sounds/music6.mp3' },
  { id: 2, title: 'شعر الشهيد', duration: '٠:١٨', seconds: 18, url: '/sounds/music.mp3' },
  { id: 3, title: 'سلام على الامام علي(ع)', duration: '٠:١٨', seconds: 18, url: '/sounds/music2.mp3' },
  { id: 4, title: 'سلام على ابي فضل العباس(ع)', duration: '٠:٠٥', seconds: 5, url: '/sounds/music3.mp3' },
  { id: 5, title: 'مناجاة بأبي فضل العباس(ع)', duration: '٠:٠٨', seconds: 8, url: '/sounds/music4.mp3' },
  { id: 6, title: 'صلاة على النبي(ص)', duration: '٠:٠٤', seconds: 4, url: '/sounds/music5.mp3' },
];

export default function VoiceClips() {
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = (clip: VoiceClip) => {
    if (playingId === clip.id) {
      if (audioRef.current?.paused) {
        audioRef.current.play();
      } else {
        audioRef.current?.pause();
        setPlayingId(null);
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = clip.url;
        audioRef.current.load();
        setIsLoading(true);
        audioRef.current.play().catch(error => {
          console.error("Error playing audio:", error);
          setIsLoading(false);
        });

        // Track play event
        event({
          action: 'play_voice_clip',
          category: 'Audio',
          label: clip.title
        });
      }
      setPlayingId(clip.id);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleWaiting = () => setIsLoading(true);
    const handlePlaying = () => setIsLoading(false);
    const handleEnded = () => {
      setPlayingId(null);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('playing', handlePlaying);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('playing', handlePlaying);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>, clipId: number) => {
    if (playingId !== clipId || !audioRef.current || duration === 0) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (rect.width - x) / rect.width;
    const seekTime = Math.max(0, Math.min(percentage * duration, duration));
    
    audioRef.current.currentTime = seekTime;
  };

  return (
    <section id="audios" className="py-24 bg-memorial-dark relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-memorial-yellow/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-memorial-yellow/10 border border-memorial-yellow/20 mb-6">
            <Mic2 size={14} className="text-memorial-yellow" />
            <span className="text-[10px] uppercase tracking-widest text-memorial-yellow font-cairo">تسجيلات صوتية</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-amiri text-white mb-4">عبارات بصوت الشهيد</h2>
          <div className="w-16 h-px bg-memorial-yellow/50 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {clips.map((clip, idx) => (
            <motion.div
              key={clip.id}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className={`relative group p-6 rounded-2xl border transition-all duration-500 overflow-hidden ${
                playingId === clip.id 
                ? 'bg-memorial-yellow/10 border-memorial-yellow/40 shadow-[0_0_30px_rgba(212,175,55,0.1)]' 
                : 'bg-memorial-black/40 border-white/5 hover:border-white/10 hover:bg-memorial-black/60'
              }`}
            >
              <div className="flex items-center gap-6 relative z-10 pb-4">
                {/* Play Button */}
                <button
                  onClick={() => togglePlay(clip)}
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 relative ${
                    playingId === clip.id
                    ? 'bg-memorial-yellow text-memorial-black'
                    : 'bg-white/5 text-white group-hover:bg-memorial-yellow/20 group-hover:text-memorial-yellow'
                  }`}
                >
                  {isLoading && playingId === clip.id ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-6 h-6 border-2 border-memorial-black border-t-transparent rounded-full"
                    />
                  ) : (
                    playingId === clip.id ? <Pause fill="currentColor" size={24} /> : <Play fill="currentColor" className="ml-1" size={24} />
                  )}
                </button>

                <div className="flex-1 min-w-0 text-right">
                  <h3 className={`text-lg md:text-xl font-amiri mb-1 transition-colors ${playingId === clip.id ? 'text-memorial-yellow' : 'text-white'}`}>
                    {clip.title}
                  </h3>
                  <div className="flex items-center justify-end gap-3 text-xs text-gray-500 font-cairo">
                    <span>{clip.duration}</span>
                    <Volume2 size={12} className={playingId === clip.id ? 'text-memorial-yellow' : ''} />
                  </div>
                </div>

                {/* Animated Waveform (Only visible when playing) */}
                <AnimatePresence>
                  {playingId === clip.id && !isLoading && (
                    <motion.div 
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      className="flex items-end gap-1 h-8"
                    >
                      {[1, 2, 3, 4, 5].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ 
                            height: [8, 24, 12, 32, 8],
                          }}
                          transition={{ 
                            duration: 0.8, 
                            repeat: Infinity, 
                            delay: i * 0.1,
                            ease: "easeInOut"
                          }}
                          className="w-1 bg-memorial-yellow rounded-full"
                        />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Real-time Interactive Progress Bar */}
              <div 
                className="absolute bottom-0 right-0 left-0 h-6 flex items-end cursor-pointer group/progress z-20"
                onClick={(e) => handleSeek(e, clip.id)}
              >
                <div className="w-full h-1 bg-white/5 relative">
                  {playingId === clip.id && (
                    <div 
                      className="h-full bg-memorial-yellow transition-[width] duration-100 ease-linear absolute right-0"
                      style={{ width: `${(currentTime / duration) * 100}%` }}
                    >
                      {/* Handle / Knob */}
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-memorial-yellow rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Hidden Global Audio Element for Clips */}
        <audio ref={audioRef} />
      </div>
    </section>
  );
}
