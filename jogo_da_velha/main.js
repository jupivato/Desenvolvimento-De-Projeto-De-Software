const prompt = require('prompt-sync')();

let tab = [];

for (let i = 0; i < 3; i++) {
    tab[i] = [];
    for (let j = 0; j < 3; j++) {
        tab[i][j] = ' ';
    }
}

function mostrarTabuleiro() {
    for (let i = 0; i < 3; i++) {
        console.log(`[${tab[i][0]}] [${tab[i][1]}] [${tab[i][2]}]`);
    }
}

let jogador = 'X';
let jogadas = 0;
let vencedor = false;

function verificarVitoria(jogador) {
    for (let i = 0; i < 3; i++) {
        if (tab[i][0] === jogador && tab[i][1] === jogador && tab[i][2] === jogador) return true;
        if (tab[0][i] === jogador && tab[1][i] === jogador && tab[2][i] === jogador) return true;
    }
    if (tab[0][0] === jogador && tab[1][1] === jogador && tab[2][2] === jogador) return true;
    if (tab[0][2] === jogador && tab[1][1] === jogador && tab[2][0] === jogador) return true;
    return false;
}

while (jogadas < 9 && !vencedor) {
    mostrarTabuleiro();
    console.log(`Jogador ${jogador}, faça sua jogada.`);
    let linha = parseInt(prompt("Informe a linha (0, 1 ou 2): "));
    let coluna = parseInt(prompt("Informe a coluna (0, 1 ou 2): "));

    if (linha < 0 || linha > 2 || coluna < 0 || coluna > 2) {
        console.log("Jogada inválida! Escolha números entre 0 e 2.");
        continue;
    }
    if (tab[linha][coluna] !== ' ') {
        console.log("Essa posição já está ocupada. Escolha outra.");
        continue;
    }

    tab[linha][coluna] = jogador;
    jogadas++;

    if (verificarVitoria(jogador)) {
        vencedor = true;
        mostrarTabuleiro();
        console.log(`Jogador ${jogador} venceu!`);
        break;
    }

    jogador = jogador === 'X' ? 'O' : 'X';
}

if (!vencedor) {
    mostrarTabuleiro();
    console.log("Empate! O jogo acabou sem vencedores.");
}
