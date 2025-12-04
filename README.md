# Shopping Store Game
![Shopping Store Logo](images/logo.jpeg)


# Description

Shopping Store is a fast-paced browser game where you guide a shopping basket to collect falling items while avoiding thedangerous grenades.
Use the left and right arrow keys to move the basket, score points by catching accessories, and survive as long as possible!


# Main Functionalities

- It displays three main screens which are Start, Game, and Game Over.
- The Player basket moves left and right by using the arrow keys.
- It will fall collectible items (perfume, cap, lipstick).
- It will fall avoidable obstacles (grenades).
- The collision will be detected between the basket and  items/obstacles.
- The Score system increases when items are being collected.
- The Game ends immediately upon hitting a grenade.
- By clicking the restart game functionality, the game will start over.
- The smooth animations and consistent game loop.

# Backlog Functionalities

- Adding sound effects (item collected, explosion, game over).
- Multiplying the difficulty of the levels (increasing speed or spawn rate)
- Adding special items (bonus points, temporary shields, etc.).
- Adding a live system instead of instant game over.
- Additional item types and animated sprites.
- Adding a pause and resume functionality.


# Data Structure

## Game.js
- Properties:
  - startScreen, gameScreen, endScreen
  - scoreDisplay
  - player
  - items[]
  - obstacles[]
  - score
  - gameIsOver
  - gameIntervalId, spawnIntervalId, obstacleIntervalId

- Methods:
  - start()
  - spawnItem()
  - spawnObstacle()
  - update()
  - updateScore()
  - gameOver()


## Player.js
- Properties:
  - gameScreen, left, top, width, height
  - directionX
  - element (basket image)

- Methods:
  - move()
  - updatePosition()
  - didCollide(item)


## FallingItem.js
- Properties:
  - gameScreen
  - width, height
  - top, left
  - element

- Methods:
  - move()
  - updatePosition()
  - remove()


## Obstacle.js
- Properties:
  - gameScreen
  - width, height
  - top, left
  - element (grenade image)

- Methods:
  - move()
  - updatePosition()
  - remove()


# States & State Transitions

1. Start Screen (#game-intro)
- The user clicks Start Game;


2. Game Screen (#game-screen)
- Player collects items (score increases);
- Player hits grenade;


3. Game Over Screen (#game-end)
- User clicks Start New Game;



# Task 
1. Basic Setup
- Creating a HTML structure for screens;
- Adding CSS styling and background;

2. Player Mechanics
- Creating a Player class;
- Implementing a movement (keyboard events);
- Keeping a player inside boundaries;

3. Item & Obstacle Systems
- Creating a FallingItem class;
- Randomize images of a item;
- Creating a obstacle class (grenades);
- Implementing falling mechanics;

4. Game Core

- Implementing a Game class;
- Creating a game loop (update);
- Spawning items and obstacles using intervals;
- Detecting collisions;
- Updating score;

5. Game Flow
- Implementing Start and Game Over screens;
- Restarting logic;

6. Polishing
- Adding better animations;
- Improving the UI visuals;
- Testing the gameplay and fixing bugs;

7. Backlog
- Adding sounds;
- Adding difficulty levels;
- Adding a leaderboard;
- Adding power-ups;