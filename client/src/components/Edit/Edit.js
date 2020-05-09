import React, { useState } from 'react';
import { Modal, Button } from 'react-materialize';

const Edit = ({ barang }) => {
	const [editedBarang, setEditBarang] = useState(barang);

	const changeHandler = e => {
		setEditBarang({
			...editedBarang,
			[e.target.name]: e.target.value,
		});
	};

	const updateSubmit = async e => {
		e.preventDefault();
		try {
			await fetch(
				`http://localhost:4000/barang/${editedBarang.barang_id}`,
				{
					method: 'PUT',
					body: JSON.stringify(editedBarang),
					headers: { 'Content-Type': 'application/json' },
				}
			);
			window.location = '/';
		} catch (err) {
			console.log(err);
		}
	};

	const trigger = (
		<Button
			data-target={`id${editedBarang.barang_id}`}
			style={{
				backgroundColor: 'steelblue',
				display: 'flex',
				alignContent: 'center',
			}}>
			<i style={{ margin: '0 5px' }} className="material-icons">
				edit
			</i>
			Edit
		</Button>
	);
	return (
		<React.Fragment>
			<Modal
				id={`id${editedBarang.barang_id}`}
				header="Edit Barang"
				trigger={trigger}>
				<form onSubmit={updateSubmit}>
					<div className="input-field">
						<input
							onChange={changeHandler}
							className="validate"
							placeholder="Masukkan Barang..."
							type="text"
							name="barang"
							value={editedBarang.barang}
						/>
					</div>
					<div className="input-field">
						<input
							onChange={changeHandler}
							className="validate"
							placeholder="Masukkan Jumlah Barang..."
							type="text"
							name="jumlah"
							value={editedBarang.jumlah}
						/>
					</div>
					<button onClick={updateSubmit} className="btn">
						Edit Barang
						<i className="material-icons right">
							add_circle_outline
						</i>
					</button>
				</form>
			</Modal>
		</React.Fragment>
	);
};

export default Edit;
