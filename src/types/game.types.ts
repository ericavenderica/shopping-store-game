export interface Position {
  x: number;
  y: number;
}

export interface Dimensions {
  width: number;
  height: number;
}

export interface GameObject extends Position, Dimensions {
  id: string;
  speed: number;
  rotation?: number; // Added for visual flair
}

export interface FallingItem extends GameObject {
  type: 'perfume' | 'cap' | 'lipstick' | 'diamond'; // Added diamond for higher levels
  points: number;
}

export interface Obstacle extends GameObject {
  type: 'grenade' | 'bomb'; // Added bomb variation
}

export interface Player extends Position, Dimensions {
  speed: number;
  direction: number;
  name: string; // Added user name
}

export type GameState = 'welcome' | 'playing' | 'paused' | 'gameOver' | 'levelUp';

export interface GameConfig {
  playerSpeed: number;
  baseItemSpeed: number;
  baseObstacleSpeed: number;
  baseSpawnRate: {
    items: number;
    obstacles: number;
  };
  pointsPerItem: number;
  levelThresholds: number[]; // Points needed to reach next level
}

export interface LevelConfig {
  level: number;
  itemSpeedMultiplier: number;
  obstacleSpeedMultiplier: number;
  spawnRateMultiplier: number;
  requiredScore: number;
  backgroundColor: string; // Dynamic background per level
}
