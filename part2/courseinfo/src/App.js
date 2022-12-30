const Header = ({ course }) => {
	return (
		<h1>
			{course}
		</h1>
	)
}

const Part = ({ part, exercise}) => {
	return (
		<p>
			{part} {exercise}
		</p>
	)
}

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

const App = () => {
	const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }
	
  return (
		<div>
			<Course course={course} />
    </div>
  )
}

export default App