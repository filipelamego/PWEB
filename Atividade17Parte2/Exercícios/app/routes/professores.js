var dbConnection = require('../config/dbConnection');

module.exports = function (app) {
    app.get('/informacao/professores', function (req, res) {

        async function getProfessores() {
            try {
                const pool = await dbConnection(); //executando a função
                const results = await pool.request().query('SELECT * FROM PROFESSORES');
                res.render('informacao/professores', { profs: results.recordset });
            } catch (err) {
                console.log(err);
            }
        }

        getProfessores();

    });
    //res.render("informacao/professores");
    //res.end("<html><body>Professores da Fatec Sorocaba</body></html>");
}