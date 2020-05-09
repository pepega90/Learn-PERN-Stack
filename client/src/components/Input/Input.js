import React, { useState } from 'react';

const Input = props => {
	const [barang, setBarang] = useState({ barang: '', jumlah: '' });

	const changeHandler = e => {
		setBarang({ ...barang, [e.target.name]: e.target.value });
	};

	const sendSubmit = async e => {
		e.preventDefault();
		try {
			await fetch('http://localhost:4000/barang', {
				method: 'POST',
				body: JSON.stringify(barang),
				headers: {
					'content-type': 'application/json',
				},
			}).then(res => res.json());
			window.location = '/';
		} catch (err) {
			console.log(err.message);
		}
	};

	return (
		<React.Fragment>
			<h3 className="center-align">Gudang Barang</h3>
			<form onSubmit={sendSubmit}>
				<div className="input-field">
					<input
						onChange={changeHandler}
						className="validate"
						placeholder="Masukkan Barang..."
						type="text"
						name="barang"
					/>
				</div>
				<div className="input-field">
					<input
						onChange={changeHandler}
						className="validate"
						placeholder="Masukkan Jumlah Barang..."
						type="text"
						name="jumlah"
					/>
				</div>
				<button className="btn">
					Tambah Barang
					<i className="material-icons right">add_circle_outline</i>
				</button>
			</form>
		</React.Fragment>
	);
};

export default Input;
