import React from 'react';

const Person = ({ personArr, deletePerson }) => {
	return personArr.map((p) => (
		<div>
			<li key={p.id}>
				{p.name} {p.number}
			</li>
			<button onClick={() => deletePerson(p.id)}>Delete</button>
		</div>
	));
};

export default Person;
