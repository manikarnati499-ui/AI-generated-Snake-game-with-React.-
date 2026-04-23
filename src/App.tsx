/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';
import { motion } from 'motion/react';
import { Music, Gamepad2, Sparkles } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-cyan-500/30 overflow-x-hidden font-sans">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-cyan-900/20 blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] h-[40%] w-[40%] rounded-full bg-pink-900/20 blur-[120px]" />
      </div>

      <header className="relative z-10 border-b border-white/5 bg-black/40 px-6 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-pink-500 p-2 shadow-[0_0_20px_rgba(6,182,212,0.4)]">
              <Sparkles className="h-full w-full text-black" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tighter sm:text-2xl">
                NEON<span className="text-cyan-400">PULSE</span>
              </h1>
              <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                 <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                 System Operational
              </div>
            </div>
          </div>

          <nav className="hidden items-center gap-6 md:flex">
             <a href="#" className="text-xs font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors">Arcade</a>
             <a href="#" className="text-xs font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors">Broadcast</a>
             <a href="#" className="text-xs font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors">Neural Net</a>
          </nav>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-7xl p-6 lg:p-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
          {/* Game Section */}
          <section>
            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10">
                <Gamepad2 className="h-6 w-6 text-cyan-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Synapse Runner</h2>
                <div className="text-sm font-medium text-white/40">Neural Link Stabilization: 98.4%</div>
              </div>
            </div>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden rounded-[2rem] bg-gradient-to-b from-white/5 to-transparent p-1 ring-1 ring-white/10"
            >
              <div className="rounded-[1.9rem] bg-[#0A0A0A] p-8 shadow-inner">
                <SnakeGame />
              </div>
            </motion.div>
          </section>

          {/* Music Section */}
          <aside className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10">
                <Music className="h-6 w-6 text-pink-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Audio Core</h2>
                <div className="text-sm font-medium text-white/40">3 Active Streams Engaged</div>
              </div>
            </div>

            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <MusicPlayer />
            </motion.div>

            {/* Sidebar Stats */}
            <div className="rounded-3xl bg-white/5 p-6 border border-white/10 backdrop-blur-sm">
               <h3 className="text-xs font-bold uppercase tracking-widest text-white/20 mb-4">Neural Activity</h3>
               <div className="space-y-4">
                  <div className="flex justify-between items-end">
                     <span className="text-sm text-white/60">Global High Score</span>
                     <span className="text-lg font-bold text-cyan-400">12,480</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                     <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "75%" }}
                        className="h-full bg-white/20"
                     />
                  </div>
                  <div className="flex justify-between items-end">
                     <span className="text-sm text-white/60">Players Online</span>
                     <span className="text-lg font-bold text-pink-400">1,204</span>
                  </div>
               </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer Meta */}
      <footer className="relative z-10 border-t border-white/5 bg-black/40 px-6 py-8 backdrop-blur-md mt-20">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 opacity-20">
            <div className="h-1 w-12 bg-white" />
            <div className="h-1 w-1 bg-white" />
            <div className="h-1 w-1 bg-white" />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20">
            Encrypted Interface v4.0.2 // (C) 2026 NEONPULSE LABS
          </p>
          <div className="flex items-center gap-4">
             <div className="h-2 w-2 rounded-full bg-cyan-500 shadow-[0_0_8px_#06b6d4]" />
             <div className="h-2 w-2 rounded-full bg-white/10" />
             <div className="h-2 w-2 rounded-full bg-white/10" />
          </div>
        </div>
      </footer>
    </div>
  );
}

