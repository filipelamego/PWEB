const sql = require('mssql/msnodesqlv8');

module.exports = function () {
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

