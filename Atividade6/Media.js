nome = prompt("Informe o nome do aluno: ")

nota1 = prompt("Informe a primeira nota: ");
nota2 = prompt("Informe a segunda nota: ");
nota3 = prompt("Informe a terceira nota: ");

alert("A média das notas do aluno " + nome + " é: " + ((parseFloat(nota1) + parseFloat(nota2) + parseFloat(nota3)) / 3).toFixed(2));