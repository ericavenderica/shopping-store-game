class Obstacle {
  constructor(gameScreen) {
    
      this.gameScreen = gameScreen;
      this.width = 80;
      this.height = 80;
      this.top = -this.height;
      this.left = Math.floor(Math.random() * (this.gameScreen.clientWidth - this.width));
      this.element = document.createElement("img");
      this.element.src = "images/grenade.png";
      this.element.style.position = "absolute";
      this.element.style.width = `${this.width}px`;
      this.element.style.height = `${this.height}px`;
      this.element.style.left = `${this.left}px`;
      this.element.style.top = `${this.top}px`;
      this.gameScreen.appendChild(this.element);
    }

    move() {
      this.top += 4;
      this.updatePosition();
    }

    updatePosition() {
      this.element.style.top = `${this.top}px`;
    }

    remove() {
      this.element.remove();
    }
  }
