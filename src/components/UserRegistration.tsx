import React, { useState } from 'react';

interface UserRegistrationProps {
  onStart: (name: string) => void;
}

export const UserRegistration: React.FC<UserRegistrationProps> = ({ onStart }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onStart(name);
    }
  };

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

        <h1 className="main-heading">Welcome Shopper!</h1>
        <p className="sub-heading">Ready to catch some deals?</p>

        <form onSubmit={handleSubmit} className="input-form">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="text-input-field"
            required
            minLength={2}
            maxLength={15}
          />

          <button
            type="submit"
            className="action-button-primary"
          >
            Start Shopping
          </button>
        </form>

        <div className="instructions-container">
          <h3>How to Play</h3>
          <ul>
            <li>
              <span className="instruction-icon">🛍️</span>
              Collect items to earn points
            </li>
            <li>
              <span className="instruction-icon">💣</span>
              Avoid grenades and bombs!
            </li>
            <li>
              <span className="instruction-icon">🚀</span>
              Level up to unlock new items
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};