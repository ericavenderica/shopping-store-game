import React from 'react';
import { FallingItem as FallingItemType } from '../types/game.types';

interface FallingItemProps {
  item: FallingItemType;
  imageSrc: string;
}

export const FallingItem: React.FC<FallingItemProps> = ({ item, imageSrc }) => {
  return (
    <img
      data-item-id={item.id}
      src={imageSrc}
      alt={item.type}
      className="falling-item"
      style={{
        left: `${item.x}px`,
        top: `${item.y}px`,
        width: `${item.width}px`,
        height: `${item.height}px`,
      }}
    />
  );
};