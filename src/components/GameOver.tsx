import React from 'react';

interface GameOverProps {
  score: number;
  onRestart: () => void;
}

export const GameOver: React.FC<GameOverProps> = ({ score, onRestart }) => {
  return (
    <div className="full-screen-container">
       <div className="floating-background-shape shape-purple float-animation"></div>
       <div className="floating-background-shape shape-pink float-animation delay-2s"></div>
       <div className="floating-background-shape shape-yellow float-animation delay-4s"></div>

      <div className="content-card slide-in-left">
        <img 
          src="/images/cropped_circle_image.png" 
          alt="Game Logo" 
          className="game-logo-image"
          style={{ display: 'block', margin: '0 auto 2rem auto' }}
        />
        
        <h1 className="main-heading">Game Over!</h1>
        <p className="sub-heading">Better luck next time!</p>
        
        <div className="final-score-container">
          <p className="final-score-label">Final Score</p>
          <p className="final-score-number">{score}</p>
        </div>
        
        <button
          onClick={onRestart}
          className="action-button-primary"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};