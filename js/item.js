class FallingItem {
  constructor(gameScreen) {
    this.gameScreen = gameScreen; 

    const itemImages = [
      "images/perfume.png",
      "images/cap.png",
      "images/lipstick.png"
    ];

    const randomImg = itemImages[Math.floor(Math.random() * itemImages.length)];

    this.width = 80;
    this.height = 80;
    this.top = -this.height;
    this.left = Math.floor(Math.random() * (this.gameScreen.clientWidth - this.width));

    this.element = document.createElement("img");
    this.element.src = randomImg;
    this.element.style.position = "absolute";
    
    //these sets the size of the items
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;

    //these sets the position of the items when game starts 
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;

    // visually adds to the page
    this.gameScreen.appendChild(this.element);

  }

  move() {
    this.top += 3.5;
    this.updatePosition();
  }

  updatePosition() {
    this.element.style.top = `${this.top}px`;
  }

  remove() {
    this.element.remove();
  }
}
