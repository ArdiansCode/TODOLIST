export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Task {
  id: string;
  title: string;
  difficulty: Difficulty;
  completed: boolean;
  xpReward: number;
  coinReward: number;
  createdAt: string;
  completedAt?: string;
}

export type PetStatus = 'idle' | 'eating' | 'sleeping' | 'playing' | 'dead';
export type PetSpecies = 'dragon' | 'cat' | 'slime' | 'dog' | 'panda' | 'chicken';

export interface Pet {
  name: string;
  species: PetSpecies;
  level: number;
  exp: number;
  maxExp: number;
  hunger: number; // 0 - 100
  happiness: number; // 0 - 100
  status: PetStatus;
  lastUpdate: string; // timestamp
}

export interface ShopItem {
  id: string;
  name: string;
  price: number;
  icon: string;
  description: string;
  rewardHunger: number;
  rewardHappiness: number;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  message: string;
  type: 'task' | 'shop' | 'system' | 'pet';
}

export interface PomodoroState {
  timeLeft: number;
  mode: 'work' | 'break';
  isRunning: boolean;
  workDuration: number; // in mins
  breakDuration: number; // in mins
}

export interface DailyContribution {
  date: string; // YYYY-MM-DD
  count: number; // number of tasks completed or active mins
}
