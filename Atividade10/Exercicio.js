//Função que recebe três números e retorne o maior deles

function maior(num1, num2, num3) {
    var primeiroMaior
    primeiroMaior = ((num1 > num2) ? num1 : num2);

    if (num3 > primeiroMaior) {
        alert("O maior número é: " + num3)
    } else {
        alert("O maior número é: " + primeiroMaior)
    }
}

maior(20, 30, 10);

//Função que recebe três números e coloca em ordem crescente

function ordemCrescente(num1, num2, num3) {
    ordena = [num1, num2, num3];
    alert("Valores ordenados: " + ordena.sort(function (a, b) { return a - b }));
}

ordemCrescente(40, 100, 25);

//Palíndromo

function palindromo(frase) {
    frase = frase.replace(/[\W_]/g, '');

    var inverse = frase.split("").reverse().join('');

    if (frase.toUpperCase() === inverse.toUpperCase()) {
        alert("A frase: " + frase + " é um palíndromo: " + inverse);
    } else {
        alert("A frase: " + frase + " não é um palíndromo: " + inverse);
    }
}

palindromo("A base do teto desaba");

//Verificando se é triângulo e qual tipo é

function testaTriangulo(a, b, c) {
    if (Math.abs(b - c) < a && a < (b + c)) {
        if (Math.abs(a - c) < b && b < (a + c)) {
            if (Math.abs(a - b) < c && c < (a + b)) {

                if (a == b && b == c) {
                    resultado = 'EQUILÁTERO';
                }
                else {
                    if (a == b || a == c || c == b) {
                        resultado = 'ISÓSCELES';
                    }
                    else {
                        resultado = 'ESCALENO';
                    }
                }

                alert("É um triângulo " + resultado);

            }
        }
    } else {
        alert("Não é um triângulo.");
    }


}

testaTriangulo(5, 5, 5);




