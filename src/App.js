// import React, { useState, useEffect } from 'react';
// import Note from './components/Note';
// import noteService from './services/notes';

// const App = () => {
// 	const [notes, setNotes] = useState([]);
// 	const [newNote, setNewNote] = useState('');
// 	const [showAll, setShowAll] = useState(true);

// 	useEffect(() => {
// 		noteService.getAll().then((res) => {
// 			setNotes(res.data);
// 		});
// 	}, []);

// 	console.log('render', notes.length, 'notes');

// 	const toggleImportanceOf = (id) => {
// 		const note = notes.find((n) => n.id === id);
// 		const changedNote = { ...note, important: !note.important };
// 		noteService
// 			.update(id, changedNote)
// 			.then((res) => {
// 				setNotes(notes.map((note) => (note.id !== id ? note : res.data)));
// 			})
// 			.catch((e) => {
// 				console.log(e);
// 				alert(`the note ${note.content} was already deleted`);
// 				setNotes(notes.filter((n) => n.id !== id));
// 			});
// 	};

// 	const deleteNote = (id) => {
// 		noteService.deleteNote(id).then(setNotes(notes.filter((n) => n.id !== id)));
// 	};

// 	const addNote = (event) => {
// 		event.preventDefault();
// 		const noteObject = {
// 			id: notes.length + 1,
// 			content: newNote,
// 			date: new Date().toISOString(),
// 			important: Math.random() > 0.5,
// 		};

// 		noteService.create(noteObject).then((response) => {
// 			setNotes([...notes, response.data]);
// 			setNewNote('');
// 		});

// 	};

// 	const handleNoteChange = (event) => {
// 		setNewNote(event.target.value);
// 	};

// 	const notesToShow = showAll ? notes : notes.filter((note) => note.important);

// 	return (
// 		<div>
// 			<h1>Notes</h1>
// 			<div>
// 				<button onClick={() => setShowAll(!showAll)}>
// 					show {showAll ? 'important' : 'all'}
// 				</button>
// 			</div>
// 			<ul>
// 				{notesToShow.map((note) => (
// 					<Note
// 						key={note.id}
// 						note={note}
// 						toggleImportance={() => toggleImportanceOf(note.id)}
// 						deleteNote={() => deleteNote(note.id)}
// 					/>
// 				))}
// 			</ul>
// 			<form onSubmit={addNote}>
// 				<input value={newNote} onChange={handleNoteChange} />
// 				<button type='submit'>save</button>
// 			</form>
// 		</div>
// 	);
// };

// export default App;
import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Person from './components/Person';
import FilterResult from './components/FilterResult';
import personService from '../src/services/person';
import Notification from './components/Notification';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [filter, setFilter] = useState('');
	const [message, setMessage] = useState('');

	useEffect(() => {
		personService.getAll().then((res) => {
			setPersons(res.data);
		});
	}, []);

	const addName = (event) => {
		event.preventDefault(); //prevent the default action by submit button
		if (!newName || !newNumber) {
			alert('Please fill in the fields');
			return;
		}
		const newInput = {
			name: newName,
			number: newNumber,
			id: persons.length + 1,
		};
		const existingPerson = persons.find(
			(p) => p.name.toLowerCase() === newName.toLowerCase()
		);

		if (existingPerson && existingPerson.number !== newNumber) {
			if (
				window.confirm(
					`${existingPerson.name} is already added to phone book, replace the old number with a new one?`
				)
			) {
				const changedPerson = { ...existingPerson, number: newNumber };
				const id = existingPerson.id;

				personService
					.update(id, changedPerson)
					.then((res) => {
						setPersons(persons.map((n) => (n.id !== id ? n : res)));
						setMessage('Number updated');
						setNewName('');
						setNewNumber('');
						setTimeout(() => {
							setMessage(null);
						}, 3000);
					})
					.catch((e) => {
						setMessage('Something wrong happened while updating. Try again.');
						console.log(e);
						setTimeout(() => {
							setMessage(null);
						}, 3000);
					});
			}
		} else if (existingPerson) {
			setMessage(`${newName} is already added to phone book.`); // avoid adding duplicate item
			setNewName('');
			setNewNumber('');
			setTimeout(() => {
				setMessage(null);
			}, 3000);
			return;
		} else {
			personService.create(newInput).then((response) => {
				setPersons(persons.concat(response));
				setMessage(`${response.name} was added to the contact.`);

				setNewName('');
				setNewNumber('');
				setTimeout(() => {
					setMessage(null);
				}, 3000);
			});
		}
	};

	const handleInputChange = (e) => {
		setNewName(e.target.value);
	};
	const handleNumberChange = (e) => {
		setNewNumber(e.target.value);
	};

	const handleFilterChange = (e) => {
		setFilter(e.target.value);
	};

	const handleDelete = (id) => {
		if (window.confirm('You sure you wanna delete it?')) {
			personService
				.deletePerson(id)
				.then(setPersons(persons.filter((n) => n.id !== id)))
				.catch((e) => {
					console.log(e);
					setMessage('No such person found.');
				});
			setMessage('Contact Deleted');
			setTimeout(() => {
				setMessage(null);
			}, 3000);
		} else {
			return;
		}
	};

	return (
		<div>
			<h2>Phone book</h2>
			<Notification message={message} />

			<Filter filter={filter} onFilterChange={handleFilterChange} />
			<PersonForm
				addName={addName}
				newName={newName}
				handleInputChange={handleInputChange}
				newNumber={newNumber}
				handleNumberChange={handleNumberChange}
			/>
			<h2>Name and Phone Number</h2>
			<ul>
				<Person personArr={persons} deletePerson={handleDelete} />
			</ul>

			<h3>Filtered results</h3>
			<ul>
				<FilterResult FilterArr={persons} filter={filter} />
			</ul>
		</div>
	);
};

export default App;
