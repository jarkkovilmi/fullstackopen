import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Male, Female, Transgender } from '@mui/icons-material';

import { Diagnosis, Gender, Patient } from "../../types";

import patientService from "../../services/patients";
import Entries from "./Entries";

interface Props {
	diagnoses: Diagnosis[]
}

const PatientInfoPage = ({ diagnoses }: Props) => {
	const [patient, setPatient] = useState<Patient | null>(null);
	const id = useParams().id;

	useEffect(() => {
		if (!id) return;
		const fetchPatient = async () => {
			const patient = await patientService.getPatient(id);
			setPatient(patient);
		};
		fetchPatient();
	}, [id]);

	if (!patient)
		return <div>Patient not found</div>;

	const renderGenderIcon = (gender: Gender) => {
		switch (gender) {
			case "male": {
				return <Male />;
			}
			case "female": {
				return <Female />;
			}
			case "other": {
				return <Transgender />;
			}
		}
	};

	// const entryStyle = {
	// 	borderWidth: 1,
	// 	borderStyle: "dashed",
	// 	borderColor: "black",
	// 	margin: "10px",
	// 	padding: "5px"
	// };

	// const renderEntries = (entries: Entry[]) => {
	// 	if (entries.length === 0)
	// 		return <div>No entries.</div>;

	// 	return (
	// 		patient.entries.map(entry => (
	// 			<div style={entryStyle} key={entry.id}>
	// 				<EntryDetails entry={entry} diagnoses={diagnoses} />
	// 			</div>
	// 		))
	// 	);
	// };

	return (
		<div>
			<h2>{patient.name} {renderGenderIcon(patient.gender)}</h2>
			<div>ssn: {patient.ssn}</div>
			<div>occupation: {patient.occupation}</div>
			<h3>entries</h3>
			<Entries entries={patient.entries} diagnoses={diagnoses} />
		</div>
	);
};

export default PatientInfoPage;