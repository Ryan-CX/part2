import React from 'react';

const FilterResult = ({ FilterArr, filter }) => {
	const filtered = FilterArr.filter((p) =>
		p.name.toLowerCase().includes(filter.toLowerCase())
	);
	return filtered.map((person, index) => <li key={index}>{person.name}</li>);
};

export default FilterResult;
