import { CoursePart } from "../types"
import Part from "./Part"

interface ContentProps { 
	parts: CoursePart[]
}

const Content = (props: ContentProps) => {
	return (
		<div>
			{props.parts.map(part => (
				<div key={part.name}>
					<Part part={part} />
					<br/>
				</div>
			))}
		</div>
	)
}

export default Content