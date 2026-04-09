import React from 'react';
import { Obstacle as ObstacleType } from '../types/game.types';

interface ObstacleProps {
  obstacle: ObstacleType;
  imageSrc: string;
}

export const Obstacle: React.FC<ObstacleProps> = ({ obstacle, imageSrc }) => {
  return (
    <img
      data-obstacle-id={obstacle.id}
      src={imageSrc}
      alt="Obstacle"
      className="obstacle"
      style={{
        left: `${obstacle.x}px`,
        top: `${obstacle.y}px`,
        width: `${obstacle.width}px`,
        height: `${obstacle.height}px`,
      }}
    />
  );
};