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
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Person from './components/Person';
import FilterResult from './components/FilterResult';

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456' },
		{ name: 'Ada Lovelace', number: '39-44-5323523' },
		{ name: 'Dan Abramov', number: '12-43-234345' },
		{ name: 'Mary Poppendieck', number: '39-23-6423122' },
	]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [filter, setFilter] = useState('');

	const addName = (event) => {
		event.preventDefault(); //prevent the default action by submit button
		const newInput = {
			name: newName,
			number: newNumber,
			id: persons.length + 1,
		};
		const existingPerson = persons.find(
			(p) => p.name.toLowerCase() === newName.toLowerCase()
		);
		if (existingPerson) {
			alert(`${newName} is already added to phone book.`); // avoid adding duplicate item
			setNewName('');
		} else {
			setPersons(persons.concat(newInput));

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

	const handleFilterChange = (e) => {
		setFilter(e.target.value);
	};

	const filtered = persons.filter((p) =>
		p.name.toLowerCase().includes(filter.toLowerCase())
	);

	return (
		<div>
			<h2>Phone book</h2>

			<Filter filter={filter} onFilterChange={handleFilterChange} />
			<PersonForm
				addName={addName}
				newName={newName}
				handleInputChange={handleInputChange}
				newNumber={newNumber}
				handleNumberChange={handleNumberChange}
			/>
			<h2>Numbers</h2>
			<ul>
				<Person personArr={persons} />
			</ul>

			<h3>Filtered results</h3>
			<ul>
				<FilterResult FilterArr={filtered} />
			</ul>
		</div>
	);
};

export default App;
