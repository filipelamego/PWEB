module.exports = function (app) {
    app.get('/informacao/cursos', function (req, res) {
        res.render("informacao/cursos");
        // res.end("<html><body>Cursos da Fatec Sorocaba</body></html>");
    });
}