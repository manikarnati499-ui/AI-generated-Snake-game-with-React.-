/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, SkipForward, SkipBack, Music, Volume2 } from 'lucide-react';

const TRACKS = [
  {
    id: 1,
    title: "Neon Pulse",
    artist: "SynthAI_01",
    cover: "https://picsum.photos/seed/neon1/600/600",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    id: 2,
    title: "Digital Horizon",
    artist: "NeuralBeats",
    cover: "https://picsum.photos/seed/neon2/600/600",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    id: 3,
    title: "Quantum Echo",
    artist: "CyberFlow",
    cover: "https://picsum.photos/seed/neon3/600/600",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  }
];

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setProgress(0);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setProgress(0);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      setProgress((current / duration) * 100 || 0);
    }
  };

  const handleEnded = () => {
    nextTrack();
  };

  return (
    <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white/5 p-6 backdrop-blur-xl border border-white/10 shadow-2xl">
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />

      <div className="flex flex-col items-center">
        {/* Album Art */}
        <div className="relative mb-6 h-64 w-64">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTrack.id}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="h-full w-full overflow-hidden rounded-2xl shadow-[0_0_40px_rgba(236,72,153,0.3)]"
            >
              <img
                src={currentTrack.cover}
                alt={currentTrack.title}
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </AnimatePresence>
          
          {/* Audio Visualizer Mock */}
          {isPlaying && (
             <div className="absolute -bottom-4 left-0 right-0 flex items-end justify-center gap-1 h-12">
               {[...Array(8)].map((_, i) => (
                 <motion.div
                   key={i}
                   animate={{ height: [10, 40, 20, 35, 10] }}
                   transition={{ 
                     repeat: Infinity, 
                     duration: 0.5 + Math.random() * 0.5,
                     ease: "easeInOut"
                   }}
                   className="w-1.5 bg-cyan-400 rounded-full"
                 />
               ))}
             </div>
          )}
        </div>

        {/* Track Info */}
        <div className="mb-8 text-center">
          <h3 className="text-2xl font-bold text-white tracking-tight">{currentTrack.title}</h3>
          <p className="text-white/40 font-medium">{currentTrack.artist}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 w-full group cursor-pointer">
          <div className="relative h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-cyan-400 to-pink-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-2 flex justify-between text-[10px] text-white/20 font-bold uppercase tracking-widest">
            <span>Progress</span>
            <span className="flex items-center gap-1">
               <Volume2 className="h-3 w-3" />
               Streaming
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-8">
          <button
            onClick={prevTrack}
            className="text-white/40 transition-colors hover:text-white"
          >
            <SkipBack className="h-6 w-6" />
          </button>

          <button
            onClick={togglePlay}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-black transition-all hover:scale-110 active:scale-95 shadow-[0_0_20px_white]"
          >
            {isPlaying ? <Pause className="h-8 w-8 fill-black" /> : <Play className="h-8 w-8 fill-black ml-1" />}
          </button>

          <button
            onClick={nextTrack}
            className="text-white/40 transition-colors hover:text-white"
          >
            <SkipForward className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
