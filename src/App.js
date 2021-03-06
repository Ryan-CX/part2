import React, { useState, useEffect } from 'react';
import Filter from '../src/components/Filter';
import PersonForm from '../src/components/PersonForm';
import Persons from '../src/components/Persons';
import personServices from '../src/services/persons';
import Notification from '../src/components/Notification';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [searchTerm, setSearchTerm] = useState('');
	const [notification, setNotification] = useState({});

	const handleNameChange = (event) => setNewName(event.target.value);
	const handleNumberChange = (event) => setNewNumber(event.target.value);

	// get the data from the server
	useEffect(() => {
		personServices
			.getAll()
			.then((data) => {
				setPersons(data);
			})
			.catch((error) => console.warn(error));
	}, []);

	// empty name and number input fields
	const emptyInputFields = () => {
		setNewName('');
		setNewNumber('');
	};

	// add new data to server
	const addFormData = () => {
		const newData = {
			name: newName,
			number: newNumber,
		};
		personServices
			.createData(newData)
			.then((data) => {
				setPersons(persons.concat(data));
			})
			.then(
				setNotification({
					message: `Added ${newData.name}.`,
				})
			)
			.catch((error) => console.warn(error));
	};

	// replace the old number i.e update existing data in server
	const updateFormData = () => {
		const confirmNumberReplace = window.confirm(
			`${newName} is already added to phone book, replace the old phone number with new one.`
		);
		const itemToUpdate = persons.find((item) => item.name === newName);
		const updatedItem = { ...itemToUpdate, number: newNumber };
		if (confirmNumberReplace) {
			personServices
				.updateData(updatedItem.id, updatedItem)
				.then((response) => {
					setPersons(
						persons.map((item) => (item.id === response.id ? response : item))
					);
					setNotification({
						message: `Replaced ${newName}'s number.`,
					});
				})
				.catch((error) => {
					console.warn(error);
					setNotification({
						message: `Could not replace, as the information on ${newName} has already been removed from the server.`,
						type: 'unsuccessful',
					});
				});
		}
	};

	// hide notification
	useEffect(() => {
		if (notification.message) {
			const timer = setTimeout(() => setNotification({}), 4000);
			return () => clearTimeout(timer);
		}
	}, [notification]);

	// handle data o form submit
	const handleFormSubmit = (event) => {
		event.preventDefault();
		if (!newName || !newNumber) {
			setNotification({
				message: 'Please fill both fields.',
				type: 'unsuccessful',
			});
			return;
		}
		const isNameExist = persons.filter(
			(item) => item.name.toLocaleLowerCase() === newName.toLowerCase()
		).length;

		if (!isNameExist) {
			addFormData();
		} else {
			updateFormData();
		}
		emptyInputFields();
	};

	// set filter search term
	const handleSearch = (event) => setSearchTerm(event.target.value);

	// delete data from the server
	const handleDeleteButtonClick = (id, name) => {
		const confirmDelete = window.confirm(`Delete ${name}?`);
		if (confirmDelete) {
			personServices
				.deleteData(id)
				.then(() => {
					setPersons(persons.filter((item) => item.id !== id));
					setNotification({
						message: `Deleted ${name}'s contact successfully.`,
					});
				})
				.catch((error) => {
					setNotification({
						message: `The information on ${name} has already been removed from the server.`,
						type: 'unsuccessful',
					});
					console.warn(error);
				});
			emptyInputFields();
		}
	};

	return (
		<>
			<h1>Phone book</h1>

			{notification.message && (
				<Notification
					message={notification.message}
					type={notification.type}
					duration={3000}
				/>
			)}

			<Filter searchTerm={searchTerm} handleSearch={handleSearch} />

			<h2>Add a new contact</h2>
			<PersonForm
				onSubmit={handleFormSubmit}
				handleNameChange={handleNameChange}
				handleNumberChange={handleNumberChange}
				nameValue={newName}
				numberValue={newNumber}
			/>

			<h2>Numbers</h2>
			<Persons
				data={persons}
				searchTerm={searchTerm}
				onDeleteButtonClick={handleDeleteButtonClick}
			/>
		</>
	);
};

export default App;
