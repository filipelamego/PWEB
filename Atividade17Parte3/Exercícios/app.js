var app = require('./app/config/server');

/* poderia executar assim também*/
/*
var rotaAdicionarUsuario = require('./app/routes/adicionar_usuario')(app);
 
*/

app.listen(3000, function () {
    console.log("servidor iniciado");
});