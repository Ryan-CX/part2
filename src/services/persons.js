import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/persons';

const getAll = () => {
	return axios.get(baseUrl).then((response) => response.data);
};

const createData = (data) => {
	return axios.post(baseUrl, data).then((response) => response.data);
};

const deleteData = (id) => {
	return axios.delete(`${baseUrl}/${id}`).then((response) => response.data);
};

const updateData = (id, newData) => {
	return axios
		.put(`${baseUrl}/${id}`, newData)
		.then((response) => response.data);
};

const exportedObject = {
	getAll,
	createData,
	deleteData,
	updateData,
};
export default exportedObject;
