const sql = require('mssql/msnodesqlv8');

var connSQLServer = function () {
    const sqlConfig = {
        user: 'sa',
        password: '132969',
        database: 'master',
        server: 'LAMEGO\\SQLEXPRESS',
        driver: 'msnodesqlv8',
        options: {
            encrypt: false,
            trustServerCertificate: true
        }
    }
    return sql.connect(sqlConfig);
}

module.exports = function() {
    console.log('O autoload carregou o módulo de conexão com o bd');
    return connSQLServer;
}

