window.onload = function () {
  let myGame;

  const startButton = document.getElementById("start-btn");
  const restartButton = document.getElementById("restart-btn");
  startButton.addEventListener("click", function () {
        startGame();
    });
   restartButton.addEventListener("click", () => {
    window.location.reload();
  });

    // these are the keyboard event listeners
    window.addEventListener("keydown", (event) => {
        console.log("a key was pressed", event);
        if (event.code === "ArrowLeft") {
            myGame.player.directionX = -5;
        }
         if (event.code === "ArrowRight") {
            myGame.player.directionX = 5;
        }
    });

    window.addEventListener("keyup", (event) => {
        console.log("a key was pressed", event);
        if (event.code === "ArrowLeft") {
            myGame.player.directionX = 0;
        }
         if (event.code === "ArrowRight") {
            myGame.player.directionX = 0;
        }
    });

    function startGame() {
        console.log("start-game");
        myGame = new Game();
        myGame.start()
    }
}; 

