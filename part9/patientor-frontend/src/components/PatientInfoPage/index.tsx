import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Male, Female, Transgender } from '@mui/icons-material';

import { Diagnosis, Entry, Gender, Patient } from "../../types";

import patientService from "../../services/patients";
import Entries from "./Entries";
import AddEntryForm from "./AddEntryForm";

interface Props {
	diagnoses: Diagnosis[]
}

const PatientInfoPage = ({ diagnoses }: Props) => {
	const [patient, setPatient] = useState<Patient | null>(null);
	const [entries, setEntries] = useState<Entry[] | null>(null);
	const id = useParams().id;

	useEffect(() => {
		if (!id) return;
		const fetchPatient = async () => {
			const patient = await patientService.getPatient(id);
			setPatient(patient);
			setEntries(patient.entries);
		};
		fetchPatient();
	}, [id]);

	if (!patient || !entries)
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

	return (
		<div>
			<h2>{patient.name} {renderGenderIcon(patient.gender)}</h2>
			<div>ssn: {patient.ssn}</div>
			<div>occupation: {patient.occupation}</div>
			<AddEntryForm id={id} setEntries={setEntries} entries={entries} diagnoses={diagnoses} />
			<Entries entries={entries} diagnoses={diagnoses} />
		</div>
	);
};

export default PatientInfoPage;