const express = require('express');
const app = express();
// dengan pool kita bisa menggunakan query postgres
const pool = require('./db');

//middleware
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Methods',
		'OPTIONS, GET, POST, PUT, PATCH, DELETE'
	);
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Content-Type, Authorization'
	);
	if (req.method === 'OPTIONS') {
		return res.sendStatus(200);
	}
	next();
});
app.use(express.json());

//Routes
// buat barang
app.post('/barang', async (req, res, next) => {
	try {
		const { barang, jumlah } = req.body;
		// INSERT INTO, query untuk menambahkan data ke table
		// tanda ($1) adalah placeholder, dimana urutan kita untuk menambahkan data, lalu setelah itu kita bisa memasukkan data lewat array di argument kedua
		// RETURNING * , mengembalikan data yang sudah kita memasukkan ke table
		const newBarang = await pool.query(
			'INSERT INTO barang (barang,  jumlah) VALUES ($1,$2) RETURNING *',
			[barang, jumlah]
		);
		res.json(newBarang.rows[0]);
	} catch (err) {
		console.err(err.message);
	}
});
// ambil semua barang
app.get('/barang', async (req, res, next) => {
	try {
		const allBarang = await pool.query('SELECT * FROM barang');
		res.json(allBarang.rows);
	} catch (err) {
		console.err(err.message);
	}
});
// ambil barang
app.get('/barang/:id', async (req, res, next) => {
	try {
		const { id } = req.params;
		// WHERE , command untuk mendapatkan data spesifik tergantung kondisi tertentu setelah berikan placeholder. kita bisa memasukkan nilai leway array di argument kedua
		const barang = await pool.query(
			'SELECT * FROM barang WHERE barang_id = $1',
			[id]
		);
		res.json(barang.rows[0]);
	} catch (err) {
		console.err(err.message);
	}
});

// update barang
app.put('/barang/:id', async (req, res, next) => {
	try {
		const { id } = req.params;
		const { barang, jumlah } = req.body;
		const updateBarang = await pool.query(
			'UPDATE barang SET barang = $1, jumlah = $2 WHERE barang_id = $3',
			[barang, jumlah, id]
		);
		res.json('Barang sudah di update');
	} catch (err) {
		console.err(err.message);
	}
});
// hapus barang
app.delete('/barang/:id', (req, res, next) => {
	try {
		const { id } = req.params;
		const deletedBarang = pool.query(
			'DELETE FROM barang WHERE barang_id = $1',
			[id]
		);
		res.json('Barang sudah dihapus');
	} catch (err) {
		console.err(err.message);
	}
});

app.listen(4000, () => {
	console.log('Server listening on port 4000');
});
