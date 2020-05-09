import React, { useState, useEffect } from 'react';

import Edit from '../Edit/Edit';

const ListBarang = props => {
	const [gudang, setGudang] = useState([]);

	const deleteBarang = async id => {
		try {
			await fetch(`http://localhost:4000/barang/${id}`, {
				method: 'DELETE',
			});
			setGudang(prevGudang =>
				prevGudang.filter(item => item.barang_id !== id)
			);
		} catch (err) {
			console.err(err.message);
		}
	};

	const getData = async () => {
		try {
			const data = await fetch('http://localhost:4000/barang').then(res =>
				res.json()
			);
			console.log(data);
			setGudang(data);
		} catch (err) {
			console.err(err.message);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<React.Fragment>
			<table>
				<thead>
					<tr>
						<th>Barang</th>
						<th>Jumlah Barang</th>
						<th>Edit</th>
						<th>Delete</th>
					</tr>
				</thead>

				<tbody>
					{gudang.map(barang => (
						<tr key={barang.barang_id}>
							<td>{barang.barang}</td>
							<td>{barang.jumlah}</td>
							<td>
								<Edit barang={barang} />
							</td>
							<td>
								<button
									onClick={deleteBarang.bind(
										this,
										barang.barang_id
									)}
									style={{
										backgroundColor: 'crimson',
										display: 'flex',
										alignContent: 'center',
									}}
									className="btn">
									<i
										style={{ margin: '0 5px' }}
										className="material-icons">
										delete
									</i>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</React.Fragment>
	);
};

export default ListBarang;
