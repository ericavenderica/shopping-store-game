import React from 'react';
import { Player as PlayerType } from '../types/game.types';

interface PlayerProps {
  player: PlayerType;
}

export const Player: React.FC<PlayerProps> = ({ player }) => {
  const rotation = player.direction * 10;

  return (
    <div
      data-player
      className="player"
      style={{
        left: `${player.x}px`,
        top: `${player.y}px`,
        width: `${player.width}px`,
        height: `${player.height}px`,
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <img
        src="/images/basket.png"
        alt="Player Basket"
        className="player-image"
      />
      
      <div className="player-name-tag">
        {player.name}
      </div>
    </div>
  );
};