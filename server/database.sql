/* command untuk membuat database */
CREATE DATABASE gudang;
/* lalu kita berikan skema untuk valuenya */
CREATE TABLE barang(
	/* SERIAL PRIMARY KEY, untuk memberikan id yang
	unik dan dia akan auto increment */
	barang_id SERIAL PRIMARY KEY,
	/* VARCHAR tipe data*/
	barang VARCHAR(255),
	jumlah INT
)