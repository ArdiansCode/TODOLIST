import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Flame, Sparkles, Volume2, VolumeX, Coffee, Laptop } from 'lucide-react';

interface PomodoroSectionProps {
  onEarnCoins: (amount: number) => void;
  onEarnExp: (amount: number) => void;
  onLog: (message: string, type: 'task' | 'shop' | 'system' | 'pet') => void;
}

// 8-bit Sound Chime Synthesizer using Web Audio API
const playRetroSound = (type: 'click' | 'coin' | 'buzz' | 'levelUp') => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    if (type === 'click') {
      // Light click beep
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } else if (type === 'coin') {
      // Classic RPG coin sound: high pitch transition
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(987.77, ctx.currentTime); // B5
      osc.frequency.setValueAtTime(1318.51, ctx.currentTime + 0.08); // E6
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } else if (type === 'buzz') {
      // Low synth alarm sound
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.5);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } else if (type === 'levelUp') {
      // Tri-stage RPG fanfare
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
      osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2); // G5
      osc.frequency.setValueAtTime(1046.50, ctx.currentTime + 0.3); // C6
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.6);
    }
  } catch (e) {
    console.warn('Web Audio gagal diputar:', e);
  }
};

export const PomodoroSection: React.FC<PomodoroSectionProps> = ({
  onEarnCoins,
  onEarnExp,
  onLog,
}) => {
  const [duration, setDuration] = useState(25); // Work duration preset
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<'work' | 'break'>('work');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [sessionStreak, setSessionStreak] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, mode, duration]);

  const handleTimerComplete = () => {
    setIsRunning(false);
    if (timerRef.current) clearInterval(timerRef.current);

    if (mode === 'work') {
      // Earn rewards for focus block completion!
      const coinEarned = duration; // 1 G per min of work
      const xpEarned = duration * 2; // 2 XP per min of work
      
      onEarnCoins(coinEarned);
      onEarnExp(xpEarned);
      setSessionStreak((s) => s + 1);
      
      if (soundEnabled) playRetroSound('coin');
      onLog(`Fokus ${duration} menit usai! Memperoleh +${coinEarned}G & +${xpEarned}XP! 🏆`, 'system');

      // Switch to break duration automatically
      setMode('break');
      setTimeLeft(5 * 60); // Default 5 mins break
    } else {
      // Break is complete
      if (soundEnabled) playRetroSound('levelUp');
      onLog(`Istirahat usai! Bersiaplah kembali untuk berfokus! 💻`, 'system');
      setMode('work');
      setTimeLeft(duration * 60);
    }
  };

  const handleToggleTimer = () => {
    if (soundEnabled) playRetroSound('click');
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    if (soundEnabled) playRetroSound('click');
    setIsRunning(false);
    setTimeLeft(mode === 'work' ? duration * 60 : 5 * 60);
  };

  const setPreset = (mins: number) => {
    if (soundEnabled) playRetroSound('click');
    setIsRunning(false);
    setDuration(mins);
    setMode('work');
    setTimeLeft(mins * 60);
  };

  const formatTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div className="bg-retro-panel pixel-border p-5 text-retro-text flex flex-col justify-between h-full">
      <div>
        {/* HEADER AREA */}
        <div className="flex justify-between items-center bg-retro-sub border-4 border-retro-border p-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="font-press-start text-xs tracking-tight">TIMER</span>
          </div>
          <button
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              playRetroSound('click');
            }}
            className="text-retro-muted hover:text-retro-text px-1 cursor-pointer"
          >
            {soundEnabled ? <Volume2 className="w-5 h-5 text-[#ffeb3b]" /> : <VolumeX className="w-5 h-5" />}
          </button>
        </div>

        {/* TIMER DIAL VIEW */}
        <div className="bg-retro-inner border-4 border-retro-border p-6 text-center mb-4 flex flex-col items-center justify-center relative shadow-[inset_0px_4px_0px_#000]">
          {/* Subtle neon glowing text shadow */}
          <span className="font-press-start text-3xl md:text-4xl text-[#ffeb3b] tracking-widest block font-bold">
            {formatTime(timeLeft)}
          </span>

          <div className="flex items-center gap-1.5 mt-3 justify-center">
            {mode === 'work' ? (
              <span className="font-press-start text-[9px] text-[#4caf50] flex items-center gap-1">
                <Laptop className="w-3 block h-3" /> FOKUS AKTIF
              </span>
            ) : (
              <span className="font-press-start text-[9px] text-sky-400 flex items-center gap-1">
                <Coffee className="w-3 block h-3" /> REHAT SANTAI
              </span>
            )}
          </div>
        </div>

        {/* WORK MIN PRESET CONFIGURATOR */}
        <div className="mb-4">
          <span className="font-press-start text-[9px] text-retro-muted block mb-2 uppercase">ATUR DURASI FOKUS (MENIT):</span>
          <div className="grid grid-cols-3 gap-2">
            {[10, 25, 50].map((mins) => (
              <button
                key={mins}
                onClick={() => setPreset(mins)}
                className={`font-press-start text-[10px] py-1.5 border-4 transition-all uppercase cursor-pointer ${
                  duration === mins && mode === 'work'
                    ? 'bg-[#e67e22] text-white border-white'
                    : 'bg-retro-sub text-retro-muted border-retro-border hover:text-retro-text'
                }`}
              >
                {mins}m
              </button>
            ))}
          </div>
        </div>

        {/* SESSION LOG TRIVIA */}
        <div className="bg-retro-inner border-2 border-retro-border p-3 mb-4 rounded-none">
          <div className="flex justify-between items-center text-xs text-retro-muted font-vt323 leading-relaxed mb-1">
            <span>Streak Harian:</span>
            <span className="font-press-start text-[9px] text-orange-400">🔥 {sessionStreak} Blok</span>
          </div>
          <div className="flex justify-between items-center text-xs text-retro-muted font-vt323 leading-relaxed">
            <span>Perolehan Koin:</span>
            <span className="text-[#ffeb3b] text-[9px] font-press-start">+{duration} G / Sesi</span>
          </div>
        </div>
      </div>

      {/* FOOTER ACTIONS PLAYER */}
      <div className="flex gap-2">
        <button
          onClick={handleToggleTimer}
          className={`flex-1 font-press-start text-[10px] py-3 text-black border-4 border-retro-border shadow-[4px_4px_0px_var(--retro-border)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer ${
            isRunning 
              ? 'bg-[#ffeb3b] hover:bg-yellow-450' 
              : 'bg-[#4caf50] hover:bg-[#81c784]'
          }`}
          style={{ imageRendering: 'pixelated' }}
        >
          {isRunning ? '⏸ PAUSE' : '▶ START'}
        </button>

        <button
          onClick={handleReset}
          className="bg-red-500 hover:bg-red-400 font-press-start text-[10px] text-white p-3 border-4 border-retro-border shadow-[4px_4px_0px_var(--retro-border)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer"
        >
          <RotateCcw className="w-4.5 h-4.5" />
        </button>
      </div>
    </div>
  );
};
export { playRetroSound };
