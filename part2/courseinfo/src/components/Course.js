const Header = ({ course }) => <h2>{course}</h2>

const Part = ({ part, exercise}) => <p>{part} {exercise}</p>

const Content = ({ parts }) => {
	return (
		<div>
			{ parts.map(part =>
				<Part key={part.id} part={part.name} exercise={part.exercises} />
			)}
		</div>
	)
}

const Total = ({ parts }) => {
	const total = parts.reduce((total, part) => total + part.exercises, 0)
	return (
		<p>
			<b>total of {total} exercises</b>
		</p>
	)
}

const Course = (props) => {
	return (
		<div>
			<Header course={props.course.name} />
			<Content parts={props.course.parts} />
			<Total parts={props.course.parts} />
		</div>
	)
}

export default Course