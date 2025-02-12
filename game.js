import Phaser from "phaser";

class BigBassClone extends Phaser.Scene {
  constructor() {
    super("BigBassClone");
  }

  preload() {
    // Carregar imagens
    this.load.image("background", "assets/background.png");
    this.load.image("spinButton", "assets/spinButton.png");
    
    // Carregar símbolos
    this.symbols = ["symbol1", "symbol2", "symbol3", "symbol4", "symbol5"];
    this.symbols.forEach((symbol, index) => {
      this.load.image(symbol, `assets/${symbol}.png`);
    });

    // Carregar áudio
    this.load.audio("spinSound", "assets/spin.mp3");
    this.load.audio("winSound", "assets/win.mp3");
  }

  create() {
    // Adiciona o fundo
    this.add.image(400, 300, "background").setScale(1.2);

    // Configurar os rolos
    this.reels = [];
    for (let i = 0; i < 5; i++) {
      let reel = this.add.container(100 + i * 150, 200);
      let symbols = [];
      for (let j = 0; j < 3; j++) {
        let symbol = this.add.image(0, j * 100, this.getRandomSymbol());
        symbols.push(symbol);
        reel.add(symbol);
      }
      this.reels.push({ reel, symbols });
    }

    // Botão de girar
    this.spinButton = this.add.image(400, 500, "spinButton").setInteractive();
    this.spinButton.on("pointerdown", this.spinReels, this);

    // Sons
    this.spinSound = this.sound.add("spinSound");
    this.winSound = this.sound.add("winSound");
  }

  getRandomSymbol() {
    return this.symbols[Phaser.Math.Between(0, this.symbols.length - 1)];
  }

  spinReels() {
    this.spinSound.play();
    this.reels.forEach(({ symbols }) => {
      symbols.forEach((symbol, index) => {
        this.tweens.add({
          targets: symbol,
          y: symbol.y + 300,
          duration: 600,
          ease: "Cubic.easeInOut",
          yoyo: false,
          onComplete: () => {
            symbol.y = (index - 1) * 100;
            symbol.setTexture(this.getRandomSymbol());
          },
        });
      });
    });
    setTimeout(() => this.checkWin(), 700);
  }

  checkWin() {
    // Simples verificação de combinação para teste
    let firstSymbol = this.reels[0].symbols[1].texture.key;
    if (this.reels.every(({ symbols }) => symbols[1].texture.key === firstSymbol)) {
      this.winSound.play();
      console.log("Ganhou!");
    }
  }
}

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: BigBassClone,
};

const game = new Phaser.Game(config);
