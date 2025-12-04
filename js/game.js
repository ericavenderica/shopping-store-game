
 class Game {
    constructor() {
      this.startScreen = document.getElementById("game-intro");
      this.gameScreen = document.getElementById("game-screen");
      this.endScreen = document.getElementById("game-end");
      this.scoreDisplay = document.getElementById("score");
      this.player = new Player(this.gameScreen, 300, 450, 140, 130);
      this.items = [];
      this.obstacles = [];
      this.score = 0;
      this.gameIsOver = false;
      this.gameIntervalId = null;
      this.spawnIntervalId = null;
    }

    start() {
      this.startScreen.style.display = "none";
      this.endScreen.style.display = "none";
      this.gameScreen.style.display = "block";



      this.items.forEach(item => item.remove());
      this.obstacles.forEach(obs => obs.remove());
      this.items = [];
      this.score = 0;
      this.gameIsOver = false;
      this.updateScore();

      // start game loop
     this.gameIntervalId = setInterval(() => this.update(), 1000 / 60);

    // spawn items
    this.spawnIntervalId = setInterval(() => this.spawnItem(), 1000);

    // spawn grenade
     this.obstacleIntervalId = setInterval(() => this.spawnObstacle(), 2000);
  }

  spawnItem() {
    if (!this.gameIsOver) {
      this.items.push(new FallingItem(this.gameScreen));
    }
  }
  
  spawnObstacle() {
    if (!this.gameIsOver) this.obstacles.push(new Obstacle(this.gameScreen)); // NEW
  }


update() {
    if (this.gameIsOver) 
      return;

    this.player.move();

    this.items.forEach((item, index) => {
      item.move();

      // a collision will  be detected
      if (this.player.didCollide(item)) {
        this.score += 5;
        this.updateScore();
        item.remove();
        this.items.splice(index, 1);
      }

      // item will go below screen
      if (item.top > this.gameScreen.clientHeight) {
        item.remove();
        this.items.splice(index, 1);
      }
    });
  


  // grenade aka bad item
      this.obstacles.forEach((obstacle, index) => {
      obstacle.move();

      if (this.player.didCollide(obstacle)) {
        this.gameOver();
      }

      if (obstacle.top > this.gameScreen.clientHeight) {
        obstacle.element.remove();
        this.obstacles.splice(index, 1);
      }
    });
  }


  updateScore() {
    this.scoreDisplay.innerText = this.score;
  }

  gameOver() {
    this.gameIsOver = true;
    clearInterval(this.gameIntervalId);
    clearInterval(this.spawnIntervalId);
    clearInterval(this.obstacleIntervalId);

    this.gameScreen.style.display = "none";
    this.endScreen.style.display = "block";
  }
 }