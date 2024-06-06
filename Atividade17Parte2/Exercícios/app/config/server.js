var express = require('express');

var app = express(); //executando o express

app.set('view engine', 'ejs');
app.set('views','./app/views'); //Diretório onde os arquivos estão localizados

module.exports = app;