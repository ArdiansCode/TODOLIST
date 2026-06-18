import React from 'react';
import { LogEntry, DailyContribution } from '../types';
import { ShieldCheck, History, CalendarDays, Flame } from 'lucide-react';

interface StatsSectionProps {
  logs: LogEntry[];
  contributions: { [date: string]: number }; // YYYY-MM-DD -> count
}

export const StatsSection: React.FC<StatsSectionProps> = ({ logs, contributions }) => {
  // Get previous 14 days list to display as a small contribution grid
  const getPast14Days = () => {
    const list = [];
    const date = new Date();
    // Start from 13 days ago to today (14 days total)
    for (let i = 13; i >= 0; i--) {
      const d = new Date();
      d.setDate(date.getDate() - i);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const formatted = `${year}-${month}-${day}`;
      list.push({
        dateStr: formatted,
        dayLabel: d.toLocaleDateString('id-ID', { weekday: 'narrow' }),
        dateLabel: d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })
      });
    }
    return list;
  };

  const pastDays = getPast14Days();

  const getHeatmapColor = (count: number) => {
    if (!count || count === 0) return 'bg-[#222222] border-black';
    if (count === 1) return 'bg-[#1b5e20] border-[#388e3c]'; // Light green
    if (count === 2) return 'bg-[#2e7d32] border-[#4caf50]'; // Medium green
    return 'bg-[#4caf50] border-[#a5d6a7]'; // Deep neon green
  };

  // Streak calculation dynamic check
  const calculateStreak = () => {
    let streak = 0;
    const today = new Date();
    
    // YYYY-MM-DD formatter inside current locale
    const formatDate = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const todayStr = formatDate(today);
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const yesterdayStr = formatDate(yesterday);

    // If both today and yesterday have 0 count, streak is 0
    if ((contributions[todayStr] || 0) === 0 && (contributions[yesterdayStr] || 0) === 0) {
      return 0;
    }

    let checkDate = new Date();
    // If today is empty, but yesterday was active, count backward starting yesterday
    if ((contributions[todayStr] || 0) === 0 && (contributions[yesterdayStr] || 0) > 0) {
      checkDate.setDate(today.getDate() - 1);
    }

    while (true) {
      const formatted = formatDate(checkDate);
      if ((contributions[formatted] || 0) > 0) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  };

  const currentStreak = calculateStreak();

  // Streak badge title definition based on days count
  const getStreakTitleAndIcon = (days: number) => {
    if (days === 0) return { title: 'Belum Ada Runtutan', icon: '❄️', color: 'text-gray-400', desc: 'Selesaikan tugas harian/Pomodoro hari ini untuk memicunya!' };
    if (days <= 2) return { title: 'Pemula Bersemangat', icon: '😁', color: 'text-green-400', desc: 'Awal mulanya fokus! Pertahankan runtutanmu besok.' };
    if (days <= 5) return { title: 'Ksatria Fokus', icon: '⚔️', color: 'text-[#ffeb3b]', desc: 'Konsistensi tinggi! Kamu memiliki ritme kerja yang hebat.' };
    if (days <= 10) return { title: 'Dewa Konsistensi', icon: '🔥', color: 'text-orange-400', desc: 'Luar biasa! Energi produktivitasmu membakar rasa malas!' };
    return { title: 'Pahlawan Legendaris', icon: '👑', color: 'text-pink-400', desc: 'Legenda sejati! Tidak ada yang bisa menghentikan disiplinmu!' };
  };

  const streakInfo = getStreakTitleAndIcon(currentStreak);

  return (
    <div className="bg-retro-panel pixel-border p-4 text-retro-text">
      {/* SECTION WRAPPER ROW - MODIFIED TO 3 COLUMNS IN MD VIEWS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* HEATMAP / DAILY CONTRIBUTION */}
        <div className="bg-retro-sub border-4 border-retro-border p-3.5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <CalendarDays className="text-[#4caf50] w-5 h-5" />
              <span className="font-press-start text-[10px] tracking-tight uppercase">HEATMAP KONTRIBUSI</span>
            </div>
            <p className="font-vt323 text-xs text-retro-muted mb-3.5 block leading-tight">
              Selesaikan Quest untuk mewarnai baris kontribusi harianmu (14 hari terakhir)!
            </p>
          </div>

          <div className="flex flex-col gap-2">
            {/* Grid wrapper */}
            <div className="grid grid-cols-7 gap-1.5 bg-retro-inner p-2 border-2 border-retro-border">
              {pastDays.map((day) => {
                const count = contributions[day.dateStr] || 0;
                return (
                  <div
                    key={day.dateStr}
                    title={`${day.dateLabel}: ${count} Quest Selesai`}
                    className={`aspect-square flex flex-col items-center justify-center p-1 border cursor-help transition-all hover:scale-110 ${getHeatmapColor(
                      count
                    )}`}
                  >
                    <span className="font-press-start text-[7px] text-white select-none">
                      {count > 0 ? count : ''}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Colors description bar */}
            <div className="flex items-center justify-between text-[10px] font-vt323 text-retro-muted mt-1">
              <span>Kurang</span>
              <div className="flex gap-1 items-center">
                <div className="w-3.5 h-3.5 bg-[#222] border border-black"></div>
                <div className="w-3.5 h-3.5 bg-[#1b5e20] border border-black"></div>
                <div className="w-3.5 h-3.5 bg-[#2e7d32] border border-[#4caf50]"></div>
                <div className="w-3.5 h-3.5 bg-[#4caf50] border border-white"></div>
              </div>
              <span>Sangat Aktif</span>
            </div>
          </div>
        </div>

        {/* NEW COLUMN: DAILY STREAK ACCUMULATOR */}
        <div className="bg-retro-sub border-4 border-retro-border p-3.5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <Flame className="text-[#ff5722] w-5 h-5" />
              <span className="font-press-start text-[10px] tracking-tight uppercase">RUNTUTAN HARIAN</span>
            </div>
            <p className="font-vt323 text-xs text-retro-muted mb-2 leading-tight">
              Jumlah hari produktif berturut-turut tanpa terputus secara real-time:
            </p>
          </div>

          <div className="flex-grow flex flex-col items-center justify-center py-2 bg-retro-inner border-2 border-retro-border rounded-sm relative overflow-hidden">
            {/* Ambient fire glow background */}
            {currentStreak > 0 && (
              <div className="absolute inset-0 bg-gradient-to-t from-orange-600/10 to-transparent pointer-events-none animate-pulse"></div>
            )}
            
            <div className="relative flex items-center justify-center mb-1">
              <Flame className={`w-12 h-12 ${currentStreak > 0 ? 'text-orange-500 animate-bounce' : 'text-gray-600'}`} />
            </div>

            <div className="text-center z-10">
              <div className="font-press-start text-lg md:text-xl text-orange-400 tracking-wider">
                {currentStreak} HARI
              </div>
              <div className="mt-1 flex items-center justify-center gap-1">
                <span className="text-sm">{streakInfo.icon}</span>
                <span className={`font-press-start text-[8px] uppercase tracking-wide ${streakInfo.color}`}>
                  {streakInfo.title}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-2 text-center">
            <span className="font-vt323 text-xs text-center text-retro-muted italic block leading-relaxed px-1">
              "{streakInfo.desc}"
            </span>
          </div>
        </div>

        {/* QUEST EVENT ADVENTURE LOG */}
        <div className="bg-retro-sub border-4 border-retro-border p-3.5 flex flex-col justify-between min-h-[170px]">
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <History className="text-[#ffeb3b] w-5 h-5" />
              <span className="font-press-start text-[10px] tracking-tight uppercase">QUEST LOG</span>
            </div>
            <p className="font-vt323 text-xs text-retro-muted mb-2 leading-tight">
              Rekaman riwayat seluruh pencapaian penting dalam program latihan:
            </p>
          </div>

          <div className="bg-retro-inner border-2 border-retro-border p-2 flex-grow overflow-y-auto max-h-[110px] space-y-1 font-mono text-[11px] leading-relaxed">
            {logs.length === 0 ? (
              <p className="text-gray-600 text-center py-4 italic font-vt323 text-sm">Belum ada catatan...</p>
            ) : (
              logs.map((log) => {
                let logColor = 'text-retro-muted';
                if (log.type === 'task') logColor = 'text-[#4caf50]';
                if (log.type === 'shop') logColor = 'text-[#ffeb3b]';
                if (log.type === 'pet') logColor = 'text-pink-400';
                if (log.type === 'system') logColor = 'text-cyan-400';

                return (
                  <div key={log.id} className="flex gap-1.5 items-start">
                    <span className="text-retro-muted text-[10px] font-press-start select-none opacity-60">
                      {log.timestamp}
                    </span>
                    <span className={`${logColor} font-vt323 text-sm`}>{log.message}</span>
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
