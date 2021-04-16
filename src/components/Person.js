import React from 'react';

const Person = ({ personArr, deletePerson }) => {
	return personArr.map((p) => (
		<div>
			<li key={p.id} className='note'>
				{p.name} {p.number}
				<button onClick={() => deletePerson(p.id)}> Delete</button>
			</li>
		</div>
	));
};

export default Person;
