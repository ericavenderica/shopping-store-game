import { useState, useEffect, useCallback, useRef } from 'react';
import { GameState, Player, FallingItem, Obstacle, GameConfig } from '../types/game.types';

const GAME_CONFIG: GameConfig = {
  playerSpeed: 7,
  baseItemSpeed: 4,
  baseObstacleSpeed: 5,
  baseSpawnRate: {
    items: 800,
    obstacles: 1500
  },
  pointsPerItem: 10,
  levelThresholds: [0, 100, 300, 600, 1000] // Points needed for level 1, 2, 3, 4, 5
};

const ITEM_IMAGES = {
  perfume: '/images/perfume.png',
  cap: '/images/cap.png',
  lipstick: '/images/lipstick.png',
  diamond: '/images/perfume.png' 
};

const OBSTACLE_IMAGES = {
  grenade: '/images/grenade.png',
  bomb: '/images/grenade.png' 
};

export const useGameLogic = (gameAreaRef: React.RefObject<HTMLDivElement>) => {
  const [gameState, setGameState] = useState<GameState>('welcome');
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [player, setPlayer] = useState<Player>({
    x: 300,
    y: 450,
    width: 140,
    height: 130,
    speed: GAME_CONFIG.playerSpeed,
    direction: 0,
    name: ''
  });
  const [items, setItems] = useState<FallingItem[]>([]);
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);

  const gameLoopRef = useRef<NodeJS.Timeout>();
  const itemSpawnRef = useRef<NodeJS.Timeout>();
  const obstacleSpawnRef = useRef<NodeJS.Timeout>();

  const generateId = () => Math.random().toString(36).substr(2, 9);

  // Level calculation based on score
  useEffect(() => {
    const newLevel = GAME_CONFIG.levelThresholds.findIndex(threshold => score < threshold);
    const calculatedLevel = newLevel === -1 ? GAME_CONFIG.levelThresholds.length : newLevel;
    
    if (calculatedLevel !== level && calculatedLevel > 0) {
      setLevel(calculatedLevel);
    }
  }, [score, level]);

  const checkCollision = useCallback((rect1: DOMRect, rect2: DOMRect) => {
    return (
      rect1.left < rect2.right &&
      rect1.right > rect2.left &&
      rect1.top < rect2.bottom &&
      rect1.bottom > rect2.top
    );
  }, []);

  const getLevelMultiplier = useCallback(() => {
    return 1 + (level - 1) * 0.2; // 20% harder each level
  }, [level]);

  const spawnItem = useCallback(() => {
    if (gameState !== 'playing' || !gameAreaRef.current) return;

    const types = Object.keys(ITEM_IMAGES) as Array<keyof typeof ITEM_IMAGES>;
    // Higher levels unlock new items (diamonds at level 3+)
    const availableTypes = level >= 3 ? types : types.filter(t => t !== 'diamond');
    const randomType = availableTypes[Math.floor(Math.random() * availableTypes.length)];
    
    const newItem: FallingItem = {
      id: generateId(),
      x: Math.random() * (gameAreaRef.current.clientWidth - 80),
      y: -80,
      width: 80,
      height: 80,
      speed: GAME_CONFIG.baseItemSpeed * getLevelMultiplier(),
      type: randomType,
      points: randomType === 'diamond' ? GAME_CONFIG.pointsPerItem * 2 : GAME_CONFIG.pointsPerItem
    };

    setItems(prev => [...prev, newItem]);
  }, [gameState, gameAreaRef, level, getLevelMultiplier]);

  const spawnObstacle = useCallback(() => {
    if (gameState !== 'playing' || !gameAreaRef.current) return;

    const newObstacle: Obstacle = {
      id: generateId(),
      x: Math.random() * (gameAreaRef.current.clientWidth - 80),
      y: -80,
      width: 80,
      height: 80,
      speed: GAME_CONFIG.baseObstacleSpeed * getLevelMultiplier(),
      type: level >= 2 && Math.random() > 0.5 ? 'bomb' : 'grenade'
    };

    setObstacles(prev => [...prev, newObstacle]);
  }, [gameState, gameAreaRef, level, getLevelMultiplier]);

  const updateGame = useCallback(() => {
    if (gameState !== 'playing') return;

    // Update player position
    setPlayer(prev => {
      const newX = prev.x + prev.direction * prev.speed;
      const maxX = gameAreaRef.current?.clientWidth || 800;
      return {
        ...prev,
        x: Math.max(0, Math.min(newX, maxX - prev.width))
      };
    });

    // Update items
    setItems(prev => {
      const updatedItems = prev
        .map(item => ({ ...item, y: item.y + item.speed }))
        .filter(item => item.y < (gameAreaRef.current?.clientHeight || 600));

      // Check collisions
      const playerRect = gameAreaRef.current?.querySelector('[data-player]')?.getBoundingClientRect();
      if (playerRect) {
        const collidedItems = updatedItems.filter(item => {
          const itemElement = gameAreaRef.current?.querySelector(`[data-item-id="${item.id}"]`);
          if (itemElement) {
            const itemRect = itemElement.getBoundingClientRect();
            return checkCollision(playerRect, itemRect);
          }
          return false;
        });

        if (collidedItems.length > 0) {
          const points = collidedItems.reduce((acc, item) => acc + item.points, 0);
          setScore(prevScore => prevScore + points);
          return updatedItems.filter(item => !collidedItems.includes(item));
        }
      }

      return updatedItems;
    });

    // Update obstacles
    setObstacles(prev => {
      const updatedObstacles = prev
        .map(obstacle => ({ ...obstacle, y: obstacle.y + obstacle.speed }))
        .filter(obstacle => obstacle.y < (gameAreaRef.current?.clientHeight || 600));

      // Check collisions with obstacles
      const playerRect = gameAreaRef.current?.querySelector('[data-player]')?.getBoundingClientRect();
      if (playerRect) {
        const collision = updatedObstacles.some(obstacle => {
          const obstacleElement = gameAreaRef.current?.querySelector(`[data-obstacle-id="${obstacle.id}"]`);
          if (obstacleElement) {
            const obstacleRect = obstacleElement.getBoundingClientRect();
            return checkCollision(playerRect, obstacleRect);
          }
          return false;
        });

        if (collision) {
          setGameState('gameOver');
          return updatedObstacles;
        }
      }

      return updatedObstacles;
    });
  }, [gameState, checkCollision, gameAreaRef]);

  const startGame = useCallback(() => {
    setGameState('playing');
    setScore(0);
    setLevel(1);
    setItems([]);
    setObstacles([]);
    setPlayer(prev => ({ ...prev, x: 300, direction: 0 }));
  }, []);

  const resetGame = useCallback(() => {
    setGameState('welcome'); // Go back to welcome to maybe change name? Or just 'playing' to restart directly. Let's do 'welcome' for now or 'playing'
    // Actually typically restart goes straight to playing
    setGameState('playing');
    setScore(0);
    setLevel(1);
    setItems([]);
    setObstacles([]);
    setPlayer(prev => ({ ...prev, x: 300, direction: 0 }));
  }, []);
  
  const setPlayerName = useCallback((name: string) => {
    setPlayer(prev => ({ ...prev, name }));
    setGameState('playing'); 
  }, []);

  // Game loop
  useEffect(() => {
    if (gameState === 'playing') {
      gameLoopRef.current = setInterval(updateGame, 1000 / 60);
      
      const spawnRateMultiplier = 1 / getLevelMultiplier(); // Spawn faster as level increases
      
      itemSpawnRef.current = setInterval(spawnItem, GAME_CONFIG.baseSpawnRate.items * spawnRateMultiplier);
      obstacleSpawnRef.current = setInterval(spawnObstacle, GAME_CONFIG.baseSpawnRate.obstacles * spawnRateMultiplier);
    }

    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
      if (itemSpawnRef.current) clearInterval(itemSpawnRef.current);
      if (obstacleSpawnRef.current) clearInterval(obstacleSpawnRef.current);
    };
  }, [gameState, updateGame, spawnItem, spawnObstacle, getLevelMultiplier]);

  const handleKeyDown = useCallback((direction: number) => {
    if (gameState === 'playing') {
      setPlayer(prev => ({ ...prev, direction }));
    }
  }, [gameState]);

  const handleKeyUp = useCallback(() => {
    if (gameState === 'playing') {
      setPlayer(prev => ({ ...prev, direction: 0 }));
    }
  }, [gameState]);

  return {
    gameState,
    score,
    level,
    player,
    items,
    obstacles,
    startGame,
    resetGame,
    setPlayerName,
    handleKeyDown,
    handleKeyUp,
    itemImages: ITEM_IMAGES,
    obstacleImages: OBSTACLE_IMAGES
  };
};