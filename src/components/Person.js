import React from 'react';

const Person = ({ personArr }) => {
	return personArr.map((p) => <li key={p.name}>{p.name}</li>);
};

export default Person;
