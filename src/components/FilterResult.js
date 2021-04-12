import React from 'react';

const FilterResult = ({ FilterArr }) => {
	return FilterArr.map((person, index) => <li key={index}>{person.name}</li>);
};

export default FilterResult;
