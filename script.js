class Game {
  levelsToWin = 10; // changes number of levels to win
  pcOrder = [];
  userOrder = [];
  flash;
  userTurn;
  pcTurn;
  isGood;
  interval;
  hasSound = true;
  hasInteracted = false;
  hasWon;

  constructor(obj) {
    this.counter = document.querySelector(obj.counter);
    this.angles = document.querySelectorAll(obj.angles);
    this.start = document.querySelector(obj.start);
    this.intro = document.querySelector(obj.intro);
    this.intro.innerHTML = `Pass ${this.levelsToWin} levels to win the Simon game`;
    this.start.addEventListener("click", () => {
      this.hasInteracted = true;
      clearInterval(this.interval);
      if (this.hasInteracted || this.hasWon) this.startGame();
    });
    this.angles.forEach((angle) => {
      angle.addEventListener("click", () => {
        if (this.hasInteracted) {
          if (angle.hasAttribute("green")) {
            this.userOrder.push(1);
            this.check();
            this.activateAngle(angle);
          } else if (angle.hasAttribute("red")) {
            this.userOrder.push(2);
            this.check();
            this.activateAngle(angle);
          } else if (angle.hasAttribute("yellow")) {
            this.userOrder.push(3);
            this.check();
            this.activateAngle(angle);
          } else if (angle.hasAttribute("blue")) {
            this.userOrder.push(4);
            this.check();
            this.activateAngle(angle);
          }
          if (!this.hasWon) {
            setTimeout(() => this.clearColors(), 300);
          }
        }
      });
    });
  }

  startGame() {
    this.hasWon = false;
    this.pcOrder = [];
    this.userOrder = [];
    this.flash = 0;
    this.interval = 0;
    this.userTurn = 1;
    this.counter.innerHTML = `Level: 1`;
    this.isGood = true;
    for (let i = 0; i < this.levelsToWin; i++) {
      this.pcOrder.push(Math.floor(Math.random() * 4) + 1);
    }
    this.pcTurn = true;
    this.interval = setInterval(() => this.continueGame(), 800);
  }

  continueGame() {
    this.hasInteracted = false;
    if (this.flash == this.userTurn) {
      clearInterval(this.interval);
      this.pcTurn = false;
      this.clearColors();
      this.hasInteracted = true;
    }
    if (this.pcTurn) {
      this.clearColors();
      setTimeout(() => {
        if (this.pcOrder[this.flash] == 1) this.activateAngle(this.angles[0]);
        if (this.pcOrder[this.flash] == 2) this.activateAngle(this.angles[1]);
        if (this.pcOrder[this.flash] == 3) this.activateAngle(this.angles[2]);
        if (this.pcOrder[this.flash] == 4) this.activateAngle(this.angles[3]);
        this.flash++;
      }, 200);
    }
  }

  activateAngle(angle) {
    if (this.hasSound) {
      if (angle.hasAttribute("green")) {
        const audio = document.querySelector("#audio1");
        audio.play();
        this.hasSound = true;
        angle.style.backgroundColor = "lightgreen";
      } else if (angle.hasAttribute("red")) {
        const audio = document.querySelector("#audio2");
        audio.play();
        this.hasSound = true;
        angle.style.backgroundColor = "tomato";
      } else if (angle.hasAttribute("yellow")) {
        const audio = document.querySelector("#audio3");
        audio.play();
        this.hasSound = true;
        angle.style.backgroundColor = "yellow";
      } else if (angle.hasAttribute("blue")) {
        const audio = document.querySelector("#audio4");
        audio.play();
        this.hasSound = true;
        angle.style.backgroundColor = "lightskyblue";
      }
    }
  }

  clearColors() {
    this.angles.forEach((angle) => {
      if (angle.hasAttribute("green")) {
        angle.style.backgroundColor = "darkgreen";
      } else if (angle.hasAttribute("red")) {
        angle.style.backgroundColor = "darkred";
      } else if (angle.hasAttribute("yellow")) {
        angle.style.backgroundColor = "goldenrod";
      } else if (angle.hasAttribute("blue")) {
        angle.style.backgroundColor = "darkblue";
      }
    });
  }

  flashColors() {
    this.angles.forEach((angle) => {
      if (angle.hasAttribute("green")) {
        angle.style.backgroundColor = "lightgreen";
      } else if (angle.hasAttribute("red")) {
        angle.style.backgroundColor = "tomato";
      } else if (angle.hasAttribute("yellow")) {
        angle.style.backgroundColor = "yellow";
      } else if (angle.hasAttribute("blue")) {
        angle.style.backgroundColor = "lightskyblue";
      }
    });
  }

  check() {
    if (
      this.userOrder[this.userOrder.length - 1] !==
      this.pcOrder[this.userOrder.length - 1]
    )
      this.isGood = false;
    if (this.userOrder.length == this.levelsToWin && this.isGood) {
      this.winGame();
    }
    if (!this.isGood) {
      this.flashColors();
      this.counter.innerHTML = "YOU LOSE!";
      setTimeout(() => {
        this.counter.innerHTML = `Level: ${this.userTurn}`;
        this.clearColors();
        this.startGame();
      }, 800);
      this.hasSound = false;
    }
    if (this.userTurn == this.userOrder.length && this.isGood && !this.hasWon) {
      this.userTurn++;
      this.userOrder = [];
      this.pcTurn = true;
      this.flash = 0;
      this.counter.innerHTML = `Level: ${this.userTurn}`;
      this.interval = setInterval(() => this.continueGame(), 800);
    }
  }

  winGame() {
    this.flashColors();
    this.counter.innerHTML = "YOU WIN!";
    this.hasInteracted = false;
    this.hasWon = true;
  }
}

const game = new Game({
  counter: ".info__text",
  angles: ".angle",
  start: ".info__btn",
  intro: ".intro",
});
