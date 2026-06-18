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
    <div className="bg-[#3d3d3d] pixel-border p-5 text-white flex flex-col h-full justify-between">
      <div>
        {/* QUEST BOOK HEADER */}
        <div className="flex justify-between items-center bg-[#292929] border-4 border-black p-3 mb-4">
          <div className="flex items-center gap-2">
            <CheckSquare className="text-[#4caf50] w-6 h-6" />
            <span className="font-press-start text-xs tracking-tight">ACTIVE QUEST LOG</span>
          </div>
          <span className="font-press-start text-[10px] text-gray-400">
            [{tasks.filter(t => !t.completed).length} AKTIF]
          </span>
        </div>

        {/* INPUT QUEST FORM */}
        <form onSubmit={handleSubmit} className="mb-4 bg-[#252525] p-3 border-4 border-black flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Tulis quest baru di sini..."
              className="flex-1 bg-[#1a1a1a] border-2 border-black font-vt323 text-lg p-2 text-white placeholder-gray-500 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-[#4caf50] hover:bg-[#81c784] text-black border-2 border-black p-2 flex items-center justify-center font-press-start"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center justify-between gap-2">
            <span className="font-press-start text-[9px] text-gray-400">TINGKAT KESULITAN:</span>
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
                        ? `${activeStyle} border-black scale-105` 
                        : 'bg-[#1e1e1e] border-black text-gray-400 hover:text-white'
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
                    : 'bg-[#292929] text-gray-400 border-black hover:text-white'
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
            <div className="text-center py-10 border-4 border-dashed border-black bg-[#2e2e2e] p-4 text-gray-400">
              <ShieldAlert className="w-8 h-8 mx-auto mb-2 text-[#ffeb3b]" />
              <p className="font-press-start text-[10px] tracking-tight leading-loose uppercase">Quest list kosong!</p>
              <p className="font-vt323 text-sm mt-1">Tambahkan misi harian baru!</p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className={`flex gap-3 items-center justify-between p-3 border-2 border-black transition-all group ${
                  task.completed 
                    ? 'bg-[#292929]/70 border-[#222222] opacity-60' 
                    : 'bg-[#292929] hover:translate-x-1 hover:-translate-y-0.5 hover:shadow-[2px_2px_0px_#000]'
                }`}
              >
                {/* Completion Checkmark Toggle */}
                <button
                  type="button"
                  onClick={() => onToggleTask(task.id)}
                  className="text-[#ffeb3b] focus:outline-none flex-shrink-0 cursor-pointer"
                >
                  {task.completed ? (
                    <CheckSquare className="w-5 h-5 text-[#4caf50]" />
                  ) : (
                    <Square className="w-5 h-5 text-gray-400 hover:text-white" />
                  )}
                </button>

                {/* Quest Details Description */}
                <div className="flex-1 min-w-0 pr-2">
                  <span
                    className={`font-vt323 text-lg block leading-snug truncate ${
                      task.completed ? 'line-through text-gray-500' : 'text-white'
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
