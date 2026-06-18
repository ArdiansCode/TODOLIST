/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Task, Pet, ShopItem, LogEntry, PetSpecies, PetStatus } from './types';
import { PetSection } from './components/PetSection';
import { TodoSection } from './components/TodoSection';
import { PomodoroSection, playRetroSound } from './components/PomodoroSection';
import { StatsSection } from './components/StatsSection';
import { NameSetupSection } from './components/NameSetupSection';
import { ShieldCheck, Info, RefreshCw, Sparkles, Volume2, Gamepad2, Award, Sun, Moon } from 'lucide-react';

// Predefined shop items matching the Indonesian 8-bit translation
const DEFAULT_SHOP_ITEMS: ShopItem[] = [
  { id: 'apple', name: 'Apel Piksel 🍎', price: 15, icon: '🍎', description: 'Memulihkan Rasa Lapar (+15)', rewardHunger: 15, rewardHappiness: 5 },
  { id: 'meat', name: 'Daging Panggang 🍖', price: 35, icon: '🍖', description: 'Memulihkan Lapar (+35), Bahagia (+10)', rewardHunger: 35, rewardHappiness: 10 },
  { id: 'gem', name: 'Kristal Energi 💎', price: 65, icon: '💎', description: 'Memulihkan Lapar (+15), Bahagia (+45)', rewardHunger: 15, rewardHappiness: 45 },
  { id: 'gameboy', name: 'Gameboy Piksel 🎮', price: 30, icon: '🎮', description: 'Meningkatkan Kebahagiaan (+25)', rewardHunger: -5, rewardHappiness: 25 },
  { id: 'potion', name: 'Ramuan Hidup 🧪', price: 100, icon: '🧪', description: 'Menghidupkan Kembali Pet Mati', rewardHunger: 50, rewardHappiness: 50 },
];

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('retro_tasks');
    if (saved) return JSON.parse(saved);
    return [];
  });
  const [coins, setCoins] = useState<number>(() => {
    const saved = localStorage.getItem('retro_coins');
    return saved ? Number(saved) : 50;
  });
  const [pet, setPet] = useState<Pet>(() => {
    const saved = localStorage.getItem('retro_pet');
    if (saved) {
      const parsedPet = JSON.parse(saved);
      const elapsedMs = Date.now() - Number(parsedPet.lastUpdate);
      const elapsedHours = elapsedMs / (1000 * 60 * 60);

      if (elapsedHours > 0.5 && parsedPet.status !== 'dead') {
        const hungerDepletion = Math.floor(elapsedHours * 4);
        const happinessDepletion = Math.floor(elapsedHours * 3);

        const nextHunger = Math.max(0, parsedPet.hunger - hungerDepletion);
        const nextHappiness = Math.max(0, parsedPet.happiness - happinessDepletion);
        const nextStatus = (nextHunger <= 0 || nextHappiness <= 0) ? 'dead' : parsedPet.status;

        return {
          ...parsedPet,
          hunger: nextHunger,
          happiness: nextHappiness,
          status: nextStatus,
          lastUpdate: String(Date.now()),
        };
      }
      return parsedPet;
    }
    return {
      name: 'Piko',
      species: 'slime',
      level: 1,
      exp: 0,
      maxExp: 100,
      hunger: 80,
      happiness: 85,
      status: 'idle',
      lastUpdate: String(Date.now()),
    };
  });
  const [logs, setLogs] = useState<LogEntry[]>(() => {
    const saved = localStorage.getItem('retro_logs');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'starter_1',
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        message: 'Permainan Dimulai! Selamat Datang Pahlawan Produktivitas!',
        type: 'system',
      }
    ];
  });
  const [contributions, setContributions] = useState<{ [date: string]: number }>(() => {
    const saved = localStorage.getItem('retro_contributions_v2');
    if (saved) return JSON.parse(saved);
    return {};
  });
  const [currentTime, setCurrentTime] = useState<string>('');
  const [playerName, setPlayerName] = useState<string>(() => {
    return localStorage.getItem('retro_player_name') || '';
  });
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('retro_theme_is_dark');
    return saved !== 'false';
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
    localStorage.setItem('retro_theme_is_dark', String(isDark));
  }, [isDark]);

  // 1. Initial State Loading from LocalStorage on mount
  useEffect(() => {
    // Current Local Clock
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 2. State Auto-Persistence to local storage when state changes
  useEffect(() => {
    localStorage.setItem('retro_player_name', playerName);
  }, [playerName]);

  useEffect(() => {
    localStorage.setItem('retro_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('retro_coins', String(coins));
  }, [coins]);

  useEffect(() => {
    localStorage.setItem('retro_pet', JSON.stringify(pet));
  }, [pet]);

  useEffect(() => {
    localStorage.setItem('retro_logs', JSON.stringify(logs));
  }, [logs]);

  useEffect(() => {
    localStorage.setItem('retro_contributions_v2', JSON.stringify(contributions));
  }, [contributions]);

  // Helper log generator
  const addLog = (message: string, type: 'task' | 'shop' | 'system' | 'pet') => {
    const timestamp = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    setLogs((prev) => [
      { id: String(Date.now() + Math.random()), timestamp, message, type },
      ...prev.slice(0, 49), // Max 50 logger lines saved
    ]);
  };

  // Helper local date string generator: YYYY-MM-DD
  const getTodayDateStr = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // 3. TASK LOGIC ACTIONS
  const handleAddTask = (title: string, difficulty: 'easy' | 'medium' | 'hard') => {
    let xpReward = 15;
    let coinReward = 10;

    if (difficulty === 'medium') {
      xpReward = 30;
      coinReward = 20;
    } else if (difficulty === 'hard') {
      xpReward = 60;
      coinReward = 45;
    }

    const newTask: Task = {
      id: String(Date.now()),
      title,
      difficulty,
      completed: false,
      xpReward,
      coinReward,
      createdAt: new Date().toISOString(),
    };

    setTasks((prev) => [newTask, ...prev]);
    addLog(`Quest Baru Ditambahkan: ${title} (${difficulty.toUpperCase()}) 📜`, 'task');
    playRetroSound('click');
  };

  const handleToggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const wasCompleted = t.completed;
          const nextCompleted = !wasCompleted;

          if (nextCompleted) {
            // Earn coins and EXP
            setCoins((c) => c + t.coinReward);
            playRetroSound('coin');
            addLog(`Quest Terpaut Selesai! +${t.coinReward}G & +${t.xpReward}XP 🎉`, 'task');
            
            // Add to daily contribution heatmap record
            const today = getTodayDateStr();
            setContributions((prevContrib) => ({
              ...prevContrib,
              [today]: (prevContrib[today] || 0) + 1,
            }));

            // Earn EXP on active pet
            handleEarnExp(t.xpReward);
          } else {
            // Deduct coins (cannot go below 0)
            setCoins((c) => Math.max(0, c - t.coinReward));
            addLog(`Tugas dibatalkan: ${t.title}. -${t.coinReward}G ❌`, 'task');
          }

          return {
            ...t,
            completed: nextCompleted,
            completedAt: nextCompleted ? new Date().toISOString() : undefined,
          };
        }
        return t;
      })
    );
  };

  const handleDeleteTask = (taskId: string) => {
    const target = tasks.find((t) => t.id === taskId);
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    if (target) {
      addLog(`Quest dieliminasi: ${target.title} 🗑️`, 'task');
    }
    playRetroSound('click');
  };

  // 4. LEVEL UP & EXP ALGORITHM
  const handleEarnExp = (amount: number) => {
    setPet((currentPet) => {
      if (currentPet.status === 'dead') return currentPet;

      let nextExp = currentPet.exp + amount;
      let nextLevel = currentPet.level;
      let nextMax = currentPet.maxExp;
      let leveledUp = false;

      while (nextExp >= nextMax) {
        nextExp -= nextMax;
        nextLevel += 1;
        nextMax = nextLevel * 100;
        leveledUp = true;
      }

      if (leveledUp) {
        // Restore values as reward
        const nextHunger = Math.min(100, currentPet.hunger + 25);
        const nextHappiness = Math.min(100, currentPet.happiness + 25);
        
        // Trigger high quality audio fanfare safely delayed
        setTimeout(() => playRetroSound('levelUp'), 100);

        // System broadcast info
        addLog(`🎉 SELAMAT! ${currentPet.name} naik ke Level ${nextLevel}! Status pulih! 🎉`, 'system');

        return {
          ...currentPet,
          level: nextLevel,
          exp: nextExp,
          maxExp: nextMax,
          hunger: nextHunger,
          happiness: nextHappiness,
          status: 'playing',
          lastUpdate: String(Date.now()),
        };
      }

      return {
        ...currentPet,
        exp: nextExp,
        lastUpdate: String(Date.now()),
      };
    });
  };

  // 5. TOKO & ITEM MANAGEMENT
  const handleBuyItem = (item: ShopItem) => {
    if (coins < item.price) {
      addLog(`Dana tidak mencukupi untuk membeli ${item.name}! ❌`, 'system');
      return;
    }

    setCoins((c) => c - item.price);
    playRetroSound('coin');

    if (item.id === 'potion') {
      if (pet.status !== 'dead') {
        // Potion bought for a living pet: give huge stat boost
        setPet((p) => ({
          ...p,
          hunger: Math.min(100, p.hunger + item.rewardHunger),
          happiness: Math.min(100, p.happiness + item.rewardHappiness),
          status: 'eating',
          lastUpdate: String(Date.now()),
        }));
        addLog(`Membeli ${item.name} seharga ${item.price}G! Stamina pet melonjak!`, 'shop');
      } else {
        // Revival action!
        setPet((p) => ({
          ...p,
          status: 'idle',
          hunger: 50,
          happiness: 50,
          lastUpdate: String(Date.now()),
        }));
        addLog(`🧪 RAMUAN HIDUP DIGUNAKAN! ${pet.name} bangkit kembali dari dunia bawah! ✨`, 'pet');
      }
    } else {
      // Standard item boost
      setPet((p) => {
        const nextHunger = Math.min(100, Math.max(0, p.hunger + item.rewardHunger));
        const nextHappiness = Math.min(100, p.happiness + item.rewardHappiness);
        return {
          ...p,
          hunger: nextHunger,
          happiness: nextHappiness,
          status: 'eating',
          lastUpdate: String(Date.now()),
        };
      });
      addLog(`Piko memakan ${item.name}! Lapar +${item.rewardHunger}, Bahagia +${item.rewardHappiness}! 🍗`, 'shop');
    }

    // Return to idle state after eating animation finish
    setTimeout(() => {
      setPet((p) => (p.status === 'eating' ? { ...p, status: 'idle' } : p));
    }, 3000);
  };

  // 6. PET SPECIES SELECTOR & INTERACTION ACTS
  const handleSelectSpecies = (sp: PetSpecies) => {
    if (pet.status === 'dead') return;
    setPet((p) => ({
      ...p,
      species: sp,
      lastUpdate: String(Date.now()),
    }));
    addLog(`Spesies pet berhasil berevolusi menjadi ${sp.toUpperCase()}! 🧬`, 'pet');
    playRetroSound('levelUp');
  };

  const handleRenamePet = (newName: string) => {
    setPet((p) => ({
      ...p,
      name: newName,
      lastUpdate: String(Date.now()),
    }));
    addLog(`Ubah Nama Pet: "${newName}" 🏷️`, 'pet');
    playRetroSound('click');
  };

  const handleInteract = (action: 'feed' | 'play' | 'revive' | 'sleep' | 'wake') => {
    if (pet.status === 'dead' && action !== 'revive') return;

    if (action === 'play') {
      setPet((p) => ({
        ...p,
        happiness: Math.min(100, p.happiness + 15),
        status: 'playing',
        lastUpdate: String(Date.now()),
      }));
      addLog(`Bermain petualangan mini bersama ${pet.name}! Bahagia +15! 🎮`, 'pet');
      playRetroSound('click');

      setTimeout(() => {
        setPet((p) => (p.status === 'playing' ? { ...p, status: 'idle' } : p));
      }, 3000);
    } else if (action === 'sleep') {
      setPet((p) => ({
        ...p,
        status: 'sleeping',
        lastUpdate: String(Date.now()),
      }));
      addLog(`${pet.name} tertidur pulas... Energi pulih perlahan. 💤`, 'pet');
      playRetroSound('click');
    } else if (action === 'wake') {
      setPet((p) => ({
        ...p,
        status: 'idle',
        lastUpdate: String(Date.now()),
      }));
      addLog(`${pet.name} telah bangun dari istirahat! Bersiap latihan! ☀️`, 'pet');
      playRetroSound('click');
    } else if (action === 'revive') {
      if (coins >= 100) {
        setCoins((c) => c - 100);
        setPet((p) => ({
          ...p,
          status: 'idle',
          hunger: 50,
          happiness: 50,
          lastUpdate: String(Date.now()),
        }));
        addLog(`🧪 BANGKIT! ${pet.name} hidup kembali dengan ramuan ajaib!`, 'pet');
        playRetroSound('levelUp');
      } else {
        addLog("Koin emas tidak mencukupi untuk ritual kebangkitan! ❌", "system");
      }
    }
  };

  const handleSetupComplete = (heroName: string, initialPet: Pet) => {
    setPlayerName(heroName);
    setPet(initialPet);
    
    // Seed new game start log message
    const timestamp = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    setLogs((prev) => [
      {
        id: String(Date.now()),
        timestamp,
        message: `⚔️ Selamat Datang, Pahlawan ${heroName}! Petualangan RPG dimulai bersama ${initialPet.name} sang ${initialPet.species.toUpperCase()}!`,
        type: 'system',
      },
      ...prev
    ]);
  };

  // Cheat code or reset developer option to default standard safely
  const handleResetApp = () => {
    if (confirm("Reset ulang permainan? Seluruh koin, level pet, dan quest harian akan dihapus!")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  if (!playerName) {
    return (
      <div className={`min-h-screen ${isDark ? 'dark bg-retro-bg' : 'bg-retro-bg'} p-4 text-retro-text font-sans selection:bg-yellow-400 selection:text-black flex items-center justify-center transition-colors duration-200`}>
        <NameSetupSection onComplete={handleSetupComplete} />
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDark ? 'dark bg-retro-bg' : 'bg-retro-bg'} p-4 text-retro-text font-sans selection:bg-yellow-400 selection:text-black transition-colors duration-200`}>
      {/* GLOBAL RETRO HEADER */}
      <header className="max-w-7xl mx-auto mb-8 bg-retro-panel border-4 border-retro-border p-4 flex flex-col sm:flex-row justify-between items-center gap-4 relative shadow-[8px_8px_0px_var(--retro-border)] text-retro-text">
        
        {/* Left Brand Title */}
        <div className="flex items-center gap-3">
          <div>
            <h1 className="font-press-start text-sm tracking-tight md:text-lg text-[#ffeb3b]">
              TODOLIST RPG
            </h1>
            <span className="font-vt323 text-lg text-retro-muted tracking-wider">
              website produktivitas
            </span>
            {playerName && (
              <div className="mt-2 flex items-center gap-2">
                <span className="inline-block animate-pulse text-yellow-400">⚔️</span>
                <span className="font-press-start text-[9px] md:text-[10px] text-green-400">
                  Selamat Datang, <span className="text-[#ffeb3b]">{playerName}</span>!
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right Info Box */}
        <div className="flex items-center gap-4">
          {/* Theme Mode Toggle Button */}
          <button
            onClick={() => {
              setIsDark(!isDark);
              playRetroSound('click');
            }}
            className="bg-retro-sub border-2 border-retro-border py-1.5 px-3 hover:bg-retro-panel transition-all active:translate-x-0.5 active:translate-y-0.5 shadow-[2px_2px_0px_var(--retro-border)] flex items-center gap-2 cursor-pointer text-retro-text"
          >
            {isDark ? (
              <>
                <Sun className="w-4 h-4 text-yellow-400" />
                <span className="font-press-start text-[8px] tracking-tight">MOD LIGHT</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-indigo-500" />
                <span className="font-press-start text-[8px] tracking-tight">MOD DARK</span>
              </>
            )}
          </button>

          <div className="bg-retro-inner border-2 border-retro-border py-1.5 px-4 block text-center min-w-[120px] text-retro-text">
            <span className="font-press-start text-[9px] text-[#4caf50] block mb-1">JAM DUNIA</span>
            <span className="font-mono text-xs tracking-widest">{currentTime || '--:--:--'}</span>
          </div>
        </div>

      </header>

      {/* CORE 3-COLUMN ADVENTURE DASHBOARD */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* COLUMN 1: VIRTUAL PET & SHOP CORNER */}
        <section className="lg:col-span-1 drop-shadow-md">
          <PetSection
            pet={pet}
            coins={coins}
            onBuyItem={handleBuyItem}
            onRenamePet={handleRenamePet}
            onSelectSpecies={handleSelectSpecies}
            onInteract={handleInteract}
            shopItems={DEFAULT_SHOP_ITEMS}
          />
        </section>

        {/* COLUMN 2: ADVENTURE TODO QUEST LOG */}
        <section className="lg:col-span-1 drop-shadow-md">
          <TodoSection
            tasks={tasks}
            onAddTask={handleAddTask}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
          />
        </section>

        {/* COLUMN 3: ARCADE POMODORO TIMER */}
        <section className="lg:col-span-1 drop-shadow-md">
          <PomodoroSection
            onEarnCoins={(amount) => {
              setCoins((c) => c + amount);
              // Plus 1 to daily contributions
              const today = getTodayDateStr();
              setContributions((prevContrib) => ({
                ...prevContrib,
                [today]: (prevContrib[today] || 0) + 1,
              }));
            }}
            onEarnExp={handleEarnExp}
            onLog={addLog}
          />
        </section>

      </main>

      {/* BOTTOM ROW: HEATMAP & WORLD GAME LOGS */}
      <section className="max-w-7xl mx-auto mb-10 drop-shadow-md">
        <StatsSection logs={logs} contributions={contributions} />
      </section>

      {/* FOOTER AUTHOR CREDITS */}
      <footer className="text-center py-6 border-t-4 border-retro-sub text-retro-muted font-vt323 text-lg max-w-7xl mx-auto">
        <p>© 2026 Ardiansyah. TODOLIST.</p>
      </footer>
    </div>
  );
}
