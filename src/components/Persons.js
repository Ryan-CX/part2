import React from 'react';

const Persons = ({ data, searchTerm, onDeleteButtonClick }) => {
	const handleDeleteButtonClick = (id, name) => {
		if (onDeleteButtonClick) {
			onDeleteButtonClick(id, name);
		}
	};
	return (
		!!data.length &&
		data.map(
			(item) =>
				item.name.toLowerCase().includes(searchTerm.toLowerCase()) && (
					<p key={item.id}>
						{item.name} : {item.number}
						<button
							onClick={handleDeleteButtonClick.bind(null, item.id, item.name)}
						>
							Delete
						</button>
					</p>
				)
		)
	);
};

export default Persons;
