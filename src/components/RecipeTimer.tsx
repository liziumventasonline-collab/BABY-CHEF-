/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Timer, Volume2 } from "lucide-react";

interface RecipeTimerProps {
  defaultMinutes?: number;
}

export default function RecipeTimer({ defaultMinutes = 5 }: RecipeTimerProps) {
  const [minutes, setMinutes] = useState(defaultMinutes);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(100);
  
  const totalSeconds = useRef(defaultMinutes * 60);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    totalSeconds.current = minutes * 60 + seconds;
  }, [minutes, seconds]);

  const startTimer = () => {
    if (isRunning) return;
    setIsRunning(true);

    const initialTotal = totalSeconds.current;

    intervalRef.current = setInterval(() => {
      totalSeconds.current -= 1;

      if (totalSeconds.current <= 0) {
        clearInterval(intervalRef.current!);
        setIsRunning(false);
        setMinutes(0);
        setSeconds(0);
        setProgress(0);
        playBeep();
        return;
      }

      const m = Math.floor(totalSeconds.current / 60);
      const s = totalSeconds.current % 60;
      setMinutes(m);
      setSeconds(s);

      const targetTotal = defaultMinutes * 60;
      const calculatedProgress = (totalSeconds.current / targetTotal) * 100;
      setProgress(calculatedProgress);
    }, 1000);
  };

  const pauseTimer = () => {
    if (!isRunning) return;
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setMinutes(defaultMinutes);
    setSeconds(0);
    setProgress(100);
    totalSeconds.current = defaultMinutes * 60;
  };

  const playBeep = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5 note
      gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);

      oscillator.start();
      setTimeout(() => {
        oscillator.stop();
        audioCtx.close();
      }, 800);
    } catch (e) {
      console.warn("Could not play audio beep:", e);
    }
  };

  const adjustMinutes = (amount: number) => {
    if (isRunning) return;
    const newMin = Math.max(1, minutes + amount);
    setMinutes(newMin);
    setSeconds(0);
    setProgress(100);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="bg-pink-50/40 dark:bg-slate-800/40 p-4 rounded-xl border border-pink-100/50 flex flex-col items-center justify-center space-y-4">
      <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200 font-semibold text-xs">
        <Timer className="w-4 h-4 text-pink-400 animate-pulse" />
        <span>Temporizador de Cocina Integrado</span>
      </div>

      <div className="relative w-36 h-36 flex items-center justify-center">
        {/* Progress Circle SVG */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="72"
            cy="72"
            r="60"
            className="stroke-slate-100 dark:stroke-slate-700 fill-transparent"
            strokeWidth="6"
          />
          <circle
            cx="72"
            cy="72"
            r="60"
            className="stroke-pink-400 fill-transparent transition-all duration-1000 ease-linear"
            strokeWidth="6"
            strokeDasharray={2 * Math.PI * 60}
            strokeDashoffset={2 * Math.PI * 60 * (1 - progress / 100)}
            strokeLinecap="round"
          />
        </svg>

        {/* Timer numbers */}
        <div className="absolute text-center">
          <div className="text-xl font-bold font-mono text-slate-800 dark:text-white">
            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </div>
          <div className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">
            {isRunning ? "Cocinando" : "Pausado"}
          </div>
        </div>
      </div>

      {/* Manual controls if not running */}
      {!isRunning && (
        <div className="flex gap-2">
          <button
            onClick={() => adjustMinutes(-1)}
            className="px-2 py-0.5 bg-white dark:bg-slate-700 text-[10px] border border-slate-200 dark:border-slate-600 hover:bg-slate-100 rounded-md text-slate-600 dark:text-slate-300 font-semibold transition-all"
            disabled={minutes <= 1}
          >
            -1 min
          </button>
          <button
            onClick={() => adjustMinutes(1)}
            className="px-2 py-0.5 bg-white dark:bg-slate-700 text-[10px] border border-slate-200 dark:border-slate-600 hover:bg-slate-100 rounded-md text-slate-600 dark:text-slate-300 font-semibold transition-all"
          >
            +1 min
          </button>
        </div>
      )}

      {/* Main Actions */}
      <div className="flex gap-4">
        {isRunning ? (
          <button
            onClick={pauseTimer}
            className="p-3 bg-amber-400 hover:bg-amber-500 text-white rounded-full transition-transform active:scale-95 shadow-md flex items-center justify-center"
            title="Pausar"
          >
            <Pause className="w-4 h-4 fill-white" />
          </button>
        ) : (
          <button
            onClick={startTimer}
            className="p-3 bg-pink-400 hover:bg-pink-500 text-white rounded-full transition-transform active:scale-95 shadow-md flex items-center justify-center"
            title="Iniciar"
          >
            <Play className="w-4 h-4 fill-white ml-0.5" />
          </button>
        )}

        <button
          onClick={resetTimer}
          className="p-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:bg-slate-100 text-slate-600 dark:text-slate-300 rounded-full transition-transform active:scale-95 shadow-xs flex items-center justify-center"
          title="Reiniciar"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          onClick={playBeep}
          className="p-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-500 dark:text-slate-400 rounded-full transition-transform active:scale-95 flex items-center justify-center"
          title="Probar Alerta"
        >
          <Volume2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
