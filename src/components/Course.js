import React from 'react';

const Header = ({ course }) => <h2>{course}</h2>;

const Part = ({ data }) => (
	<p>
		{data.name} {data.exercises}
	</p>
);

const Content = ({ parts }) => (
	<div>
		{parts.map((part) => (
			<Part data={part} key={part.id} />
		))}
	</div>
);

const Total = ({ parts }) => {
	const total = parts.map((p) => p.exercises).reduce((a, b) => a + b, 0);

	return (
		<p>
			<b>total of {total} exercises</b>
		</p>
	);
};

const Course = ({ course }) => {
	return (
		<div>
			<Header course={course.name} /> <Content parts={course.parts} />
			<Total parts={course.parts} />
		</div>
	);
};

export default Course;
