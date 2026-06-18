import React, { useState } from 'react';
import { Task, Difficulty } from '../types';
import { Plus, Trash2, Calendar, ShieldAlert, CheckSquare, Square, Filter, ChevronRight } from 'lucide-react';

interface TodoSectionProps {
  tasks: Task[];
  onAddTask: (title: string, difficulty: Difficulty) => void;
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
}

export const TodoSection: React.FC<TodoSectionProps> = ({
  tasks,
  onAddTask,
  onToggleTask,
  onDeleteTask,
}) => {
  const [newTitle, setNewTitle] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTitle.trim()) {
      onAddTask(newTitle.trim(), difficulty);
      setNewTitle('');
    }
  };

  const getDifficultyColor = (diff: Difficulty) => {
    switch (diff) {
      case 'easy':
        return 'text-[#4caf50] border-[#4caf50] bg-emerald-950/30';
      case 'medium':
        return 'text-[#ffeb3b] border-[#ffeb3b] bg-yellow-950/30';
      case 'hard':
        return 'text-[#f44336] border-[#f44336] bg-red-950/30';
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div className="bg-retro-panel pixel-border p-5 text-retro-text flex flex-col h-full justify-between">
      <div>
        {/* QUEST BOOK HEADER */}
        <div className="flex justify-between items-center bg-retro-sub border-4 border-retro-border p-3 mb-4">
          <div className="flex items-center gap-2">
            <CheckSquare className="text-[#4caf50] w-6 h-6" />
            <span className="font-press-start text-xs tracking-tight">ACTIVE QUEST LOG</span>
          </div>
          <span className="font-press-start text-[10px] text-retro-muted">
            [{tasks.filter(t => !t.completed).length} AKTIF]
          </span>
        </div>

        {/* INPUT QUEST FORM */}
        <form onSubmit={handleSubmit} className="mb-4 bg-retro-inner p-3 border-4 border-retro-border flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Tulis quest baru di sini..."
              className="flex-1 bg-retro-inner border-2 border-retro-border font-vt323 text-lg p-2 text-retro-text placeholder-retro-muted/80 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-[#4caf50] hover:bg-[#81c784] text-black border-2 border-retro-border p-2 flex items-center justify-center font-press-start cursor-pointer"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center justify-between gap-2">
            <span className="font-press-start text-[9px] text-retro-muted">TINGKAT KESULITAN:</span>
            <div className="flex gap-1.5 flex-1 justify-end">
              {(['easy', 'medium', 'hard'] as Difficulty[]).map((diff) => {
                const isSelected = difficulty === diff;
                let activeStyle = '';
                if (diff === 'easy') activeStyle = 'bg-[#4caf55] text-black';
                if (diff === 'medium') activeStyle = 'bg-[#ffeb55] text-black';
                if (diff === 'hard') activeStyle = 'bg-[#f44355] text-white';

                return (
                  <button
                    key={diff}
                    type="button"
                    onClick={() => setDifficulty(diff)}
                    className={`font-press-start text-[9px] px-2 py-1 uppercase border-2 transition-transform cursor-pointer ${
                      isSelected 
                        ? `${activeStyle} border-retro-border scale-105` 
                        : 'bg-retro-inner border-retro-border text-retro-muted hover:text-retro-text'
                    }`}
                  >
                    {diff === 'easy' ? 'EASY' : diff === 'medium' ? 'MED' : 'HARD'}
                  </button>
                );
              })}
            </div>
          </div>
        </form>

        {/* FILTER TAB CONTROLS */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex gap-1">
            {(['all', 'active', 'completed'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setFilter(mode)}
                className={`font-press-start text-[9px] px-2.5 py-1 border-2 transition-all cursor-pointer ${
                  filter === mode
                    ? 'bg-[#b0bec5] text-black border-white'
                    : 'bg-retro-sub text-retro-muted border-retro-border hover:text-retro-text'
                }`}
              >
                {mode === 'all' ? 'SEMUA' : mode === 'active' ? 'AKTIF' : 'SELESAI'}
              </button>
            ))}
          </div>
        </div>

        {/* QUEST LIST VIEWPORT */}
        <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-10 border-4 border-dashed border-retro-border bg-retro-inner p-4 text-retro-muted">
              <ShieldAlert className="w-8 h-8 mx-auto mb-2 text-[#ffeb3b]" />
              <p className="font-press-start text-[10px] tracking-tight leading-loose uppercase">Quest list kosong!</p>
              <p className="font-vt323 text-sm mt-1">Tambahkan misi harian baru!</p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className={`flex gap-3 items-center justify-between p-3 border-2 border-retro-border transition-all group ${
                  task.completed 
                    ? 'bg-retro-sub/50 border-retro-muted/40 opacity-60' 
                    : 'bg-retro-sub hover:translate-x-1 hover:-translate-y-0.5 hover:shadow-[2px_2px_0px_var(--retro-border)]'
                }`}
              >
                {/* Completion Checkmark Toggle */}
                <button
                  type="button"
                  onClick={() => onToggleTask(task.id)}
                  className="text-[#ffeb3b] focus:outline-none flex-shrink-0 cursor-pointer animate-none"
                >
                  {task.completed ? (
                    <CheckSquare className="w-5 h-5 text-[#4caf50]" />
                  ) : (
                    <Square className="w-5 h-5 text-retro-muted hover:text-retro-text" />
                  )}
                </button>

                {/* Quest Details Description */}
                <div className="flex-1 min-w-0 pr-2">
                  <span
                    className={`font-vt323 text-lg block leading-snug truncate ${
                      task.completed ? 'line-through text-retro-muted' : 'text-retro-text'
                    }`}
                  >
                    {task.title}
                  </span>
                  
                  {/* Rewards tag info */}
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className={`font-press-start text-[8px] px-1 py-0.5 border ${getDifficultyColor(task.difficulty)}`}>
                      {task.difficulty.toUpperCase()}
                    </span>
                    {!task.completed && (
                      <span className="font-press-start text-[8px] text-[#ffeb3b]">
                        +{task.coinReward}G / +{task.xpReward}XP
                      </span>
                    )}
                  </div>
                </div>

                {/* Delete button option */}
                <button
                  onClick={() => onDeleteTask(task.id)}
                  className="opacity-40 group-hover:opacity-100 font-press-start text-xs text-red-500 hover:text-red-400 p-1 flex-shrink-0 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
