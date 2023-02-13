import { CoursePart } from "../types"

interface TotalProps {
	parts: CoursePart[]
}

const Total = (props: TotalProps) => {
	return (
		<p>
		Number of exercises{" "}
		{props.parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
	</p>
	)
}

export default Total