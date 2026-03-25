import React, { useRef, useEffect } from 'react';
import { Player } from './Player';
import { FallingItem } from './FallingItem';
import { Obstacle } from './Obstacle';
import { UserRegistration } from './UserRegistration';
import { GameOver } from './GameOver';
import { LevelUpNotification } from './LevelUpNotification';
import { useGameLogic } from '../hooks/useGameLogic';

export const GameScreen: React.FC = () => {
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const {
    gameState,
    score,
    level,
    player,
    items,
    obstacles,
    setPlayerName,
    resetGame,
    handleKeyDown,
    handleKeyUp,
    itemImages,
    obstacleImages
  } = useGameLogic(gameAreaRef);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'ArrowLeft') {
        handleKeyDown(-1);
      } else if (event.code === 'ArrowRight') {
        handleKeyDown(1);
      }
    };

    const handleKeyRelease = (event: KeyboardEvent) => {
      if (event.code === 'ArrowLeft' || event.code === 'ArrowRight') {
        handleKeyUp();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('keyup', handleKeyRelease);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('keyup', handleKeyRelease);
    };
  }, [handleKeyDown, handleKeyUp]);

  // Dynamic background based on level
  const getBackgroundClass = () => {
    switch (level) {
      case 1: return 'bg-level-1';
      case 2: return 'bg-level-2';
      case 3: return 'bg-level-3';
      case 4: return 'bg-level-4';
      case 5: return 'bg-level-5';
      default: return 'bg-level-1';
    }
  };

  if (gameState === 'welcome') {
    return <UserRegistration onStart={setPlayerName} />;
  }

  if (gameState === 'gameOver') {
    return <GameOver score={score} onRestart={resetGame} />;
  }

  return (
    <div className={`game-container ${getBackgroundClass()}`}>
      {/* HUD - Heads Up Display */}
      <div className="hud">
        {/* Score & Level */}
        <div className="hud-panel slide-in-left">
          <div className="hud-score-container">
            <span className="hud-score">Score</span>
            <span className="hud-score-value">{score}</span>
          </div>
          <div className="hud-level">
            <span className="hud-score">Level</span>
            <span className="hud-level-value">{level}</span>
          </div>
        </div>

        {/* Player Info */}
        <div className="hud-panel slide-in-right player-info">
          <div className="player-avatar">
            {player.name.charAt(0).toUpperCase()}
          </div>
          <span className="player-name">{player.name}</span>
        </div>
      </div>

      {/* Game Area */}
      <div 
        ref={gameAreaRef}
        className="game-area-container"
      >
        {/* Background Pattern Overlay */}
        <div className="background-pattern"></div>

        {/* Player */}
        <Player player={player} />

        {/* Items */}
        {items.map(item => (
          <FallingItem
            key={item.id}
            item={item}
            imageSrc={itemImages[item.type]}
          />
        ))}

        {/* Obstacles */}
        {obstacles.map(obstacle => (
          <Obstacle
            key={obstacle.id}
            obstacle={obstacle}
            imageSrc={obstacleImages[obstacle.type]}
          />
        ))}
      </div>

      {/* Mobile Controls / Instructions */}
      <div className="mobile-controls">
        <div className="controls-pill">
          <p className="controls-text">
            <span><kbd className="key">←</kbd> Move Left</span>
            <span style={{ width: '1px', height: '16px', backgroundColor: 'rgba(255,255,255,0.3)' }}></span>
            <span><kbd className="key">→</kbd> Move Right</span>
          </p>
        </div>
      </div>
      
      {/* Level Up Notification */}
      <LevelUpNotification level={level} />
    </div>
  );
};