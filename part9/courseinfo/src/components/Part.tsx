import { CoursePart } from "../types";

const Part = ({ part }: { part: CoursePart }) => {
	const assertNever = (value: never): never => {
		throw new Error(
			`Unhandled discriminated union member: ${JSON.stringify(value)}`
		);
	};
	switch(part.kind) {
		case "basic":
			return (
				<div>
					<div><strong>{part.name} {part.exerciseCount}</strong></div>
					<div><i>{part.description}</i></div>
				</div>
			)
		case "group":
			return (
				<div>
					<div><strong>{part.name} {part.exerciseCount}</strong></div>
					<div>project exercises {part.groupProjectCount}</div>
				</div>
			)
		case "background":
			return (
				<div>
					<div><strong>{part.name} {part.exerciseCount}</strong></div>
					<div><i>{part.description}</i></div>
					<div>submit to {part.backroundMaterial}</div> 
				</div>
			)
		case "special":
			return (
				<div>
					<div><strong>{part.name} {part.exerciseCount}</strong></div>
					<div><i>{part.description}</i></div>
					<div>required skills: {part.requirements.join(', ')}</div> 
				</div>
			)
		default:
			return assertNever(part);
	}
}

export default Part