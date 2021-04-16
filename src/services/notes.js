import axios from 'axios';
const baseUrl = 'http://localhost:3001/notes';

const getAll = () => {
	const request = axios.get(baseUrl);
	return request;
};

const create = (newObject) => {
	const request = axios.post(baseUrl, newObject);
	return request;
};

const update = (id, newObject) => {
	const request = axios.put(`${baseUrl}/${id}`, newObject);
	return request;
};

const deleteNote = (id) => {
	const request = axios.delete(`${baseUrl}/${id}`);
	return request;
};

const exportedObj = { getAll, create, update, deleteNote };

export default exportedObj;
