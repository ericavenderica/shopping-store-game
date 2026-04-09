import React, { useEffect, useState } from 'react';

interface LevelUpNotificationProps {
  level: number;
}

export const LevelUpNotification: React.FC<LevelUpNotificationProps> = ({ level }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (level > 1) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [level]);

  if (!show) return null;

  return (
    <div className="level-up-container">
      <div className="level-up-card">
        <h2 className="level-up-title">
          Level Up!
        </h2>
        <p className="level-up-subtitle">
          Welcome to Level {level}
        </p>
      </div>
    </div>
  );
};