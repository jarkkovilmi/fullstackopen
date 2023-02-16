import { Diagnosis, Entry } from "../../types";
import EntryDetails from "./EntryDetails";

interface Props {
	entries: Entry[],
	diagnoses: Diagnosis[]
}

const Entries = ({ entries, diagnoses }: Props) => {
	const entryStyle = {
		borderWidth: "2px",
		borderStyle: "solid",
		borderColor: "black",
		borderRadius: "10px",
		marginBottom: "10px",
		padding: "10px"
	};

	if (entries.length === 0)
		return <div>No entries.</div>;

	return (
		<div>
			<h3>entries</h3>
			{entries.map(entry => (
				<div style={entryStyle} key={entry.id}>
					<EntryDetails entry={entry} diagnoses={diagnoses} />
				</div>
			))}
		</div>
	);
};

export default Entries;