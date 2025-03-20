const readlineSync = require("readline-sync");

class Avaliacao {
    static notaminima = 6; 

    constructor(matricula, presenca, nota1, nota2, substitutiva, cargaTotalAulas) {
        this.matricula = matricula;
        this.presenca = presenca;
        this.nota1 = nota1;
        this.nota2 = nota2;
        this.substitutiva = substitutiva;
        this.cargaTotalAulas = cargaTotalAulas;
        this.notaMinima = Avaliacao.notaminima; 
    }

    aprovadoPorFrequencia() {
        return this.presenca >= (3 / 4) * this.cargaTotalAulas;
    }

    calcularMedia() {
        let media = (this.nota1 + this.nota2) / 2;
        if (media < this.notaMinima) {
            if (this.nota1 > this.nota2) {
                media = (this.substitutiva + this.nota1) / 2;
            } else {
                media = (this.substitutiva + this.nota2) / 2;
            }
        }
        return media;
    }

    aprovadoPorNota() {
        return this.calcularMedia() >= this.notaMinima;
    }

    aprovado() {
        return this.aprovadoPorFrequencia() && this.aprovadoPorNota();
    }
}


function main() {
    let alunos = [];
    const quantidadeAlunos = 5;

    for (let i = 0; i < quantidadeAlunos; i++) {
        console.log(`\nAluno ${i + 1}`);
        const matricula = readlineSync.question("Digite a matricula do aluno: ");
        const presenca = parseInt(readlineSync.question("Digite a quantidade de aulas que o aluno esteve presente: "));
        const nota1 = parseFloat(readlineSync.question("Digite a nota 1 do aluno: "));
        const nota2 = parseFloat(readlineSync.question("Digite a nota 2 do aluno: "));
        const substitutiva = parseFloat(readlineSync.question("Digite a nota da substitutiva do aluno: "));
        const cargaTotalAulas = parseInt(readlineSync.question("Digite a carga total de aulas da disciplina: "));

        alunos.push(new Avaliacao(matricula, presenca, nota1, nota2, substitutiva, cargaTotalAulas));
    }

    console.log("\nResultados:");
    alunos.forEach((aluno, index) => {
        console.log(`\nAluno ${index + 1}`);
        console.log(`Média Final: ${aluno.calcularMedia().toFixed(2)}`);
        console.log(`Aprovado por frequência: ${aluno.aprovadoPorFrequencia() ? "Sim" : "Não"}`);
        console.log(`Aprovado por nota: ${aluno.aprovadoPorNota() ? "Sim" : "Não"}`);
        console.log(`Aprovado no curso: ${aluno.aprovado() ? "Sim" : "Não"}`);
    });
    
}

main();
