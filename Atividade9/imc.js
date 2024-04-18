var peso = parseFloat(document.getElementById("peso").value);
var altura = parseFloat(document.getElementById("altura").value);
var imc = 0;
var classif = "";
const limparCampos = document.getElementById("limpar");

function calcularIMC() {
    imc = peso / (Math.pow(altura, 2));

    if (imc < 18.5) {
        classif = "MAGREZA";
    }
    else if (imc >= 18.5 && imc <= 24.9) {
        classif = "NORMAL";
    }
    else if (imc >= 25 && imc <= 29.9) {
        classif = "SOBREPESO";
    }
    else if (imc >= 30 && imc <= 39.9) {
        classif = "OBESIDADE"
    }
    else {
        classif = "OBESIDADE";
    }

    if (document.getElementById("peso").value == "" || document.getElementById("altura").value == "") {
        document.getElementById("classif").value = "Valor(es) invalido(s)!"
    }
    else {

        document.getElementById("resultado").value = parseFloat(imc.toFixed(2));
        document.getElementById("classif").value = classif;
    }
}

function limpar() {
    document.getElementById("peso").value = "";
    document.getElementById("altura").value = "";
    document.getElementById("resultado").value = "";
    document.getElementById("classif").value = "";

    limparCampos.addEventListener("click", function() {
        document.getElementById("peso").focus();
    });
}