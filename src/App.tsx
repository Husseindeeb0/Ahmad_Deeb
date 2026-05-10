import { useState, useEffect } from 'react';
import { pageview } from './lib/analytics';
import OpeningOverlay from './components/OpeningOverlay.tsx';
import Bubbles from './components/Bubbles.tsx';
import Hero from './components/Hero.tsx';
import AudioPlayer from './components/AudioPlayer.tsx';
import QuoteSection from './components/QuoteSection.tsx';
import DateSection from './components/DateSection.tsx';
import MemoryTimeline from './components/MemoryTimeline.tsx';
import VideoSection from './components/VideoSection.tsx';
import VoiceClips from './components/VoiceClips.tsx';
import InfiniteMarqueeGallery from './components/InfiniteMarqueeGallery.tsx';
import TributeFooter from './components/TributeFooter.tsx';
import Navbar from './components/Navbar.tsx';

function App() {
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    pageview(window.location.pathname);
  }, []);

  return (
    <div className="relative bg-memorial-black min-h-screen text-white font-cairo">
      <Bubbles hasEntered={hasEntered} />
      <OpeningOverlay hasEntered={hasEntered} onEnter={() => setHasEntered(true)} />
      
      {hasEntered && (
        <>
          <Navbar />
          <AudioPlayer />
          <main>
            <Hero />
            <DateSection />
            <QuoteSection />
            <MemoryTimeline />
            <VoiceClips />
            <InfiniteMarqueeGallery />
            <VideoSection />
            <TributeFooter />
          </main>
        </>
      )}
    </div>
  );
}

export default App;