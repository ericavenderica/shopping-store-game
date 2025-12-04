class Player {
    constructor(gameScreen, left, top, width, height) {
      this.gameScreen = gameScreen;
      this.left = left;
      this.top = top;
      this.width = width;
      this.height = height;
      this.directionX = 0;

      this.element = document.createElement("img");
      this.element.src = "images/basket.png";
      this.element.style.position = "absolute";
      this.element.style.height = `${this.height}px`;
      this.element.style.width = `${this.width}px`;
      this.element.style.top = `${this.top}px`;
      this.element.style.left = `${this.left}px`;
      this.gameScreen.appendChild(this.element);
    }

    move() {
      this.left += this.directionX;

      // to keep inside screen
      if (this.left < 0) this.left = 0;
      if (this.left + this.width > this.gameScreen.clientWidth) {
        this.left = this.gameScreen.clientWidth - this.width;
      }

    this.updatePosition();
  }

    updatePosition() {
      this.element.style.left = `${this.left}px`;
      this.element.style.top = `${this.top}px`;
    }

    didCollide(item) {
      const playerRect = this.element.getBoundingClientRect();
      const itemRect = item.element.getBoundingClientRect();

      return (
        playerRect.left < itemRect.right &&
        playerRect.right > itemRect.left &&
        playerRect.top < itemRect.bottom &&
        playerRect.bottom > itemRect.top
      );
    }
  }
