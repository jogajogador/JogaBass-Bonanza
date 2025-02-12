const symbols = ["🐟", "🐠", "🎣", "💰", "⚓"]; // Símbolos do jogo
const reels = document.querySelectorAll(".reel");
const spinButton = document.getElementById("spin-button");
const resultado = document.getElementById("resultado");

spinButton.addEventListener("click", () => {
    resultado.textContent = ""; // Limpa o resultado anterior
    spinReels();
});

function spinReels() {
    let spins = 0;
    const spinInterval = setInterval(() => {
        reels.forEach(reel => {
            const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
            reel.textContent = randomSymbol;
        });
        spins++;
        if (spins >= 10) { // Número de giros antes de parar
            clearInterval(spinInterval);
            checkResult();
        }
    }, 100); // Velocidade do giro
}

function checkResult() {
    const reelValues = Array.from(reels).map(reel => reel.textContent);
    if (reelValues[0] === reelValues[1] && reelValues[1] === reelValues[2]) {
        resultado.textContent = "Você ganhou! 🎉";
    } else {
        resultado.textContent = "Tente novamente! 😢";
    }
}
