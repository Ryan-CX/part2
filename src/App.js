// import React from 'react';
// import Course from './components/Course';

// const App = ({ courses }) => {
// 	return (
// 		<div>
// 			<h1>Web Development Curriculum</h1>
// 			{courses.map((course) => (
// 				<Course course={course} key={course.id} />
// 			))}
// 		</div>
// 	);
// };

// export default App;

// import React, { useState } from 'react';
// import Note from './components/Note';

// const App = (props) => {
// 	const [notes, setNotes] = useState(props.notes);
// 	const [newNote, setNewNote] = useState('');
// 	const [showAll, setShowAll] = useState(true);

// 	const addNote = (event) => {
// 		event.preventDefault();
// 		const noteObject = {
// 			content: newNote,
// 			date: new Date().toISOString(),
// 			important: Math.random() > 0.5,
// 			id: notes.length + 1,
// 		};

// 		setNotes(notes.concat(noteObject));
// 		setNewNote('');
// 	};

// 	const handleNoteChange = (event) => {
// 		console.log(event.target.value);
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
// 					<Note key={note.id} note={note} />
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
import React, { useState } from 'react';

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456' },
		{ name: 'Ada Lovelace', number: '39-44-5323523' },
		{ name: 'Dan Abramov', number: '12-43-234345' },
		{ name: 'Mary Poppendieck', number: '39-23-6423122' },
	]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [searchName, setSearchName] = useState('');

	const addName = (event) => {
		event.preventDefault();
		const newInput = {
			name: newName,
			number: newNumber,
			id: persons.length + 1,
		};
		const existingPerson = persons.find(
			(p) => p.name.toLowerCase() === newName.toLowerCase()
		);
		if (existingPerson) {
			alert(`${newName} is already added to phonebook.`);
			setNewName('');
		} else {
			setPersons(persons.concat(newInput));
			console.log(persons);
			setNewName('');
			setNewNumber('');
		}
	};

	const handleInputChange = (e) => {
		setNewName(e.target.value);
	};
	const handleNumberChange = (e) => {
		setNewNumber(e.target.value);
	};

	const handleNameSearch = (e) => {
		const target = setSearchName(e.target.value);
		let found = persons.filter((p) => p.name === target);
		setSearchName(found);
	};
	return (
		<div>
			<h2>Phonebook</h2>
			filter shown with
			<input type='text' value={searchName} onChange={handleNameSearch} />
			<form onSubmit={addName}>
				<div>
					name:
					<input type='text' value={newName} onChange={handleInputChange} />
				</div>
				<div>
					number:
					<input type='text' value={newNumber} onChange={handleNumberChange} />
				</div>
				<div>
					<button type='submit'>add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			<ul>
				{persons.map((person, index) => (
					<li key={index}>{person.name}</li>
				))}
			</ul>
			<p>{searchName}</p>
		</div>
	);
};

export default App;
