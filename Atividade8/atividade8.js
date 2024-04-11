var idade = [], sexo = [], opiniao = [];

for (cont = 0; cont < 3; cont++) {
    idade[cont] = parseFloat(prompt("Informe sua idade: "));
    while (isNaN(idade[cont])) {
        idade[cont] = parseFloat(prompt("A idade deve ser um valor númerico, digite novamente:"));
    }
    sexo[cont] = prompt("Informe seu sexo: ");
    while (sexo[cont] !== "M" && sexo[cont] !== "F" && sexo[cont] !== "m" && sexo[cont] !== "f") {
        sexo[cont] = prompt("Sexo deve ser apenas M ou F, informe seu sexo:");
    }
    opiniao[cont] = parseFloat(prompt("Informe sua nota de 1 a 4 para o filme: "));
    while (opiniao[cont] < 1 || opiniao[cont] > 4) {
        opiniao[cont] = prompt("A nota deve estar entre 1 e 4, digite novamente:");
    }
}

//Calculando a média de idade

function mediaIdade() {
    var soma = 0;
    for (cont = 0; cont < idade.length; cont++) {
        soma = soma + idade[cont];
    }
    var media = soma / idade.length;
    return alert("A média das idades é: " + media.toFixed(2));
}

//Função maiorIdade

function maiorIdade() {
    var maior = 0;

    for (cont = 0; cont < idade.length; cont++) {
        if (idade[cont] > maior) {
            maior = idade[cont];
        }
    }
    return alert("A idade da pessoa mais velha a votar foi: " + maior + " anos.");
}

//Função menorIdade

function menorIdade() {
    var menor = 1000;

    for (cont = 0; cont < idade.length; cont++) {
        if (idade[cont] < menor) {
            menor = idade[cont];
        }
    }
    return alert("A idade da pessoa mais jovem a votar foi: " + menor + " anos.");
}

//Função contagem de opinião

function contaOpiniao() {
    var pessimos = 0;
    var otimoBom = 0;
    var outros = 0;
    var percent = 0;

    for (cont = 0; cont < opiniao.length; cont++) {
        if (parseInt(opiniao[cont]) === 1) {
            pessimos += 1;
        } else if (parseInt(opiniao[cont]) === 3 || parseInt(opiniao[cont]) === 4) {
            otimoBom += 1;
        }
        else {
            outros += 1;
        }
    }

    percent = (otimoBom / (pessimos + otimoBom + outros));

    return alert("O total de pessoas que votaram péssimo foi: " + pessimos + "\n"
        + "A porcentagem de pessoas que votaram ótimo ou bom foi de aproximadamente: "
        + percent.toLocaleString('pt-br', { style: 'percent', minimumFractionDigits: 1, maximumFractionDigits: 2 }));
}

//Função contagem M ou F;

function contaMF() {
    var masc = 0;
    var fem = 0;

    for (cont = 0; cont < sexo.length; cont++) {
        if (sexo[cont] === "m" || sexo[cont] === "M") {
            masc += 1;
        } else {
            fem += 1;
        }
    }

    return alert("Total de Homens que votaram: " + masc + "\n"
        + "Total de mulheres que votaram: " + fem);
}
