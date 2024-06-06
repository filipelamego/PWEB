module.exports = function(app) {
    app.get('/informacao/historia', function (req, res) {
        res.render("informacao/historia");
        //res.end("<html><body>Historia da Fatec Sorocaba</body></html>");
    });
}