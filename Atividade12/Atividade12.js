//Função construtora retângulo - Exercício 1

//usando função construtora com parâmetro
function Retangulo(base, altura) {
    this.base = base;
    this.altura = altura;
    this.CalculaArea = function () {
        return (this.base * this.altura);
    }
}

Retangulo.base = prompt("Entre com o valor da base:");
Retangulo.altura = prompt("Entre com o valor da altura:");

var area = new Retangulo(Retangulo.base, Retangulo.altura);
alert("O Valor da área é: " + area.CalculaArea());

//Classe - Exercício 2

class Conta {
    constructor() {
        this._nomeCorrentista;
        this._banco;
        this._numConta;
        this._saldo;
    }
    setNome(value) {
        this._nomeCorrentista = value;
    }
    getNome() {
        return this._nomeCorrentista;
    }
    setBanco(value) {
        this._banco = value;
    }
    getBanco() {
        return this._banco;
    }
    setNumConta(value) {
        this._numConta = value;
    }
    getNumConta() {
        return this._numConta
    }
    setSaldo(value) {
        this._saldo = value;
    }
    getSaldo() {
        return this._saldo;
    }

}

//Heranças
class Corrente extends Conta {
    constructor() {
        super();
        this._saldoEspecial;
    }
    setSaldoEspecial(value) {
        this._saldoEspecial = value;
    }
    getSaldoEspecial() {
        return this._saldoEspecial;
    }
}

class Poupanca extends Conta {
    constructor () {
        super();
        this._juros;
        this._dataVcto;
    }
    setJuros(value) {
        this._juros = value;
    }
    getJuros() {
        return this._juros;
    }
    setVencimento(value) {
        this._dataVcto = value;
    }
    getVencimento() {
        return this._dataVcto;
    }
}

//variáveis para recebimento (Corrente)
var nomeCorrentista = prompt("Informe o nome do correntista:");
var bancoCorrentista = prompt("Informe o nome do banco:");
var nContaCorrentista = prompt("Informe o número da conta:");
var saldoCorrentista = prompt("Informe o saldo inicial:");
var saldoEspCorrentista = prompt("Informe o saldo especial:");

//recebendo dados via get e set
var objContaCorrente = new Corrente();
objContaCorrente.setNome(nomeCorrentista);
objContaCorrente.setBanco(bancoCorrentista);
objContaCorrente.setNumConta(nContaCorrentista);
objContaCorrente.setSaldo(saldoCorrentista);
objContaCorrente.setSaldoEspecial(saldoEspCorrentista);

alert(`Nome= ${objContaCorrente.getNome()}
       Banco= ${objContaCorrente.getBanco()} 
       Numero${objContaCorrente.getNumConta()}
       Saldo= ${objContaCorrente.getSaldo()} 
       Saldo Especial= ${objContaCorrente.getSaldoEspecial()}`);

//variáveis para recebimento (Poupança)
var nomePoupanca = prompt("Informe o nome do Poupancista:");
var bancoPoupanca = prompt("Informe o nome do banco:");
var nContaPoupanca = prompt("Informe o número da conta:");
var saldoPoupanca = prompt("Informe o saldo inicial:");
var jurosPoupanca = prompt("Informe a taxa de juros:");
var dataPoupanca = prompt("Informe a data de vencimento:");

var objContaPoupanca = new Poupanca();
objContaPoupanca.setNome(nomePoupanca);
objContaPoupanca.setBanco(bancoPoupanca);
objContaPoupanca.setNumConta(nContaPoupanca);
objContaPoupanca.setSaldo(saldoPoupanca);
objContaPoupanca.setJuros(jurosPoupanca);
objContaPoupanca.setVencimento(dataPoupanca);

alert(`Nome= ${objContaPoupanca.getNome()} 
       Banco= ${objContaPoupanca.getBanco()} 
       Numero= ${objContaPoupanca.getNumConta()}
       Saldo= ${objContaPoupanca.getSaldo()} 
       Juros= ${objContaPoupanca.getJuros()} 
       Vencimento= ${objContaPoupanca.getVencimento()}`);

