const Pool = require('pg').Pool;
// mengkoneksikan server ke database
const pool = new Pool({
	user: 'postgres',
	password: 'devikinal90',
	host: 'localhost',
	port: 5432,
	database: 'gudang',
});

module.exports = pool;
