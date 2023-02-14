import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { SvgIcon } from '@mui/material';
import { Male, Female, Transgender } from '@mui/icons-material';

import { Diagnosis, Entry, Gender, Patient } from "../../types";

import patientService from "../../services/patients";

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
				return <SvgIcon component={Male} />;
			}
			case "female": {
				return <SvgIcon component={Female} />;
			}
			case "other": {
				return <SvgIcon component={Transgender} />;
			}
		}
	};

	const renderEntries = (entries: Entry[]) => {
		if (entries.length === 0)
			return <div>No entries.</div>;

		return (
			patient.entries.map(entry => (
				<div key={entry.id}>
					<div>{entry.date} <i>{entry.description}</i></div>
					<ul>
						{entry.diagnosisCodes && entry.diagnosisCodes.map((code) => (
							<li key={code}>
								{code} {diagnoses.find(d => d.code === code)?.name}
							</li>
						))}
					</ul>
				</div>
			))
		);
	};

	return (
		<div>
			<h2>{patient.name} {renderGenderIcon(patient.gender)}</h2>
			<div>ssn: {patient.ssn}</div>
			<div>occupation: {patient.occupation}</div>
			<h3>entries</h3>
			{renderEntries(patient.entries)}
		</div>
	);
};

export default PatientInfoPage;