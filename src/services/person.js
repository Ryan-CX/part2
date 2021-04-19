import axios from 'axios';
const baseUrl = '/persons';

const getAll = () => {
	const request = axios.get(baseUrl);
	return request;
};

const create = (newObject) => {
	const request = axios.post(baseUrl, newObject);
	return request.then((res) => res.data);
};

const update = (id, newObject) => {
	const request = axios.put(`${baseUrl}/${id}`, newObject);
	return request.then((res) => res.data);
};

const deletePerson = (id) => {
	const request = axios.delete(`${baseUrl}/${id}`);
	return request;
};

const exportedObject = {
	getAll,
	create,
	update,
	deletePerson,
};
export default exportedObject;
