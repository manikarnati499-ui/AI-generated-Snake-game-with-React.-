/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Square, RefreshCcw, Trophy } from 'lucide-react';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }, { x: 11, y: 10 }, { x: 12, y: 10 }];
const INITIAL_DIRECTION = { x: -1, y: 0 };
const MOVE_INTERVAL = 150;

export default function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [highScore, setHighScore] = useState(0);

  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
  const lastDirectionRef = useRef(direction);

  const generateFood = useCallback(() => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      // Check if food is on snake
      // eslint-disable-next-line no-loop-func
      if (!snake.some(segment => segment.x === newFood.x && segment.y === newFood.y)) {
        break;
      }
    }
    return newFood;
  }, [snake]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    lastDirectionRef.current = INITIAL_DIRECTION;
    setFood(generateFood());
    setScore(0);
    setGameOver(false);
    setIsPaused(true);
  };

  const moveSnake = useCallback(() => {
    if (gameOver || isPaused) return;

    setSnake(prevSnake => {
      const head = prevSnake[0];
      const newHead = {
        x: (head.x + direction.x + GRID_SIZE) % GRID_SIZE,
        y: (head.y + direction.y + GRID_SIZE) % GRID_SIZE,
      };

      // Check collision with self
      if (prevSnake.some((segment, index) => index !== 0 && segment.x === newHead.x && segment.y === newHead.y)) {
        setGameOver(true);
        if (score > highScore) setHighScore(score);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Check food
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(s => s + 1);
        setFood(generateFood());
      } else {
        newSnake.pop();
      }

      lastDirectionRef.current = direction;
      return newSnake;
    });
  }, [direction, food, gameOver, isPaused, generateFood, score, highScore]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (lastDirectionRef.current.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (lastDirectionRef.current.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (lastDirectionRef.current.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (lastDirectionRef.current.x === 0) setDirection({ x: 1, y: 0 });
          break;
        case ' ':
          setIsPaused(p => !p);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (!gameOver && !isPaused) {
      gameLoopRef.current = setInterval(moveSnake, MOVE_INTERVAL);
    } else if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
    }
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [gameOver, isPaused, moveSnake]);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="mb-6 flex w-full max-w-md items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-400" />
          <span className="text-xl font-bold text-white">Score: {score}</span>
        </div>
        <div className="text-sm font-medium text-white/50">High Score: {highScore}</div>
      </div>

      <div 
        id="game-board"
        className="relative aspect-square w-full max-w-md overflow-hidden rounded-xl border-4 border-cyan-500/30 bg-black shadow-[0_0_30px_rgba(6,182,212,0.2)]"
      >
        {/* Grid Background */}
        <div className="absolute inset-0 grid grid-cols-20 grid-rows-20 opacity-10">
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => (
            <div key={i} className="border-[0.5px] border-cyan-500/20" />
          ))}
        </div>

        {/* Food */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute h-[5%] w-[5%] rounded-full bg-pink-500 shadow-[0_0_10px_#ec4899]"
          style={{
            left: `${(food.x / GRID_SIZE) * 100}%`,
            top: `${(food.y / GRID_SIZE) * 100}%`,
          }}
        />

        {/* Snake */}
        {snake.map((segment, i) => (
          <div
            key={i}
            className={`absolute h-[5%] w-[5%] ${
              i === 0 
                ? 'z-10 bg-green-400 shadow-[0_0_15px_#4ade80]' 
                : 'bg-green-500/80 shadow-[0_0_5px_#22c55e]'
            } transition-all duration-150`}
            style={{
              left: `${(segment.x / GRID_SIZE) * 100}%`,
              top: `${(segment.y / GRID_SIZE) * 100}%`,
              borderRadius: i === 0 ? '4px' : '2px',
            }}
          />
        ))}

        {/* Overlays */}
        <AnimatePresence>
          {(isPaused && !gameOver) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm"
            >
              <button
                onClick={() => setIsPaused(false)}
                className="group flex h-20 w-20 items-center justify-center rounded-full bg-cyan-500 shadow-[0_0_20px_#06b6d4] transition-all hover:scale-110 active:scale-95"
              >
                <Play className="h-10 w-10 fill-white text-white transition-transform group-hover:scale-110" />
              </button>
              <p className="mt-4 text-sm font-semibold tracking-widest text-cyan-400 uppercase">Press Space to Start</p>
            </motion.div>
          )}

          {gameOver && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md"
            >
              <h2 className="text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500">GAME OVER</h2>
              <p className="mt-2 text-white/70">Final Score: {score}</p>
              <button
                onClick={resetGame}
                className="mt-8 flex items-center gap-2 rounded-full border-2 border-white/20 bg-white/5 px-6 py-2 text-white transition-all hover:bg-white/10"
              >
                <RefreshCcw className="h-4 w-4" />
                Play Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 text-white/40 md:flex">
        <div className="flex items-center gap-2 bg-white/5 rounded-lg px-4 py-2 border border-white/10">
          <kbd className="bg-white/10 px-2 py-1 rounded border border-white/20 text-xs">Arrows</kbd>
          <span className="text-xs">to Move</span>
        </div>
        <div className="flex items-center gap-2 bg-white/5 rounded-lg px-4 py-2 border border-white/10">
          <kbd className="bg-white/10 px-2 py-1 rounded border border-white/20 text-xs">Space</kbd>
          <span className="text-xs">to Pause</span>
        </div>
      </div>
    </div>
  );
}
